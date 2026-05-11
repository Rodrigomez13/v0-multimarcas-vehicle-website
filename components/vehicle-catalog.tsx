"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, Filter, Car, Bike, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { VehicleCard } from "./vehicle-card"
import { createClient } from "@/lib/supabase/client"
import type { Vehicle, VehicleType, VehicleCondition } from "@/lib/types"

const vehicleTypes: { value: VehicleType | 'todos'; label: string; icon: React.ReactNode }[] = [
  { value: 'todos', label: 'Todos', icon: <Filter className="h-4 w-4" /> },
  { value: 'auto', label: 'Autos', icon: <Car className="h-4 w-4" /> },
  { value: 'moto', label: 'Motos', icon: <Bike className="h-4 w-4" /> },
  { value: 'camioneta', label: 'Camionetas', icon: <Car className="h-4 w-4" /> },
]

const conditionFilters: { value: VehicleCondition | 'todos'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: '0km', label: '0km' },
  { value: 'usado', label: 'Usados' },
]

export function VehicleCatalog() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<VehicleType | 'todos'>('todos')
  const [conditionFilter, setConditionFilter] = useState<VehicleCondition | 'todos'>('todos')

  useEffect(() => {
    async function fetchVehicles() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching vehicles:', error)
      } else {
        setVehicles(data || [])
      }
      setLoading(false)
    }

    fetchVehicles()
  }, [])

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch = 
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesType = typeFilter === 'todos' || vehicle.type === typeFilter
      const matchesCondition = conditionFilter === 'todos' || vehicle.condition === conditionFilter

      return matchesSearch && matchesType && matchesCondition
    })
  }, [vehicles, searchQuery, typeFilter, conditionFilter])

  return (
    <section id="catalogo" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestro <span className="text-primary">Catálogo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explorá nuestra amplia selección de vehículos. Usá los filtros para encontrar 
            exactamente lo que estás buscando.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por marca, modelo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>

            {/* Type filter */}
            <div className="flex flex-wrap gap-2">
              {vehicleTypes.map((type) => (
                <Button
                  key={type.value}
                  variant={typeFilter === type.value ? "default" : "outline"}
                  onClick={() => setTypeFilter(type.value)}
                  className={typeFilter === type.value 
                    ? "bg-primary text-primary-foreground" 
                    : "border-border hover:bg-secondary"
                  }
                >
                  {type.icon}
                  <span className="ml-2">{type.label}</span>
                </Button>
              ))}
            </div>

            {/* Condition filter */}
            <div className="flex gap-2">
              {conditionFilters.map((condition) => (
                <Button
                  key={condition.value}
                  variant={conditionFilter === condition.value ? "default" : "outline"}
                  onClick={() => setConditionFilter(condition.value)}
                  size="sm"
                  className={conditionFilter === condition.value 
                    ? "bg-primary text-primary-foreground" 
                    : "border-border hover:bg-secondary"
                  }
                >
                  {condition.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-muted-foreground mb-6">
          Mostrando <span className="text-foreground font-medium">{filteredVehicles.length}</span> vehículos
        </p>

        {/* Loading state */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Cargando vehículos...</p>
          </div>
        ) : filteredVehicles.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <Car className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No hay vehículos disponibles</h3>
            <p className="text-muted-foreground">
              {vehicles.length === 0 
                ? "Todavía no se agregaron vehículos al catálogo"
                : "Intentá con otros filtros o términos de búsqueda"
              }
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
