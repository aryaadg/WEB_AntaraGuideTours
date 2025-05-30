import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, CalendarIcon, UsersIcon, StarIcon } from "lucide-react"
import Image from "next/image"

interface HeroProfileProps {
  title: string
  location: string
  description: string
  imageUrl: string
  properties?: number
  altitude?: string
  age?: string
  visitors?: string
  features?: string[]
  bestTime?: string
  idealFor?: string[]
}

export function HeroProfile({
  title = "Badimalika Temple",
  location = "Bajura District, Nepal",
  description = "A sacred Hindu temple dedicated to Bhagwati, located in the pristine mountains of Triveni Municipality.",
  imageUrl = "/images/hero.jpg",
  properties = 240,
  altitude = "2,800m",
  age = "500+",
  visitors = "10k+",
  features = [
    "Sacred temple dedicated to Goddess Bhagwati",
    "Malika Chaturdashi festival celebration",
    "Panoramic Himalayan mountain views",
    "Served by priests from two districts",
  ],
  bestTime = "March to May, September to November",
  idealFor = ["Spiritual seekers", "Nature lovers", "Trekkers"],
}: HeroProfileProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Foto di Kiri */}
          <div className="relative">
            <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Badge di atas foto */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground">Featured Destination</Badge>
              </div>

              {/* Rating di bawah foto */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <span className="text-sm font-medium">4.9</span>
                    <span className="text-sm text-muted-foreground">(127 reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tulisan di Kanan */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <MapPinIcon className="w-5 h-5" />
                <span className="text-sm font-medium">{location}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{title}</h1>

              <p className="text-xl text-muted-foreground leading-relaxed">{description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{altitude}</div>
                <div className="text-sm text-muted-foreground">Altitude</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{age}</div>
                <div className="text-sm text-muted-foreground">Years Old</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{visitors}</div>
                <div className="text-sm text-muted-foreground">Visitors/Year</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What Makes It Special</h3>
              <div className="grid gap-3">
                {features.map((feature, index) => (
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
                  <div className="text-sm text-muted-foreground">{bestTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <UsersIcon className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium">Ideal For</div>
                  <div className="text-sm text-muted-foreground">{idealFor.join(", ")}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="flex-1">
                Plan Your Visit
              </Button>
              <Button variant="outline" size="lg" className="flex-1">
                View Gallery
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}