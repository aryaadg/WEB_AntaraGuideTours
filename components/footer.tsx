"use client"
import { Separator } from "@/components/ui/separator"
import { GlobeIcon } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

export function Footer() {
  const { t } = useLanguage()

  const handleContactClick = () => {
    window.open("https://lynk.id/gedeguidebalifrancophone", "_blank")
  }

  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 text-xl font-bold">
              <GlobeIcon className="w-6 h-6 text-primary" />
              <span>Antara Guide Tour</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted guide for exploring Bali's hidden gems and cultural treasures.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinations" className="text-muted-foreground hover:text-foreground">
                  {t("destinations")}
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-muted-foreground hover:text-foreground">
                  {t("packages")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  {t("about")}
                </Link>
              </li>
              <li>
                <button 
                  onClick={handleContactClick}
                  className="text-muted-foreground hover:text-foreground cursor-pointer text-left p-0 bg-transparent border-none text-sm"
                >
                  {t("contact")}
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="https://wa.me/6281338544519" target="_blank" className="text-muted-foreground hover:text-foreground">
                  WhatsApp: +62 813-3854-4519
                </Link>
              </li>
              <li>
                <Link href="https://wa.me/6281338544519" className="text-muted-foreground hover:text-foreground">
                  info@antaraguide.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aryaadg Dev. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="https://wa.me/6281338544519" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="https://wa.me/6281338544519" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}