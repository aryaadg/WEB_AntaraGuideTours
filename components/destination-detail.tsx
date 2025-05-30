"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPinIcon, CalendarIcon, UsersIcon, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface DestinationDetailProps {
  destination: any
}

export function DestinationDetail({ destination }: DestinationDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Combine main image with support images
  const allImages = [destination.image_url, ...(destination.support_images || [])].filter(Boolean)

  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image Display */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={allImages[selectedImageIndex] || "/placeholder.svg"}
                alt={destination.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/50 text-white">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    {selectedImageIndex + 1} / {allImages.length}
                  </Badge>
                </div>
              )}

              {/* Featured Badge */}
              {destination.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary text-primary-foreground">Featured Destination</Badge>
                </div>
              )}
            </div>

            {/* Support Images Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-16 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${destination.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Information */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <MapPinIcon className="w-5 h-5" />
                <span className="text-sm font-medium">{destination.location}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{destination.name}</h1>

              <p className="text-xl text-muted-foreground leading-relaxed">{destination.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{destination.properties}</div>
                <div className="text-sm text-muted-foreground">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">Visitors</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What Makes It Special</h3>
              <div className="grid gap-3">
                {[
                  "Beautiful natural landscapes",
                  "Rich cultural heritage",
                  "Friendly local community",
                  "Perfect for photography",
                  "Year-round destination",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Best Time to Visit</div>
                  <div className="text-sm text-muted-foreground">March to May, September to November</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <UsersIcon className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Ideal For</div>
                  <div className="text-sm text-muted-foreground">Families, Couples, Solo travelers</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="flex-1">
                Plan Your Visit
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                View Packages
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Getting There</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>The destination is easily accessible by various means of transportation.</p>
                <ul className="space-y-2">
                  <li>• By Air: Nearest airport is 45 minutes away</li>
                  <li>• By Road: Well-connected highway access</li>
                  <li>• By Train: Railway station within 30 minutes</li>
                  <li>• Local Transport: Buses and taxis available</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Local Tips</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>Make the most of your visit with these insider tips.</p>
                <ul className="space-y-2">
                  <li>• Early morning visits offer the best lighting</li>
                  <li>• Local guides provide valuable insights</li>
                  <li>• Respect local customs and traditions</li>
                  <li>• Try the local cuisine at nearby restaurants</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
