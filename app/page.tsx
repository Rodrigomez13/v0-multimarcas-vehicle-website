import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { VehicleCatalog } from "@/components/vehicle-catalog"
import { Features } from "@/components/features"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <VehicleCatalog />
        <Features />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
