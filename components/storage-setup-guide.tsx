"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, ExternalLink, CheckCircle, AlertCircle } from "lucide-react"

export function StorageSetupGuide() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null)

  const copyToClipboard = (text: string, stepNumber: number) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(stepNumber)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

  const sqlCommands = [
    {
      title: "1. Create Storage Bucket",
      description: "Creates the 'images' bucket for file uploads",
      sql: `-- Create the images bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images', 
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;`,
    },
    {
      title: "2. Enable RLS on Storage Objects",
      description: "Enables Row Level Security on storage.objects table",
      sql: `-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;`,
    },
    {
      title: "3. Create Upload Policy",
      description: "Allows anyone to upload files to the images bucket",
      sql: `-- Policy for uploading files
CREATE POLICY "Allow public uploads to images bucket" ON storage.objects
FOR INSERT TO public
WITH CHECK (bucket_id = 'images');`,
    },
    {
      title: "4. Create Read Policy",
      description: "Allows anyone to read/view files from the images bucket",
      sql: `-- Policy for reading files
CREATE POLICY "Allow public reads from images bucket" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'images');`,
    },
    {
      title: "5. Create Delete Policy",
      description: "Allows anyone to delete files from the images bucket",
      sql: `-- Policy for deleting files
CREATE POLICY "Allow public deletes from images bucket" ON storage.objects
FOR DELETE TO public
USING (bucket_id = 'images');`,
    },
    {
      title: "6. Create Update Policy",
      description: "Allows anyone to update files in the images bucket",
      sql: `-- Policy for updating files
CREATE POLICY "Allow public updates to images bucket" ON storage.objects
FOR UPDATE TO public
USING (bucket_id = 'images')
WITH CHECK (bucket_id = 'images');`,
    },
  ]

  const allSqlCommands = sqlCommands.map((cmd) => cmd.sql).join("\n\n")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            Storage Setup Required
          </CardTitle>
          <CardDescription>Follow these steps to set up Supabase Storage for image uploads</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You need to run these SQL commands in your Supabase SQL Editor to enable file uploads.
            </AlertDescription>
          </Alert>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`${supabaseUrl}/project/default/sql/new`, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open SQL Editor
            </Button>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(allSqlCommands, 0)}>
              <Copy className="h-4 w-4 mr-2" />
              {copiedStep === 0 ? "Copied!" : "Copy All SQL"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {sqlCommands.map((command, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{command.title}</CardTitle>
                <Button variant="outline" size="sm" onClick={() => copyToClipboard(command.sql, index + 1)}>
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedStep === index + 1 ? "Copied!" : "Copy"}
                </Button>
              </div>
              <CardDescription>{command.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                <code>{command.sql}</code>
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Quick Setup Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>
              Click "Open SQL Editor" button above or go to{" "}
              <a
                href={`${supabaseUrl}/project/default/sql/new`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Supabase SQL Editor
              </a>
            </li>
            <li>Click "Copy All SQL" button above</li>
            <li>Paste the SQL commands into the SQL Editor</li>
            <li>Click "Run" to execute all commands</li>
            <li>Refresh this page and try uploading again</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
