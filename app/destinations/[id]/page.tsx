import { getDestinationById } from "@/lib/api"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DestinationDetail } from "@/components/destination-detail"
import { notFound } from "next/navigation"

export default async function DestinationPage({ params }: { params: { id: string } }) {
  const destination = await getDestinationById(Number.parseInt(params.id))

  if (!destination) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <DestinationDetail destination={destination} />
      </main>
      <Footer />
    </div>
  )
}
