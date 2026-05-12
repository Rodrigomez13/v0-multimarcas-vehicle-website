'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Vehicle } from '@/lib/types'
import Image from 'next/image'
import { 
  Plus, 
  LogOut, 
  Car, 
  Bike, 
  Truck, 
  Edit2, 
  Trash2,
  Eye,
  EyeOff,
  Search,
  LayoutDashboard
} from 'lucide-react'
import { VehicleFormModal } from './vehicle-form-modal'

interface AdminDashboardProps {
  initialVehicles: Vehicle[]
  userEmail: string
}

export function AdminDashboard({ initialVehicles, userEmail }: AdminDashboardProps) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<string>('todos')
  const [showModal, setShowModal] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este vehículo?')) return
    
    setLoading(true)
    const { error } = await supabase.from('vehicles').delete().eq('id', id)
    
    if (!error) {
      setVehicles(vehicles.filter(v => v.id !== id))
    }
    setLoading(false)
  }

  const handleToggleActive = async (vehicle: Vehicle) => {
    setLoading(true)
    const { error } = await supabase
      .from('vehicles')
      .update({ is_active: !vehicle.is_active })
      .eq('id', vehicle.id)
    
    if (!error) {
      setVehicles(vehicles.map(v => 
        v.id === vehicle.id ? { ...v, is_active: !v.is_active } : v
      ))
    }
    setLoading(false)
  }

  const handleSave = (savedVehicle: Vehicle) => {
    if (editingVehicle) {
      setVehicles(vehicles.map(v => v.id === savedVehicle.id ? savedVehicle : v))
    } else {
      setVehicles([savedVehicle, ...vehicles])
    }
    setShowModal(false)
    setEditingVehicle(null)
  }

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
                         v.brand.toLowerCase().includes(search.toLowerCase()) ||
                         v.model.toLowerCase().includes(search.toLowerCase())
    const matchesType = filterType === 'todos' || v.type === filterType
    return matchesSearch && matchesType
  })

  const stats = {
    total: vehicles.length,
    autos: vehicles.filter(v => v.type === 'auto').length,
    motos: vehicles.filter(v => v.type === 'moto').length,
    camionetas: vehicles.filter(v => v.type === 'camioneta').length,
    activos: vehicles.filter(v => v.is_active).length,
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'auto': return <Car className="h-4 w-4" />
      case 'moto': return <Bike className="h-4 w-4" />
      case 'camioneta': return <Truck className="h-4 w-4" />
      default: return <Car className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-gf.jpeg"
              alt="GF MultiMarcas"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-primary" />
                Panel de Administración
              </h1>
              <p className="text-sm text-muted-foreground">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="/" 
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver sitio
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-muted-foreground text-sm">Total</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              <Car className="h-4 w-4" /> Autos
            </p>
            <p className="text-2xl font-bold text-foreground">{stats.autos}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              <Bike className="h-4 w-4" /> Motos
            </p>
            <p className="text-2xl font-bold text-foreground">{stats.motos}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              <Truck className="h-4 w-4" /> Camionetas
            </p>
            <p className="text-2xl font-bold text-foreground">{stats.camionetas}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <p className="text-muted-foreground text-sm">Activos</p>
            <p className="text-2xl font-bold text-primary">{stats.activos}</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar por marca, modelo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2.5 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="todos">Todos los tipos</option>
              <option value="auto">Autos</option>
              <option value="moto">Motos</option>
              <option value="camioneta">Camionetas</option>
            </select>
            <button
              onClick={() => {
                setEditingVehicle(null)
                setShowModal(true)
              }}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Agregar Vehículo</span>
            </button>
          </div>
        </div>

        {/* Vehicles Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Vehículo</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Tipo</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Año</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3">Precio</th>
                  <th className="text-left text-sm font-medium text-muted-foreground px-4 py-3 hidden sm:table-cell">Estado</th>
                  <th className="text-right text-sm font-medium text-muted-foreground px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      {vehicles.length === 0 
                        ? 'No hay vehículos registrados. ¡Agrega el primero!'
                        : 'No se encontraron vehículos con esos criterios.'
                      }
                    </td>
                  </tr>
                ) : (
                  filteredVehicles.map((vehicle) => (
                    <tr key={vehicle.id} className={`hover:bg-muted/30 transition-colors ${!vehicle.is_active ? 'opacity-60' : ''}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            {vehicle.image_url ? (
                              <img 
                                src={vehicle.image_url} 
                                alt={vehicle.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                                {getTypeIcon(vehicle.type)}
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{vehicle.name}</p>
                            <p className="text-sm text-muted-foreground">{vehicle.brand} {vehicle.model}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-foreground capitalize">
                          {getTypeIcon(vehicle.type)}
                          {vehicle.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell text-foreground">{vehicle.year}</td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-primary">
                          ${vehicle.price.toLocaleString('es-AR')}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          vehicle.condition === '0km' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {vehicle.condition}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleToggleActive(vehicle)}
                            disabled={loading}
                            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                            title={vehicle.is_active ? 'Ocultar del catálogo' : 'Mostrar en catálogo'}
                          >
                            {vehicle.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => {
                              setEditingVehicle(vehicle)
                              setShowModal(true)
                            }}
                            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(vehicle.id)}
                            disabled={loading}
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <VehicleFormModal
          vehicle={editingVehicle}
          onClose={() => {
            setShowModal(false)
            setEditingVehicle(null)
          }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
