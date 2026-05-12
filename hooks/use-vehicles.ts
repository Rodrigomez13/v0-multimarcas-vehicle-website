import { useState, useEffect } from 'react'
import { Vehicle } from '@/lib/vehicles-data'

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/vehicles')
      if (!response.ok) throw new Error('Error al cargar vehículos')
      const data = await response.json()
      setVehicles(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const addVehicle = async (vehicle: Omit<Vehicle, 'id'>) => {
    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
      })
      if (!response.ok) throw new Error('Error al agregar vehículo')
      const newVehicle = await response.json()
      setVehicles([newVehicle, ...vehicles])
      return newVehicle
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      throw err
    }
  }

  const updateVehicle = async (id: string, vehicle: Omit<Vehicle, 'id'>) => {
    try {
      const response = await fetch('/api/vehicles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...vehicle })
      })
      if (!response.ok) throw new Error('Error al actualizar vehículo')
      const updatedVehicle = await response.json()
      setVehicles(vehicles.map(v => v.id === id ? updatedVehicle : v))
      return updatedVehicle
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      throw err
    }
  }

  const deleteVehicle = async (id: string) => {
    try {
      const response = await fetch('/api/vehicles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      if (!response.ok) throw new Error('Error al eliminar')
      setVehicles(vehicles.filter(v => v.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      throw err
    }
  }

  return { vehicles, loading, error, addVehicle, updateVehicle, deleteVehicle, refetch: fetchVehicles }
}
