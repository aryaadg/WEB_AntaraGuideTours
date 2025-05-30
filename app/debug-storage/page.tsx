"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugStoragePage() {
  const [buckets, setBuckets] = useState([])
  const [testResult, setTestResult] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    checkStorage()
  }, [])

  const checkStorage = async () => {
    try {
      const { data: bucketsData, error: bucketsError } = await supabase.storage.listBuckets()
      if (bucketsError) {
        console.error("Error listing buckets:", bucketsError)
        setTestResult(`Error listing buckets: ${bucketsError.message}`)
        return
      }
      setBuckets(bucketsData || [])
      console.log("Available buckets:", bucketsData)
    } catch (error) {
      console.error("Error checking storage:", error)
      setTestResult(`Error: ${error.message}`)
    }
  }

  const createBucket = async () => {
    try {
      setLoading(true)
      setTestResult("Creating bucket...")

      const { data, error } = await supabase.storage.createBucket("images", {
        public: true,
        allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
        fileSizeLimit: 5242880, // 5MB
      })

      if (error) {
        setTestResult(`Failed to create bucket: ${error.message}`)
        console.error("Bucket creation error:", error)
        return
      }

      setTestResult("Bucket created successfully!")
      checkStorage() // Refresh bucket list
    } catch (error) {
      setTestResult(`Error creating bucket: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const testUpload = async () => {
    try {
      setLoading(true)
      setTestResult("Testing upload...")

      // Create a simple test file
      const testContent = "test upload content"
      const testFile = new File([testContent], "test.txt", { type: "text/plain" })
      const testPath = `test-${Date.now()}.txt`

      console.log("Attempting upload to path:", testPath)

      const { data, error } = await supabase.storage.from("images").upload(testPath, testFile)

      if (error) {
        setTestResult(`Upload failed: ${error.message}`)
        console.error("Upload error details:", error)
        return
      }

      console.log("Upload successful:", data)

      // Get public URL
      const { data: urlData } = supabase.storage.from("images").getPublicUrl(testPath)
      console.log("Public URL:", urlData.publicUrl)

      // Clean up test file
      const { error: deleteError } = await supabase.storage.from("images").remove([testPath])
      if (deleteError) {
        console.warn("Failed to clean up test file:", deleteError)
      }

      setTestResult("Upload test successful! ✅")
    } catch (error) {
      setTestResult(`Upload test error: ${error.message}`)
      console.error("Upload test error:", error)
    } finally {
      setLoading(false)
    }
  }

  const setupPolicies = async () => {
    try {
      setLoading(true)
      setTestResult("Setting up policies...")

      // This will only work if you have service role key
      // For now, we'll just show the SQL that needs to be run
      const sql = `
-- Run this in Supabase SQL Editor:

-- Create bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT TO public
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Allow public reads" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'images');

CREATE POLICY "Allow public deletes" ON storage.objects
FOR DELETE TO public
USING (bucket_id = 'images');
      `

      setTestResult(`Please run this SQL in Supabase SQL Editor:\n\n${sql}`)
    } catch (error) {
      setTestResult(`Error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Storage Debug & Setup</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Environment Check</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}</p>
            <p>SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}</p>
            {process.env.NEXT_PUBLIC_SUPABASE_URL && (
              <p className="text-sm text-muted-foreground">URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Buckets ({buckets.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {buckets.length > 0 ? (
              <div className="space-y-2">
                {buckets.map((bucket) => (
                  <div key={bucket.id} className="p-2 bg-muted rounded">
                    <p className="font-medium">{bucket.name}</p>
                    <p className="text-sm text-muted-foreground">Public: {bucket.public ? "✅ Yes" : "❌ No"}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No buckets found</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={checkStorage} disabled={loading}>
              Refresh Buckets
            </Button>
            <Button onClick={createBucket} disabled={loading} variant="outline">
              Create Images Bucket
            </Button>
            <Button onClick={testUpload} disabled={loading} variant="outline">
              Test Upload
            </Button>
            <Button onClick={setupPolicies} disabled={loading} variant="secondary">
              Show SQL for Policies
            </Button>
          </div>

          {testResult && (
            <div className="p-4 bg-muted rounded-md">
              <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manual Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Step 1: Create Bucket</h3>
            <p className="text-sm text-muted-foreground">
              Go to Supabase Dashboard → Storage → Create new bucket named "images" (make it public)
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Step 2: Setup Policies</h3>
            <p className="text-sm text-muted-foreground">
              Go to Supabase Dashboard → SQL Editor and run the SQL shown above
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Step 3: Test</h3>
            <p className="text-sm text-muted-foreground">Click "Test Upload" button above to verify everything works</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}