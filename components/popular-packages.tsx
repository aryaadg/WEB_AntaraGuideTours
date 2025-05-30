"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ClockIcon, StarIcon, UsersIcon, ChevronRightIcon, MapPinIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getFeaturedPackages } from "@/lib/api"

export function PopularPackages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadPackages() {
      try {
        console.log("Loading packages...") // Debug log
        const data = await getFeaturedPackages()
        console.log("Packages loaded:", data) // Debug log
        setPackages(data)
        setError(null)
      } catch (err) {
        console.error("Error loading packages:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadPackages()
  }, [])

  if (loading) {
    return (
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Popular Packages</h2>
              <p className="text-muted-foreground">Loading packages...</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48 bg-muted animate-pulse"></div>
                <CardHeader className="p-4 pb-0">
                  <div className="h-6 bg-muted animate-pulse mb-2 rounded"></div>
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
                </CardContent>
                <CardFooter className="p-4 pt-0 border-t">
                  <div className="w-full flex justify-between">
                    <div className="h-8 bg-muted animate-pulse rounded w-1/3"></div>
                    <div className="h-8 bg-muted animate-pulse rounded w-1/4"></div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Popular Packages</h2>
            <p className="text-red-500">Error loading packages: {error}</p>
            <p className="text-sm text-muted-foreground mt-2">Check console for more details</p>
          </div>
        </div>
      </section>
    )
  }

  if (packages.length === 0) {
    return (
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Popular Packages</h2>
            <p className="text-muted-foreground">No featured packages found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Add some packages in the admin panel and mark them as featured
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Popular Packages</h2>
            <p className="text-muted-foreground">Our most booked travel experiences</p>
          </div>
          <Link href="/packages" className="flex items-center text-sm font-medium text-primary hover:underline">
            View all packages
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.image_url || "/placeholder.png"}
                    alt={pkg.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                {pkg.featured && (
                  <Badge className="absolute top-3 left-3" variant="secondary">
                    Featured
                  </Badge>
                )}
              </div>
              <CardHeader className="p-4 pb-0">
                <div className="flex flex-wrap gap-1 mb-2">
                  {pkg.tags &&
                    pkg.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                </div>
                <h3 className="text-lg font-semibold">{pkg.title}</h3>
                <p className="flex items-center text-sm text-muted-foreground">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  {pkg.location}
                </p>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                    <span className="text-sm text-muted-foreground">({pkg.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm">
                      <ClockIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                      <span>{pkg.duration} days</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <UsersIcon className="w-4 h-4 mr-1 text-muted-foreground" />
                      <span>2-4</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4 pt-0 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-xl font-bold">${pkg.price}</p>
                </div>
                <Button size="sm" asChild>
                  <Link href={`/packages/${pkg.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/packages">Explore All Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}