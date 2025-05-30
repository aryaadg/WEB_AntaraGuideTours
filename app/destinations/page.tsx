import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedDestinations } from "@/components/featured-destinations"
import { TopDestinationsGrid } from "@/components/top-destinations-grid"

export default function DestinationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Explore Amazing Destinations</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the most beautiful places in Bali and beyond. From pristine beaches to ancient temples, cultural
              villages to stunning landscapes - find your perfect destination.
            </p>
          </div>
        </section>

        <FeaturedDestinations />
        <TopDestinationsGrid />
      </main>
      <Footer />
    </div>
  )
}
