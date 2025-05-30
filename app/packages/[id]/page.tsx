import { getPackageById } from "@/lib/api"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"
import { PackageDetail } from "@/components/package-detail"

export default async function PackagePage({ params }: { params: { id: string } }) {
  const packageData = await getPackageById(Number.parseInt(params.id))

  if (!packageData) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PackageDetail packageData={packageData} />
      </main>
      <Footer />
    </div>
  )
}