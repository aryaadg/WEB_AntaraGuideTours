import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PopularPackages } from "@/components/popular-packages"

export default function PackagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Travel Packages</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our carefully curated travel packages designed to give you the best experience of Bali. All
              packages include professional guide, transportation, and unforgettable memories.
            </p>
          </div>
        </section>

        <PopularPackages />
      </main>
      <Footer />
    </div>
  )
}