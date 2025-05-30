"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPinIcon, ChevronRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getFeaturedDestinations } from "@/lib/api"

export function FeaturedDestinations() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadDestinations() {
      try {
        console.log("Loading destinations...") // Debug log
        const data = await getFeaturedDestinations()
        console.log("Destinations loaded:", data) // Debug log
        setDestinations(data)
        setError(null)
      } catch (err) {
        console.error("Error loading destinations:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDestinations()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Destinations</h2>
              <p className="text-muted-foreground">Loading destinations...</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48 bg-muted animate-pulse"></div>
                <CardContent className="p-4">
                  <div className="h-6 bg-muted animate-pulse mb-2 rounded"></div>
                  <div className="h-4 bg-muted animate-pulse mb-2 rounded w-3/4"></div>
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Destinations</h2>
            <p className="text-red-500">Error loading destinations: {error}</p>
            <p className="text-sm text-muted-foreground mt-2">Check console for more details</p>
          </div>
        </div>
      </section>
    )
  }

  if (destinations.length === 0) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Destinations</h2>
            <p className="text-muted-foreground">No featured destinations found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Add some destinations in the admin panel and mark them as featured
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Destinations</h2>
            <p className="text-muted-foreground">Explore our handpicked destinations around the world</p>
          </div>
          <Link href="/destinations" className="flex items-center text-sm font-medium text-primary hover:underline">
            View all destinations
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <Link href={`/destinations/${destination.id}`} key={destination.id}>
              <Card className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={destination.image_url || "/placeholder.png"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{destination.name}</h3>
                  <p className="text-sm text-muted-foreground">{destination.description}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <MapPinIcon className="w-4 h-4 mr-1 text-primary" />
                    <span>{destination.properties} properties</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
