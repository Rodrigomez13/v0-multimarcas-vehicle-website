'use client'

import { useState } from 'react'
import { Vehicle } from '@/lib/vehicles-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useVehicles } from '@/hooks/use-vehicles'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Edit2, Trash2, Plus } from 'lucide-react'

export default function AdminPanel() {
  const { vehicles, addVehicle, updateVehicle, deleteVehicle } = useVehicles()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    type: 'auto' as Vehicle['type'],
    condition: '0km' as Vehicle['condition'],
    kilometers: 0,
    fuel: 'Nafta',
    transmission: 'Manual',
    image: '',
    featured: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'price' || name === 'kilometers' ? Number(value) : value
    }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      type: 'auto',
      condition: '0km',
      kilometers: 0,
      fuel: 'Nafta',
      transmission: 'Manual',
      image: '',
      featured: false
    })
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const vehicleData = {
        ...formData,
        year: Number(formData.year),
        price: Number(formData.price),
        kilometers: Number(formData.kilometers)
      }

      if (editingId) {
        await updateVehicle(editingId, vehicleData)
      } else {
        await addVehicle(vehicleData)
      }

      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error guardando vehículo:', error)
    }
  }

  const handleEdit = (vehicle: Vehicle) => {
    setFormData({
      name: vehicle.name,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      price: vehicle.price,
      type: vehicle.type,
      condition: vehicle.condition,
      kilometers: vehicle.kilometers,
      fuel: vehicle.fuel,
      transmission: vehicle.transmission,
      image: vehicle.image,
      featured: vehicle.featured || false
    })
    setEditingId(vehicle.id)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteVehicle(id)
    } catch (error) {
      console.error('Error eliminando vehículo:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Panel Administrativo</h1>
            <p className="text-gray-600 mt-1">Gestiona tu catálogo de vehículos</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={resetForm}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Nuevo Vehículo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Editar Vehículo' : 'Agregar Nuevo Vehículo'}
                </DialogTitle>
                <DialogDescription>
                  {editingId 
                    ? 'Modifica los datos del vehículo y guarda los cambios' 
                    : 'Completa el formulario para agregar un nuevo vehículo al catálogo'}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-4">
                <div>
                  <Label htmlFor="name">Nombre *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Toyota Corolla"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="brand">Marca *</Label>
                  <Input
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="Ej: Toyota"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="model">Modelo *</Label>
                  <Input
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Ej: Corolla Cross"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="year">Año</Label>
                  <Input
                    id="year"
                    name="year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                    min="2000"
                  />
                </div>

                <div>
                  <Label htmlFor="price">Precio ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Ej: 42500000"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Tipo</Label>
                  <Select value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto</SelectItem>
                      <SelectItem value="moto">Moto</SelectItem>
                      <SelectItem value="camioneta">Camioneta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition">Condición</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleSelectChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0km">0km</SelectItem>
                      <SelectItem value="usado">Usado</SelectItem>
                      <SelectItem value="Buen estado">Buen estado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="kilometers">Kilómetros</Label>
                  <Input
                    id="kilometers"
                    name="kilometers"
                    type="number"
                    value={formData.kilometers}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="fuel">Combustible</Label>
                  <Input
                    id="fuel"
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleChange}
                    placeholder="Ej: Nafta"
                  />
                </div>

                <div>
                  <Label htmlFor="transmission">Transmisión</Label>
                  <Input
                    id="transmission"
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    placeholder="Ej: Manual"
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="image">URL de Imagen</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>

                <div className="col-span-2 flex items-center gap-2">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <Label htmlFor="featured" className="mb-0">Destacado</Label>
                </div>

                <div className="col-span-2 flex gap-2">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {editingId ? 'Guardar Cambios' : 'Agregar Vehículo'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false)
                      resetForm()
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Lista de vehículos */}
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nombre</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Marca</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tipo</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Condición</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Precio</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {vehicles.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No hay vehículos registrados. Crea el primero haciendo clic en "Nuevo Vehículo"
                    </td>
                  </tr>
                ) : (
                  vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{vehicle.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{vehicle.brand}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                          {vehicle.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          vehicle.condition === '0km' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {vehicle.condition}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">
                        ${vehicle.price.toLocaleString('es-AR')}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <Button
                            onClick={() => handleEdit(vehicle)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                          >
                            <Edit2 className="h-4 w-4" />
                            Editar
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="flex items-center gap-1"
                              >
                                <Trash2 className="h-4 w-4" />
                                Eliminar
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar vehículo?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará "{vehicle.name}" del catálogo.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <div className="flex gap-2 justify-end">
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(vehicle.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total de vehículos */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">
            Total de vehículos: <span className="font-bold text-lg text-gray-900">{vehicles.length}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
