import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://przwsbyznsbltpruwltr.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByendzYnl6bnNibHRwcnV3bHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MDA2MjgsImV4cCI6MjA2NDA3NjYyOH0.X9Z-WzkalfspFpxIb8UVe-L6KBS-T7ifsDOKuR9tSdA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
