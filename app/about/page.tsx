"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, StarIcon, UsersIcon, CameraIcon, MessageCircleIcon } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const handleContactClick = () => {
    window.open("https://wa.me/6281338544519", "_blank")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 mx-auto">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <Badge className="w-fit">About Antara Guide Tours</Badge>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Your Trusted <span className="text-primary">Bali Guide</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Hi, I'm Antara! I've been sharing the beauty and culture of Bali with travelers from around the world
                  for over 10 years. My passion is showing you the real Bali - beyond the tourist spots.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Happy Clients</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">5+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                </div>
                <Button size="lg" onClick={handleContactClick}>
                  <MessageCircleIcon className="w-5 h-5 mr-2" />
                  Contact Me
                </Button>
              </div>
              <div className="relative">
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image src="/images/hero.jpg" alt="Alex - Your Bali Guide" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">What I Offer</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Personalized experiences tailored to your interests and travel style
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <MapPinIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Local Expertise</h3>
                  <p className="text-sm text-muted-foreground">
                    Born and raised in Bali, I know every hidden gem and secret spot
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <UsersIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Personalized Tours</h3>
                  <p className="text-sm text-muted-foreground">
                    Custom itineraries based on your interests and preferences
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <CameraIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Photography</h3>
                  <p className="text-sm text-muted-foreground">Professional photos to capture your Bali memories</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <StarIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">5-Star Service</h3>
                  <p className="text-sm text-muted-foreground">Exceptional service with attention to every detail</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">My Story</h2>
              <div className="prose prose-lg mx-auto text-muted-foreground">
                <p>
                  Growing up in Bali, I've always been fascinated by the rich culture and stunning natural beauty of my
                  island home. After studying tourism and hospitality, I decided to share my love for Bali with visitors
                  from around the world.
                </p>
                <p>
                  What started as a passion project has grown into a mission: to show travelers the authentic Bali that
                  goes beyond the typical tourist experience. I believe that travel should be transformative, connecting
                  people with local culture, nature, and themselves.
                </p>
                <p>
                  Every tour I lead is unique, crafted specifically for my guests' interests. Whether you're seeking
                  adventure, relaxation, cultural immersion, or spiritual growth, I'll help you discover the Bali that
                  speaks to your soul.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Explore Bali?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create unforgettable memories together in the Island of Gods
            </p>
            <Button size="lg" variant="secondary" onClick={handleContactClick}>
              <MessageCircleIcon className="w-5 h-5 mr-2" />
              Start Planning Your Trip
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}