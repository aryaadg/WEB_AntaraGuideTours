"use client"

import { Button } from "@/components/ui/button"
import { MessageCircleIcon } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

export function DreamStaysBanner() {
  const { t } = useLanguage()

  const handleContactClick = () => {
    window.open("https://wa.me/6281338544519", "_blank")
  }

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src="/images/banner.jpg" alt="Dream Stays in Bali" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 mx-auto text-center text-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider">{t("dreamStaysTitle")}</h2>
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90 max-w-3xl mx-auto">
            {t("dreamStaysSubtitle")}
          </p>
          <div className="pt-6">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" onClick={handleContactClick}>
              <MessageCircleIcon className="w-5 h-5 mr-2" />
              {t("findPerfectStay")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
