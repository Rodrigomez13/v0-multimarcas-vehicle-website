"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary" />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Tu próximo vehículo te espera
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/logo-gf-multimarcas-circular-transparente.png"
                alt="GF MultiMarcas Logo"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover shadow-lg shadow-primary/20"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              <span className="text-primary">GF</span>
              <span className="text-accent"> MultiMarcas</span>
              <br />
              <span className="text-foreground">Vehículos de Calidad</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Encontrá el vehículo perfecto para vos. Ofrecemos la mejor selección de 
              <strong className="text-foreground"> motos, autos y camionetas</strong> — 
              tanto 0km como usados con garantía.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="#catalogo" className="flex items-center gap-2">
                  Ver Catálogo
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-border hover:bg-secondary">
                <Link href="#contacto">
                  Contactanos
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Vehículos Vendidos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground">Años de Experiencia</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Garantía</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="https://i.ibb.co/MkBBysz6/9ac7c69e-ad51-4716-851d-bf681d413e29.png"
                alt="Vehículo de lujo"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-xl">
              <p className="text-sm text-muted-foreground">Ofertas desde</p>
              <p className="text-2xl font-bold text-primary">$8.900.000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
