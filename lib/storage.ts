import { supabase } from "./supabase"

export async function checkStorageSetup() {
  try {
    console.log("Checking storage setup...")

    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()

    if (listError) {
      console.error("Error listing buckets:", listError)
      return {
        success: false,
        error: `Cannot list buckets: ${listError.message}`,
        needsManualSetup: true,
      }
    }

    const bucketExists = buckets?.some((bucket) => bucket.name === "images")

    if (!bucketExists) {
      return {
        success: false,
        error: "Images bucket not found",
        needsManualSetup: true,
        instructions: "Please create 'images' bucket manually in Supabase Dashboard (Storage → New bucket)",
      }
    }

    // Test upload permission
    const testFile = new File(["test"], "test.txt", { type: "text/plain" })
    const testPath = `test-${Date.now()}.txt`

    const { error: uploadError } = await supabase.storage.from("images").upload(testPath, testFile)

    if (uploadError) {
      console.error("Storage upload test failed:", uploadError)
      return {
        success: false,
        error: `Upload test failed: ${uploadError.message}`,
        needsPolicySetup: true,
        instructions: "Please setup storage policies in Supabase Dashboard (Storage → Policies)",
      }
    }

    // Clean up test file
    await supabase.storage.from("images").remove([testPath])

    console.log("Storage setup is working!")
    return {
      success: true,
      message: "Storage is ready for uploads",
    }
  } catch (error) {
    console.error("Error checking storage:", error)
    return {
      success: false,
      error: error.message,
      needsManualSetup: true,
    }
  }
}

export async function tryCreateBucket() {
  try {
    const { data, error } = await supabase.storage.createBucket("images", {
      public: true,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
      fileSizeLimit: 5242880, // 5MB
    })

    if (error) {
      if (error.message.includes("already exists")) {
        return { success: true, message: "Bucket already exists" }
      }
      return { success: false, error: error.message }
    }

    return { success: true, message: "Bucket created successfully", data }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export async function deleteImage(url: string) {
  try {
    const urlParts = url.split("/storage/v1/object/public/images/")
    if (urlParts.length < 2) return false

    const filePath = urlParts[1]
    const { error } = await supabase.storage.from("images").remove([filePath])

    if (error) {
      console.error("Error deleting image:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error deleting image:", error)
    return false
  }
}