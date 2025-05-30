"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StorageSetupGuide } from "@/components/storage-setup-guide"
import { supabase } from "@/lib/supabase"
import { UploadIcon, XIcon, AlertCircleIcon, InfoIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  bucket?: string
  folder?: string
}

export function ImageUpload({
  value,
  onChange,
  label = "Upload Image",
  bucket = "images",
  folder = "uploads",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value || "")
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

      setPreview(publicUrl)
      onChange(publicUrl)
      setDebugInfo(`Success! URL: ${publicUrl}`)
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
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB")
      return
    }

    uploadImage(file)
  }

  const removeImage = () => {
    setPreview("")
    onChange("")
    setError("")
    setDebugInfo("")
    setShowSetupGuide(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUrlChange = (url: string) => {
    setPreview(url)
    onChange(url)
    setError("")
    setDebugInfo("")
    setShowSetupGuide(false)
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
          <InfoIcon className="h-4 w-4" />
          {debugInfo}
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative w-full h-48 border rounded-lg overflow-hidden bg-muted">
          <Image
            src={preview || "/placeholder.svg"}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => {
              setPreview("")
              onChange("")
              setError("Failed to load image")
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={removeImage}
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Upload Button */}
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
              <UploadIcon className="h-4 w-4 mr-2" />
              Upload Image
            </>
          )}
        </Button>

        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
      </div>

      {/* Manual URL Input */}
      <div className="space-y-2">
        <Label className="text-sm text-muted-foreground">Or enter image URL manually:</Label>
        <Input
          type="url"
          placeholder="https://example.com/image.jpg or /placeholder.png"
          value={preview}
          onChange={(e) => handleUrlChange(e.target.value)}
        />
      </div>

      {/* Help Text */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB</p>
        <p>If upload fails with policy errors, click "Show setup guide" above</p>
      </div>
    </div>
  )
}
