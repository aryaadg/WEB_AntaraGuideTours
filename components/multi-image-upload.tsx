"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StorageSetupGuide } from "@/components/storage-setup-guide"
import { supabase } from "@/lib/supabase"
import { XIcon, AlertCircleIcon, PlusIcon } from "lucide-react"
import Image from "next/image"

interface MultiImageUploadProps {
  value?: string[]
  onChange: (urls: string[]) => void
  label?: string
  bucket?: string
  folder?: string
  maxImages?: number
}

export function MultiImageUpload({
  value = [],
  onChange,
  label = "Upload Images",
  bucket = "images",
  folder = "uploads",
  maxImages = 5,
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [debugInfo, setDebugInfo] = useState("")
  const [showSetupGuide, setShowSetupGuide] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadImage = async (file: File) => {
    try {
      setUploading(true)
      setError("")
      setDebugInfo("Starting upload...")

      // Generate unique filename
      const fileExt = file.name.split(".").pop()
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

      setDebugInfo(`Uploading to: ${bucket}/${fileName}`)

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })

      if (error) {
        console.error("Upload error details:", error)

        // Check for specific RLS policy errors
        if (error.message.includes("row-level security policy") || error.message.includes("RLS")) {
          setError("Storage policies not configured. Please set up storage policies first.")
          setShowSetupGuide(true)
          return
        }

        if (error.message.includes("Bucket not found")) {
          setError("Storage bucket not found. Please set up storage first.")
          setShowSetupGuide(true)
          return
        }

        throw new Error(`Upload failed: ${error.message}`)
      }

      setDebugInfo("Upload successful, getting public URL...")

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(fileName)

      // Add to existing images
      const newImages = [...value, publicUrl]
      onChange(newImages)
      setDebugInfo(`Success! Added image ${newImages.length}/${maxImages}`)
      setShowSetupGuide(false)

      console.log("Image uploaded successfully:", publicUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
      setError(error.message || "Failed to upload image")
      setDebugInfo("")
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // Check if we can add more images
    if (value.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed. You can add ${maxImages - value.length} more.`)
      return
    }

    // Process each file
    files.forEach((file) => {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select only image files")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        return
      }

      uploadImage(file)
    })

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (index: number) => {
    const newImages = value.filter((_, i) => i !== index)
    onChange(newImages)
    setError("")
    setDebugInfo("")
  }

  const addManualUrl = (url: string) => {
    if (!url.trim()) return
    if (value.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }

    const newImages = [...value, url.trim()]
    onChange(newImages)
    setError("")
    setDebugInfo("")
  }

  if (showSetupGuide) {
    return (
      <div className="space-y-4">
        <Label>{label}</Label>
        <StorageSetupGuide />
        <Button variant="outline" onClick={() => setShowSetupGuide(false)} className="w-full">
          Back to Upload
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md">
          <AlertCircleIcon className="h-4 w-4" />
          <div className="flex-1">
            <p>{error}</p>
            {error.includes("policies") && (
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto text-red-700 underline"
                onClick={() => setShowSetupGuide(true)}
              >
                Show setup guide
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Debug Info */}
      {debugInfo && (
        <div className="flex items-center gap-2 p-3 text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-md">
          <AlertCircleIcon className="h-4 w-4" />
          {debugInfo}
        </div>
      )}

      {/* Image Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative w-full h-32 border rounded-lg overflow-hidden bg-muted">
                <Image
                  src={url || "/placeholder.svg"}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={() => {
                    setError(`Failed to load image ${index + 1}`)
                  }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-center mt-1 text-muted-foreground">Image {index + 1}</p>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      {value.length < maxImages && (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex-1"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Images ({value.length}/{maxImages})
              </>
            )}
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {/* Manual URL Input */}
      {value.length < maxImages && (
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Or add image URL manually:</Label>
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  addManualUrl(e.currentTarget.value)
                  e.currentTarget.value = ""
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                const input = e.currentTarget.previousElementSibling as HTMLInputElement
                addManualUrl(input.value)
                input.value = ""
              }}
            >
              Add
            </Button>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB per image</p>
        <p>
          Maximum {maxImages} images. Current: {value.length}
        </p>
        <p>If upload fails with policy errors, click "Show setup guide" above</p>
      </div>
    </div>
  )
}