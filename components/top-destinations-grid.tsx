"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"
import Link from "next/link"

export function TopDestinationsGrid() {
  const [showAll, setShowAll] = useState(false)
  const { t } = useLanguage()

  const destinations = [
    {
      name: "UBUD",
      image: "/images/ubud.jpg",
      href: "/destinations/ubud",
    },
    {
      name: "CANGGU",
      image: "/images/canggu.jpg",
      href: "/destinations/canggu",
    },
    {
      name: "NUSAPENIDA",
      image: "/images/nusapenida.jpg",
      href: "/destinations/nusapenida",
    },
    {
      name: "NUSADUA",
      image: "/images/nusadua.jpg",
      href: "/destinations/nusadua",
    },
    {
      name: "KUTA",
      image: "/images/kuta.jpg",
      href: "/destinations/kuta",
    },
    {
      name: "SEMINYAK",
      image: "/images/seminyak.jpg",
      href: "/destinations/seminyak",
    },
    {
      name: "LEGIAN",
      image: "/images/legian.jpg",
      href: "/destinations/legian",
    },
    {
      name: "SANUR",
      image: "/images/sanur.jpg",
      href: "/destinations/sanur",
    },
    {
      name: "NUSALEMBONGAN",
      image: "/images/nusalembongan.jpg",
      href: "/destinations/nusalembongan",
    },
    {
      name: "JIMBARAN",
      image: "/images/jimbaran.jpg",
      href: "/destinations/jimbaran",
    },
    {
      name: "ULUWATU",
      image: "/images/uluwatu.jpg",
      href: "/destinations/uluwatu",
    },
    {
      name: "AMED",
      image: "/images/amed.jpg",
      href: "/destinations/amed",
    },
  ]

  // For mobile: show only first 4 unless showAll is true
  // For desktop: always show all
  const displayedDestinations = showAll ? destinations : destinations.slice(0, 4)

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t("topDestinationsTitle")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("topDestinationsSubtitle")}</p>
        </div>

        {/* Desktop Grid - Always show all destinations */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <Link key={index} href={destination.href}>
              <Card className="group relative overflow-hidden h-48 md:h-56 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="absolute inset-0">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl md:text-2xl font-bold tracking-wider text-center px-4">
                    {destination.name}
                  </h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* Mobile Grid - Show 4 or all based on state */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-4">
            {displayedDestinations.map((destination, index) => (
              <Link key={index} href={destination.href}>
                <Card className="group relative overflow-hidden h-40 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="absolute inset-0">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-lg font-bold tracking-wider text-center px-2">{destination.name}</h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Mobile Toggle Button */}
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg" onClick={() => setShowAll(!showAll)} className="px-8">
              {showAll ? (
                <>
                  <ChevronUpIcon className="w-5 h-5 mr-2" />
                  {t("showLess")}
                </>
              ) : (
                <>
                  <ChevronDownIcon className="w-5 h-5 mr-2" />
                  {t("exploreMore")} ({destinations.length - 4} {t("more")})
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}