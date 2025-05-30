"use client"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlobeIcon, MenuIcon, UserIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/lib/language-context"

export function Header() {
  const { t } = useLanguage()
  
  const handleBookNowClick = () => {
    window.open("https://wa.me/6281338544519", "_blank")
  }

  const handleContactClick = () => {
    window.open("https://lynk.id/gedeguidebalifrancophone", "_blank")
  }
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <GlobeIcon className="w-6 h-6 text-primary" />
          <span>Antara Guide Tour</span>
        </Link>
        <nav className="hidden space-x-6 md:flex">
          <Link href="/destinations" className="text-sm font-medium transition-colors hover:text-primary">
            {t("destinations")}
          </Link>
          <Link href="/packages" className="text-sm font-medium transition-colors hover:text-primary">
            {t("packages")}
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            {t("about")}
          </Link>
          <button 
            onClick={handleContactClick}
            className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
          >
            {t("contact")}
          </button>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Button className="hidden md:inline-flex" onClick={handleBookNowClick}>
            {t("bookNow")}
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/destinations" className="text-sm font-medium transition-colors hover:text-primary">
                  {t("destinations")}
                </Link>
                <Link href="/packages" className="text-sm font-medium transition-colors hover:text-primary">
                  {t("packages")}
                </Link>
                <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                  {t("about")}
                </Link>
                <button 
                  onClick={handleContactClick}
                  className="text-sm font-medium transition-colors hover:text-primary cursor-pointer text-left"
                >
                  {t("contact")}
                </button>
                <Separator />
                <Button onClick={handleBookNowClick} className="w-full">
                  {t("bookNow")}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}