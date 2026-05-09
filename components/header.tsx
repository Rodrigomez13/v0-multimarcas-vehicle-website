"use client"

import Image from "next/image"
import Link from "next/link"
import { Phone, MapPin, Mail, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Top bar */}
      <div className="bg-secondary py-2 hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              +54 11 1234-5678
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              ventas@multimarcas.com
            </span>
          </div>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Av. Principal 1234, Buenos Aires
          </span>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="MultiMarcas Logo"
              width={180}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Inicio
            </Link>
            <Link href="#catalogo" className="text-foreground hover:text-primary transition-colors font-medium">
              Catálogo
            </Link>
            <Link href="#nosotros" className="text-foreground hover:text-primary transition-colors font-medium">
              Nosotros
            </Link>
            <Link href="#contacto" className="text-foreground hover:text-primary transition-colors font-medium">
              Contacto
            </Link>
          </div>

          <div className="hidden md:block">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#contacto">Consultanos</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-border mt-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="#catalogo" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Catálogo
              </Link>
              <Link 
                href="#nosotros" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link 
                href="#contacto" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground w-fit">
                <Link href="#contacto" onClick={() => setIsMenuOpen(false)}>Consultanos</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
