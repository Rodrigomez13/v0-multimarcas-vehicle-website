import { createClient } from '@/lib/supabase/server'
import type { Vehicle, VehicleFormData } from './types'

export async function getVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching vehicles:', error)
    return []
  }
  
  return data || []
}

export async function getAllVehicles(): Promise<Vehicle[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching all vehicles:', error)
    return []
  }
  
  return data || []
}

export async function getVehicleById(id: string): Promise<Vehicle | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching vehicle:', error)
    return null
  }
  
  return data
}

export async function createVehicle(vehicle: VehicleFormData): Promise<Vehicle | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('vehicles')
    .insert([vehicle])
    .select()
    .single()
  
  if (error) {
    console.error('Error creating vehicle:', error)
    return null
  }
  
  return data
}

export async function updateVehicle(id: string, vehicle: Partial<VehicleFormData>): Promise<Vehicle | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('vehicles')
    .update({ ...vehicle, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating vehicle:', error)
    return null
  }
  
  return data
}

export async function deleteVehicle(id: string): Promise<boolean> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting vehicle:', error)
    return false
  }
  
  return true
}
