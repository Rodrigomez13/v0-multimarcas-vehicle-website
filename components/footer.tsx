import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-gf-multimarcas-circular-transparente.png"
                alt="GF MultiMarcas Logo"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div>
                <span className="text-xl font-bold">
                  <span className="text-primary">GF</span>
                  <span className="text-accent"> MultiMarcas</span>
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Tu concesionaria de confianza. Más de 15 años ofreciendo los mejores 
              vehículos al mejor precio.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#catalogo" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="#nosotros" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors text-sm opacity-60">
                  Panel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Vehicles */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Vehículos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#catalogo" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Autos 0km
                </Link>
              </li>
              <li>
                <Link href="#catalogo" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Autos Usados
                </Link>
              </li>
              <li>
                <Link href="#catalogo" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Motos
                </Link>
              </li>
              <li>
                <Link href="#catalogo" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Camionetas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Fotheringham 2186</li>
              <li>Formosa, Argentina</li>
              <li>+54 3704843608</li>
              <li>ventas@gfmultimarcas.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} GF MultiMarcas. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
