import { supabase } from "./supabase"

export async function getDestinations() {
  const { data, error } = await supabase.from("destinations").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching destinations:", error)
    return []
  }

  return data || []
}

export async function getFeaturedDestinations(limit = 4) {
  const { data, error } = await supabase.from("destinations").select("*").eq("featured", true).limit(limit)

  if (error) {
    console.error("Error fetching featured destinations:", error)
    return []
  }

  return data || []
}

export async function getDestinationById(id: number) {
  const { data, error } = await supabase.from("destinations").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching destination:", error)
    return null
  }

  return data
}

export async function getPackages() {
  const { data, error } = await supabase
    .from("packages")
    .select(`
      *,
      package_tags (tag)
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching packages:", error)
    return []
  }

  // Format the tags
  const formattedData = data.map((pkg) => ({
    ...pkg,
    tags: pkg.package_tags.map((t: any) => t.tag),
  }))

  return formattedData || []
}

export async function getFeaturedPackages(limit = 6) {
  const { data, error } = await supabase
    .from("packages")
    .select(`
      *,
      package_tags (tag)
    `)
    .eq("featured", true)
    .limit(limit)

  if (error) {
    console.error("Error fetching featured packages:", error)
    return []
  }

  // Format the tags
  const formattedData = data.map((pkg) => ({
    ...pkg,
    tags: pkg.package_tags.map((t: any) => t.tag),
  }))

  return formattedData || []
}

export async function getPackageById(id: number) {
  const { data, error } = await supabase
    .from("packages")
    .select(`
      *,
      package_tags (tag)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching package:", error)
    return null
  }

  // Format the tags
  const formattedData = {
    ...data,
    tags: data.package_tags.map((t: any) => t.tag),
  }

  return formattedData
}
