import { FeaturedDestinations } from "@/components/featured-destinations"
import { PopularPackages } from "@/components/popular-packages"
import { TopDestinationsGrid } from "@/components/top-destinations-grid"
import { DreamStaysBanner } from "@/components/dream-stays-banner"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Dream Stays Banner */}
        <DreamStaysBanner />

        <FeaturedDestinations />
        <PopularPackages />
        <TopDestinationsGrid />
        <Testimonials />
        <DreamStaysBanner />
      </main>
      <Footer />
    </div>
  )
}