"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí se puede agregar lógica de envío
    alert("¡Gracias por tu mensaje! Te contactaremos pronto.")
    setFormData({ name: "", email: "", phone: "", message: "" })
  }

  return (
    <section id="contacto" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Contactanos</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ¿Tenés alguna pregunta? Estamos acá para ayudarte. Completá el formulario 
            o contactanos directamente.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 text-foreground">Información de Contacto</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Teléfono</p>
                    <p className="text-muted-foreground">+54 11 1234-5678</p>
                    <p className="text-muted-foreground">+54 11 8765-4321</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p className="text-muted-foreground">ventas@multimarcas.com</p>
                    <p className="text-muted-foreground">info@multimarcas.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Dirección</p>
                    <p className="text-muted-foreground">Av. Principal 1234</p>
                    <p className="text-muted-foreground">Buenos Aires, Argentina</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Horarios</p>
                    <p className="text-muted-foreground">Lun - Vie: 9:00 - 19:00</p>
                    <p className="text-muted-foreground">Sáb: 9:00 - 14:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a 
              href="https://wa.me/5411123456789" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#20BA5C] transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Escribinos por WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
            <h3 className="text-xl font-semibold mb-6 text-foreground">Envianos un mensaje</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Nombre completo
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+54 11 1234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-input border-border"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="¿En qué podemos ayudarte?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
