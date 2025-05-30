"use client"

import { Button } from "@/components/ui/button"
import { MessageCircleIcon } from "lucide-react"

export function Newsletter() {
  const handleContactClick = () => {
    window.open("https://wa.me/6281338544519", "_blank")
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to Start Your Bali Adventure?</h2>
          <p className="mt-4 mb-8">
            Contact me directly on WhatsApp to plan your perfect Bali experience. I'm here to help you create
            unforgettable memories!
          </p>
          <Button variant="secondary" size="lg" onClick={handleContactClick}>
            <MessageCircleIcon className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </Button>
          <p className="mt-4 text-sm opacity-80">Available 7 days a week • Fast response guaranteed</p>
        </div>
      </div>
    </section>
  )
}
