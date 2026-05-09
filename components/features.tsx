import { Shield, Award, ThumbsUp, Truck } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Garantía Total",
    description: "Todos nuestros vehículos cuentan con garantía. Tu tranquilidad es nuestra prioridad."
  },
  {
    icon: Award,
    title: "Calidad Certificada",
    description: "Cada vehículo pasa por una rigurosa inspección de 150 puntos antes de la venta."
  },
  {
    icon: ThumbsUp,
    title: "Financiación Flexible",
    description: "Opciones de financiación adaptadas a tu presupuesto. Hasta 60 cuotas."
  },
  {
    icon: Truck,
    title: "Entrega Inmediata",
    description: "Retirá tu vehículo el mismo día. Gestión rápida y sin complicaciones."
  }
]

export function Features() {
  return (
    <section id="nosotros" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Por qué elegir <span className="text-primary">MultiMarcas</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Más de 15 años en el mercado nos respaldan. Ofrecemos la mejor 
            experiencia en compra de vehículos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
