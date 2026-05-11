"use client"

import Image from "next/image"
import { Calendar, Fuel, Gauge, Settings } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Vehicle } from "@/lib/types"

interface VehicleCardProps {
  vehicle: Vehicle
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function formatKilometers(km: number): string {
  return new Intl.NumberFormat('es-AR').format(km) + ' km'
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const typeLabels = {
    auto: 'Auto',
    moto: 'Moto',
    camioneta: 'Camioneta'
  }

  const phoneNumber = "543704123456"
  const message = encodeURIComponent(
    `Hola! Me interesa el ${vehicle.name} ${vehicle.year} que vi en su página web. ¿Podrían darme más información?`
  )
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  // Use a placeholder if no image is set
  const imageUrl = vehicle.image_url || '/placeholder-vehicle.jpg'

  return (
    <Card className="group bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <Image
          src={imageUrl}
          alt={vehicle.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge 
            variant={vehicle.condition === '0km' ? 'default' : 'secondary'}
            className={vehicle.condition === '0km' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground'
            }
          >
            {vehicle.condition === '0km' ? '0km' : 'Usado'}
          </Badge>
          <Badge variant="outline" className="bg-background/80 border-border text-foreground">
            {typeLabels[vehicle.type]}
          </Badge>
        </div>

        {/* Featured badge */}
        {vehicle.is_featured && (
          <Badge className="absolute top-3 right-3 bg-chart-1 text-primary-foreground">
            Destacado
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        {/* Title and Brand */}
        <div className="mb-3">
          <p className="text-sm text-muted-foreground">{vehicle.brand}</p>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {vehicle.name}
          </h3>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Gauge className="h-4 w-4" />
            <span>{formatKilometers(vehicle.mileage || 0)}</span>
          </div>
          {vehicle.fuel && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Fuel className="h-4 w-4" />
              <span>{vehicle.fuel}</span>
            </div>
          )}
          {vehicle.transmission && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Settings className="h-4 w-4" />
              <span className="truncate">{vehicle.transmission}</span>
            </div>
          )}
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Precio</p>
            <p className="text-xl font-bold text-primary">
              {formatPrice(Number(vehicle.price))}
            </p>
          </div>
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            asChild
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Consultar
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
