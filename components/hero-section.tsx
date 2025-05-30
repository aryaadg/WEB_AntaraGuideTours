"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, PhoneIcon, MessageCircleIcon } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

export function HeroSection() {
  const { t } = useLanguage()

  const handleContactClick = () => {
    window.open("https://wa.me/6281338544519", "_blank")
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 mx-auto">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/hero.jpg" alt="antara guide tour" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Badge overlay */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary text-primary-foreground">Professional Tour Guide</Badge>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6 order-1 lg:order-2">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <MapPinIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Bali, Indonesia</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{t("heroTitle")}</h1>

              <p className="text-xl text-muted-foreground leading-relaxed">{t("heroSubtitle")}</p>
            </div>
            
{/* Features */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold">{t("whyChoose")}</h3>
  <div className="grid gap-3">
    {String(t("features"))
      .split(",")
      .map((feature, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <span className="text-muted-foreground">{feature.trim()}</span>
        </div>
      ))}
  </div>
</div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">{t("happyClients")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">{t("destinationsCount")}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5★</div>
                <div className="text-sm text-muted-foreground">{t("rating")}</div>
              </div>
            </div>

            {/* Contact Button - Centered */}
            <div className="pt-4 text-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={handleContactClick}>
                <MessageCircleIcon className="w-5 h-5 mr-2" />
                {t("contactWhatsApp")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}