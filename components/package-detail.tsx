"use client"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  StarIcon,
  CheckIcon,
  InfoIcon,
  UtensilsIcon,
  BedIcon,
  PlaneIcon,
  HeartIcon,
  ImageIcon,
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface PackageDetailProps {
  packageData: any
}

export function PackageDetail({ packageData }: PackageDetailProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [travelers, setTravelers] = useState(2)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Combine main image with support images
  const allImages = [packageData.image_url, ...(packageData.support_images || [])].filter(Boolean)

  // Sample data for the itinerary
  const itinerary = [
    {
      day: 1,
      title: "Arrival & Welcome",
      description:
        "Arrive at your destination, transfer to your hotel, and enjoy a welcome dinner with your tour group.",
      activities: ["Airport pickup", "Hotel check-in", "Welcome dinner"],
    },
    {
      day: 2,
      title: "City Exploration",
      description: "Explore the main attractions of the city with a knowledgeable local guide.",
      activities: ["Guided city tour", "Lunch at local restaurant", "Visit to historical sites"],
    },
    {
      day: 3,
      title: "Nature Adventure",
      description: "Experience the natural beauty of the region with outdoor activities.",
      activities: ["Hiking in nature reserve", "Picnic lunch", "Sunset viewing point"],
    },
    {
      day: 4,
      title: "Cultural Immersion",
      description: "Immerse yourself in the local culture through workshops and experiences.",
      activities: ["Traditional craft workshop", "Local market visit", "Cultural dinner show"],
    },
    {
      day: 5,
      title: "Leisure & Departure",
      description: "Enjoy some free time before your departure.",
      activities: ["Free morning", "Optional activities", "Airport transfer"],
    },
  ].slice(0, packageData.duration)

  // Sample dates with Euro prices
  const availableDates = [
    { date: "2025-06-15", price: packageData.price_euro || packageData.price * 0.85 },
    { date: "2025-06-22", price: (packageData.price_euro || packageData.price * 0.85) + 45 },
    { date: "2025-07-05", price: (packageData.price_euro || packageData.price * 0.85) - 25 },
    { date: "2025-07-19", price: (packageData.price_euro || packageData.price * 0.85) + 85 },
    { date: "2025-08-02", price: (packageData.price_euro || packageData.price * 0.85) + 125 },
    { date: "2025-08-16", price: (packageData.price_euro || packageData.price * 0.85) + 70 },
  ]

  // Sample inclusions
  const inclusions = [
    "Accommodation in 4-star hotels",
    "Daily breakfast and selected meals",
    "All transportation within the itinerary",
    "English-speaking guide",
    "Entrance fees to attractions",
    "Airport transfers",
    "Welcome dinner",
  ]

  // Sample exclusions
  const exclusions = [
    "International flights",
    "Travel insurance",
    "Personal expenses",
    "Optional activities",
    "Meals not mentioned in the itinerary",
    "Tips for guides and drivers",
  ]

  return (
    <div className="py-8">
      {/* Hero Section with Image Gallery */}
      <div className="container mx-auto px-4 mb-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image Display */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={allImages[selectedImageIndex] || "/placeholder.svg"}
                alt={packageData.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/50 text-white">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    {selectedImageIndex + 1} / {allImages.length}
                  </Badge>
                </div>
              )}

              {/* Package Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex flex-wrap gap-2 mb-3">
                  {packageData.tags &&
                    packageData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{packageData.title}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <MapPinIcon className="w-5 h-5" />
                  <span className="text-lg">{packageData.location}</span>
                </div>
              </div>
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
                      alt={`${packageData.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Package Info */}
          <div className="space-y-6">
            {/* Package Stats */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">
                  {packageData.rating} ({packageData.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="w-5 h-5" />
                <span>{packageData.duration} days</span>
              </div>
              <div className="flex items-center gap-1">
                <UsersIcon className="w-5 h-5" />
                <span>2-10 travelers</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-lg text-muted-foreground">{packageData.description}</p>
            </div>

            {/* Price Display */}
            <div className="bg-primary/10 rounded-lg p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  €{Math.round(packageData.price_euro || packageData.price * 0.85)}
                </div>
                <div className="text-sm text-muted-foreground">per person</div>
                <div className="text-xs text-muted-foreground mt-1">(≈ ${packageData.price} USD)</div>
              </div>
            </div>

            {/* Quick Booking */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Booking</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date" className="block mb-2">
                      Select Date
                    </Label>
                    <select
                      id="date"
                      className="w-full p-2 border rounded-md"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      <option value="">Select a date</option>
                      {availableDates.map((date) => (
                        <option key={date.date} value={date.date}>
                          {date.date} - €{Math.round(date.price)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="travelers" className="block mb-2">
                      Number of Travelers
                    </Label>
                    <select
                      id="travelers"
                      className="w-full p-2 border rounded-md"
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "traveler" : "travelers"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button className="w-full" size="lg">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Package Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {/* Itinerary Tab */}
              <TabsContent value="itinerary" className="space-y-6">
                {itinerary.map((day) => (
                  <Card key={day.day}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">{day.title}</h3>
                          <p className="text-muted-foreground">{day.description}</p>
                          <div className="pt-2">
                            <h4 className="font-medium mb-2">Activities:</h4>
                            <ul className="space-y-1">
                              {day.activities.map((activity, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckIcon className="w-5 h-5 text-primary mt-0.5" />
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Inclusions Tab */}
              <TabsContent value="inclusions" className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <CheckIcon className="w-5 h-5 text-green-500" />
                          What's Included
                        </h3>
                        <ul className="space-y-2">
                          {inclusions.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckIcon className="w-5 h-5 text-green-500 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <InfoIcon className="w-5 h-5 text-amber-500" />
                          What's Not Included
                        </h3>
                        <ul className="space-y-2">
                          {exclusions.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <InfoIcon className="w-5 h-5 text-amber-500 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Accommodation</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <BedIcon className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Comfortable Hotels</h4>
                          <p className="text-sm text-muted-foreground">
                            4-star accommodations with all necessary amenities
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <UtensilsIcon className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Selected Meals</h4>
                          <p className="text-sm text-muted-foreground">Daily breakfast and some lunches/dinners</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <PlaneIcon className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Transportation</h4>
                          <p className="text-sm text-muted-foreground">
                            All transfers and transportation within the itinerary
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <UsersIcon className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Expert Guides</h4>
                          <p className="text-sm text-muted-foreground">
                            English-speaking guides throughout your journey
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-primary/10 text-primary rounded-lg p-4 text-center">
                    <div className="text-4xl font-bold">{packageData.rating}</div>
                    <div className="text-sm">out of 5</div>
                  </div>
                  <div>
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(packageData.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 fill-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-muted-foreground">Based on {packageData.reviews} reviews</div>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: "Sarah Johnson",
                      date: "March 2025",
                      rating: 5,
                      comment:
                        "This was an amazing experience! The itinerary was well-planned, and our guide was knowledgeable and friendly. The accommodations were comfortable, and the food was delicious. I highly recommend this package!",
                    },
                    {
                      name: "Michael Chen",
                      date: "February 2025",
                      rating: 4,
                      comment:
                        "Overall a great trip. The activities were fun and the guide was excellent. The only reason I'm giving 4 stars instead of 5 is because one of the hotels wasn't as nice as expected. Otherwise, everything was perfect!",
                    },
                    {
                      name: "Emma Rodriguez",
                      date: "January 2025",
                      rating: 5,
                      comment:
                        "Exceeded my expectations! The tour was well-organized, and we got to see so much in a short amount of time. Our guide was fantastic and really made the experience special. Would definitely book again!",
                    },
                  ].map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold">{review.name}</h4>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex mb-3">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Booking */}
          <div>
            <div className="sticky top-24">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold">
                      €{Math.round(packageData.price_euro || packageData.price * 0.85)}
                    </div>
                    <div className="text-sm text-muted-foreground">per person</div>
                    <div className="text-xs text-muted-foreground">(≈ ${packageData.price} USD)</div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="date" className="block mb-2">
                        Select Date
                      </Label>
                      <select
                        id="date"
                        className="w-full p-2 border rounded-md"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      >
                        <option value="">Select a date</option>
                        {availableDates.map((date) => (
                          <option key={date.date} value={date.date}>
                            {date.date} - €{Math.round(date.price)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="travelers" className="block mb-2">
                        Number of Travelers
                      </Label>
                      <select
                        id="travelers"
                        className="w-full p-2 border rounded-md"
                        value={travelers}
                        onChange={(e) => setTravelers(Number(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "traveler" : "travelers"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Button className="w-full text-lg py-6" size="lg">
                      Book Now
                    </Button>

                    <Button variant="outline" className="w-full" size="lg">
                      <HeartIcon className="w-5 h-5 mr-2" />
                      Add to Wishlist
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-2">Price Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Base price</span>
                        <span>
                          €{Math.round(packageData.price_euro || packageData.price * 0.85)} x {travelers}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & fees</span>
                        <span>
                          €{Math.round((packageData.price_euro || packageData.price * 0.85) * travelers * 0.1)}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold pt-2 border-t">
                        <span>Total</span>
                        <span>
                          €
                          {Math.round(
                            (packageData.price_euro || packageData.price * 0.85) * travelers +
                              (packageData.price_euro || packageData.price * 0.85) * travelers * 0.1,
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our travel experts are here to assist you with your booking.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}