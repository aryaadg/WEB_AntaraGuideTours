"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/image-upload"
import { MultiImageUpload } from "@/components/multi-image-upload"
import { supabase } from "@/lib/supabase"
import { getDestinations, getPackages } from "@/lib/api"
import { checkStorageSetup, tryCreateBucket } from "@/lib/storage"
import { PlusIcon, Trash2Icon, PencilIcon, AlertCircleIcon, CheckCircleIcon, ExternalLinkIcon } from "lucide-react"
import Image from "next/image"

export default function AdminPage() {
  const [destinations, setDestinations] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("destinations")
  const [storageStatus, setStorageStatus] = useState(null)

  // Form states
  const [destinationForm, setDestinationForm] = useState({
    id: null,
    name: "",
    location: "",
    description: "",
    image_url: "",
    support_images: [],
    properties: 0,
    featured: false,
  })

  const [packageForm, setPackageForm] = useState({
    id: null,
    title: "",
    location: "",
    description: "",
    image_url: "",
    support_images: [],
    price: 0,
    price_euro: 0,
    duration: 0,
    rating: 0,
    reviews: 0,
    featured: false,
    tags: "",
  })

  useEffect(() => {
    async function loadData() {
      try {
        // Check storage setup
        const storageCheck = await checkStorageSetup()
        setStorageStatus(storageCheck)

        // Load data
        const destinationsData = await getDestinations()
        const packagesData = await getPackages()

        setDestinations(destinationsData)
        setPackages(packagesData)
      } catch (error) {
        console.error("Error loading data:", error)
        setStorageStatus({
          success: false,
          error: error.message,
          needsManualSetup: true,
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleCreateBucket = async () => {
    const result = await tryCreateBucket()
    if (result.success) {
      const storageCheck = await checkStorageSetup()
      setStorageStatus(storageCheck)
    } else {
      setStorageStatus({
        success: false,
        error: result.error,
        needsManualSetup: true,
      })
    }
  }

  const recheckStorage = async () => {
    const storageCheck = await checkStorageSetup()
    setStorageStatus(storageCheck)
  }

  // Destination form handlers
  const handleDestinationChange = (e) => {
    const { name, value, type, checked } = e.target
    setDestinationForm({
      ...destinationForm,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleDestinationImageChange = (url: string) => {
    setDestinationForm({
      ...destinationForm,
      image_url: url,
    })
  }

  const handleDestinationSupportImagesChange = (urls: string[]) => {
    setDestinationForm({
      ...destinationForm,
      support_images: urls,
    })
  }

  const handleDestinationSubmit = async (e) => {
    e.preventDefault()

    try {
      if (destinationForm.id) {
        const { error } = await supabase
          .from("destinations")
          .update({
            name: destinationForm.name,
            location: destinationForm.location,
            description: destinationForm.description,
            image_url: destinationForm.image_url,
            support_images: destinationForm.support_images,
            properties: Number.parseInt(destinationForm.properties),
            featured: destinationForm.featured,
          })
          .eq("id", destinationForm.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("destinations").insert({
          name: destinationForm.name,
          location: destinationForm.location,
          description: destinationForm.description,
          image_url: destinationForm.image_url,
          support_images: destinationForm.support_images,
          properties: Number.parseInt(destinationForm.properties),
          featured: destinationForm.featured,
        })

        if (error) throw error
      }

      const destinationsData = await getDestinations()
      setDestinations(destinationsData)

      setDestinationForm({
        id: null,
        name: "",
        location: "",
        description: "",
        image_url: "",
        support_images: [],
        properties: 0,
        featured: false,
      })

      alert("Destination saved successfully!")
    } catch (error) {
      console.error("Error saving destination:", error)
      alert("Failed to save destination: " + error.message)
    }
  }

  const editDestination = (destination) => {
    setDestinationForm({
      id: destination.id,
      name: destination.name,
      location: destination.location,
      description: destination.description,
      image_url: destination.image_url,
      support_images: destination.support_images || [],
      properties: destination.properties,
      featured: destination.featured,
    })
    setActiveTab("destinations")
  }

  const deleteDestination = async (id) => {
    if (!confirm("Are you sure you want to delete this destination?")) return

    try {
      const { error } = await supabase.from("destinations").delete().eq("id", id)
      if (error) throw error

      const destinationsData = await getDestinations()
      setDestinations(destinationsData)
      alert("Destination deleted successfully!")
    } catch (error) {
      console.error("Error deleting destination:", error)
      alert("Failed to delete destination: " + error.message)
    }
  }

  // Package form handlers
  const handlePackageChange = (e) => {
    const { name, value, type, checked } = e.target
    setPackageForm({
      ...packageForm,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handlePackageImageChange = (url: string) => {
    setPackageForm({
      ...packageForm,
      image_url: url,
    })
  }

  const handlePackageSupportImagesChange = (urls: string[]) => {
    setPackageForm({
      ...packageForm,
      support_images: urls,
    })
  }

  const handlePackageSubmit = async (e) => {
    e.preventDefault()

    try {
      if (packageForm.id) {
        const { error } = await supabase
          .from("packages")
          .update({
            title: packageForm.title,
            location: packageForm.location,
            description: packageForm.description,
            image_url: packageForm.image_url,
            support_images: packageForm.support_images,
            price: Number.parseFloat(packageForm.price),
            price_euro: Number.parseFloat(packageForm.price_euro),
            duration: Number.parseInt(packageForm.duration),
            rating: Number.parseFloat(packageForm.rating),
            reviews: Number.parseInt(packageForm.reviews),
            featured: packageForm.featured,
          })
          .eq("id", packageForm.id)

        if (error) throw error

        await supabase.from("package_tags").delete().eq("package_id", packageForm.id)

        const tags = packageForm.tags.split(",").map((tag) => tag.trim())
        for (const tag of tags) {
          if (tag) {
            await supabase.from("package_tags").insert({
              package_id: packageForm.id,
              tag,
            })
          }
        }
      } else {
        const { data, error } = await supabase
          .from("packages")
          .insert({
            title: packageForm.title,
            location: packageForm.location,
            description: packageForm.description,
            image_url: packageForm.image_url,
            support_images: packageForm.support_images,
            price: Number.parseFloat(packageForm.price),
            price_euro: Number.parseFloat(packageForm.price_euro),
            duration: Number.parseInt(packageForm.duration),
            rating: Number.parseFloat(packageForm.rating),
            reviews: Number.parseInt(packageForm.reviews),
            featured: packageForm.featured,
          })
          .select()

        if (error) throw error

        const newPackageId = data[0].id
        const tags = packageForm.tags.split(",").map((tag) => tag.trim())
        for (const tag of tags) {
          if (tag) {
            await supabase.from("package_tags").insert({
              package_id: newPackageId,
              tag,
            })
          }
        }
      }

      const packagesData = await getPackages()
      setPackages(packagesData)

      setPackageForm({
        id: null,
        title: "",
        location: "",
        description: "",
        image_url: "",
        support_images: [],
        price: 0,
        price_euro: 0,
        duration: 0,
        rating: 0,
        reviews: 0,
        featured: false,
        tags: "",
      })

      alert("Package saved successfully!")
    } catch (error) {
      console.error("Error saving package:", error)
      alert("Failed to save package: " + error.message)
    }
  }

  const editPackage = (pkg) => {
    setPackageForm({
      id: pkg.id,
      title: pkg.title,
      location: pkg.location,
      description: pkg.description,
      image_url: pkg.image_url,
      support_images: pkg.support_images || [],
      price: pkg.price,
      price_euro: pkg.price_euro || pkg.price * 0.85,
      duration: pkg.duration,
      rating: pkg.rating,
      reviews: pkg.reviews,
      featured: pkg.featured,
      tags: pkg.tags ? pkg.tags.join(", ") : "",
    })
    setActiveTab("packages")
  }

  const deletePackage = async (id) => {
    if (!confirm("Are you sure you want to delete this package?")) return

    try {
      const { error } = await supabase.from("packages").delete().eq("id", id)
      if (error) throw error

      const packagesData = await getPackages()
      setPackages(packagesData)
      alert("Package deleted successfully!")
    } catch (error) {
      console.error("Error deleting package:", error)
      alert("Failed to delete package: " + error.message)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={recheckStorage}>
              Check Storage
            </Button>
            {storageStatus && !storageStatus.success && (
              <Button size="sm" variant="outline" onClick={handleCreateBucket}>
                Try Create Bucket
              </Button>
            )}
            <div
              className={`text-sm px-3 py-1 rounded ${
                storageStatus?.success
                  ? "text-green-700 bg-green-50 border border-green-200"
                  : "text-amber-700 bg-amber-50 border border-amber-200"
              }`}
            >
              {storageStatus?.success ? "✅ Storage Ready" : "⚠️ Storage Setup Needed"}
            </div>
          </div>
        </div>

        {/* Storage Status Alert */}
        {storageStatus && (
          <div className="mb-6">
            {storageStatus.success ? (
              <div className="flex items-start gap-2 p-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
                <CheckCircleIcon className="h-4 w-4 mt-0.5" />
                <div>
                  <p className="font-medium">Storage Ready!</p>
                  <p>{storageStatus.message}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 p-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md">
                <AlertCircleIcon className="h-4 w-4 mt-0.5" />
                <div>
                  <p className="font-medium">Storage Setup Required:</p>
                  <p>{storageStatus.error}</p>
                  {storageStatus.instructions && <p className="mt-2">{storageStatus.instructions}</p>}
                  {storageStatus.needsManualSetup && (
                    <div className="mt-3 space-y-2">
                      <p className="font-medium">Manual Setup Steps:</p>
                      <ol className="list-decimal list-inside space-y-1 text-xs">
                        <li>
                          Go to{" "}
                          <a
                            href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/project/default/storage/buckets`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline inline-flex items-center gap-1"
                          >
                            Supabase Storage <ExternalLinkIcon className="h-3 w-3" />
                          </a>
                        </li>
                        <li>Click "New bucket"</li>
                        <li>Name: "images"</li>
                        <li>Check "Public bucket" ✅</li>
                        <li>Click "Create bucket"</li>
                        <li>
                          Go to{" "}
                          <a
                            href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/project/default/storage/policies`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline inline-flex items-center gap-1"
                          >
                            Storage Policies <ExternalLinkIcon className="h-3 w-3" />
                          </a>
                        </li>
                        <li>Create policies for INSERT, SELECT, DELETE operations</li>
                        <li>Click "Check Storage" button above</li>
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="destinations">Destinations</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
          </TabsList>

          <TabsContent value="destinations">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Add/Edit Destination</h2>
                <Card>
                  <form onSubmit={handleDestinationSubmit}>
                    <CardHeader>
                      <CardTitle>{destinationForm.id ? "Edit" : "Add"} Destination</CardTitle>
                      <CardDescription>
                        {destinationForm.id
                          ? `Editing destination ID: ${destinationForm.id}`
                          : "Create a new destination"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={destinationForm.name}
                          onChange={handleDestinationChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={destinationForm.location}
                          onChange={handleDestinationChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={destinationForm.description}
                          onChange={handleDestinationChange}
                          required
                        />
                      </div>

                      <ImageUpload
                        value={destinationForm.image_url}
                        onChange={handleDestinationImageChange}
                        label="Main Destination Image"
                        folder="destinations"
                      />

                      <MultiImageUpload
                        value={destinationForm.support_images}
                        onChange={handleDestinationSupportImagesChange}
                        label="Support Images (Gallery)"
                        folder="destinations/gallery"
                        maxImages={5}
                      />

                      <div className="space-y-2">
                        <Label htmlFor="properties">Properties</Label>
                        <Input
                          id="properties"
                          name="properties"
                          type="number"
                          value={destinationForm.properties}
                          onChange={handleDestinationChange}
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          name="featured"
                          checked={destinationForm.featured}
                          onCheckedChange={(checked) => setDestinationForm({ ...destinationForm, featured: checked })}
                        />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setDestinationForm({
                            id: null,
                            name: "",
                            location: "",
                            description: "",
                            image_url: "",
                            support_images: [],
                            properties: 0,
                            featured: false,
                          })
                        }
                      >
                        Cancel
                      </Button>
                      <Button type="submit">{destinationForm.id ? "Update" : "Create"} Destination</Button>
                    </CardFooter>
                  </form>
                </Card>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Destinations List</h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {destinations.map((destination) => (
                    <Card key={destination.id}>
                      <CardHeader>
                        <CardTitle className="flex justify-between">
                          <span>{destination.name}</span>
                          {destination.featured && (
                            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">Featured</span>
                          )}
                        </CardTitle>
                        <CardDescription>{destination.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {destination.image_url && (
                          <div className="relative w-full h-32 mb-3 rounded overflow-hidden">
                            <Image
                              src={destination.image_url || "/placeholder.svg"}
                              alt={destination.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <p className="text-sm line-clamp-2">{destination.description}</p>
                        <p className="text-sm mt-2">Properties: {destination.properties}</p>
                        {destination.support_images && destination.support_images.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Gallery: {destination.support_images.length} images
                          </p>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-end space-x-2">
                        <Button size="sm" variant="outline" onClick={() => editDestination(destination)}>
                          <PencilIcon className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteDestination(destination.id)}>
                          <Trash2Icon className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}

                  {destinations.length === 0 && (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground">No destinations found</p>
                        <Button
                          className="mt-4"
                          onClick={() =>
                            setDestinationForm({
                              id: null,
                              name: "",
                              location: "",
                              description: "",
                              image_url: "",
                              support_images: [],
                              properties: 0,
                              featured: false,
                            })
                          }
                        >
                          <PlusIcon className="h-4 w-4 mr-1" /> Add Destination
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="packages">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Add/Edit Package</h2>
                <Card>
                  <form onSubmit={handlePackageSubmit}>
                    <CardHeader>
                      <CardTitle>{packageForm.id ? "Edit" : "Add"} Package</CardTitle>
                      <CardDescription>
                        {packageForm.id ? `Editing package ID: ${packageForm.id}` : "Create a new travel package"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          name="title"
                          value={packageForm.title}
                          onChange={handlePackageChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={packageForm.location}
                          onChange={handlePackageChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={packageForm.description}
                          onChange={handlePackageChange}
                          required
                        />
                      </div>

                      <ImageUpload
                        value={packageForm.image_url}
                        onChange={handlePackageImageChange}
                        label="Main Package Image"
                        folder="packages"
                      />

                      <MultiImageUpload
                        value={packageForm.support_images}
                        onChange={handlePackageSupportImagesChange}
                        label="Support Images (Gallery)"
                        folder="packages/gallery"
                        maxImages={5}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price (USD $)</Label>
                          <Input
                            id="price"
                            name="price"
                            type="number"
                            step="0.01"
                            value={packageForm.price}
                            onChange={handlePackageChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="price_euro">Price (EUR €)</Label>
                          <Input
                            id="price_euro"
                            name="price_euro"
                            type="number"
                            step="0.01"
                            value={packageForm.price_euro}
                            onChange={handlePackageChange}
                            placeholder="Auto-calculated if empty"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="duration">Duration (days)</Label>
                          <Input
                            id="duration"
                            name="duration"
                            type="number"
                            value={packageForm.duration}
                            onChange={handlePackageChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="rating">Rating (0-5)</Label>
                          <Input
                            id="rating"
                            name="rating"
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            value={packageForm.rating}
                            onChange={handlePackageChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reviews">Reviews Count</Label>
                        <Input
                          id="reviews"
                          name="reviews"
                          type="number"
                          value={packageForm.reviews}
                          onChange={handlePackageChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input
                          id="tags"
                          name="tags"
                          value={packageForm.tags}
                          onChange={handlePackageChange}
                          placeholder="Beach, Adventure, Cultural"
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="featured"
                          name="featured"
                          checked={packageForm.featured}
                          onCheckedChange={(checked) => setPackageForm({ ...packageForm, featured: checked })}
                        />
                        <Label htmlFor="featured">Featured</Label>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          setPackageForm({
                            id: null,
                            title: "",
                            location: "",
                            description: "",
                            image_url: "",
                            support_images: [],
                            price: 0,
                            price_euro: 0,
                            duration: 0,
                            rating: 0,
                            reviews: 0,
                            featured: false,
                            tags: "",
                          })
                        }
                      >
                        Cancel
                      </Button>
                      <Button type="submit">{packageForm.id ? "Update" : "Create"} Package</Button>
                    </CardFooter>
                  </form>
                </Card>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Packages List</h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {packages.map((pkg) => (
                    <Card key={pkg.id}>
                      <CardHeader>
                        <CardTitle className="flex justify-between">
                          <span>{pkg.title}</span>
                          {pkg.featured && (
                            <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">Featured</span>
                          )}
                        </CardTitle>
                        <CardDescription>{pkg.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        {pkg.image_url && (
                          <div className="relative w-full h-32 mb-3 rounded overflow-hidden">
                            <Image
                              src={pkg.image_url || "/placeholder.svg"}
                              alt={pkg.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <p className="text-sm line-clamp-2">{pkg.description}</p>
                        <div className="flex justify-between mt-2">
                          <p className="text-sm">
                            €{Math.round(pkg.price_euro || pkg.price * 0.85)} • {pkg.duration} days
                          </p>
                          <p className="text-sm">
                            Rating: {pkg.rating}/5 ({pkg.reviews} reviews)
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {pkg.tags &&
                            pkg.tags.map((tag) => (
                              <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                        </div>
                        {pkg.support_images && pkg.support_images.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Gallery: {pkg.support_images.length} images
                          </p>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-end space-x-2">
                        <Button size="sm" variant="outline" onClick={() => editPackage(pkg)}>
                          <PencilIcon className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deletePackage(pkg.id)}>
                          <Trash2Icon className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}

                  {packages.length === 0 && (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <p className="text-muted-foreground">No packages found</p>
                        <Button
                          className="mt-4"
                          onClick={() =>
                            setPackageForm({
                              id: null,
                              title: "",
                              location: "",
                              description: "",
                              image_url: "",
                              support_images: [],
                              price: 0,
                              price_euro: 0,
                              duration: 0,
                              rating: 0,
                              reviews: 0,
                              featured: false,
                              tags: "",
                            })
                          }
                        >
                          <PlusIcon className="h-4 w-4 mr-1" /> Add Package
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}