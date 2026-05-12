export interface Vehicle {
  id: string
  name: string
  brand: string
  model: string
  year: number
  price: number
  type: 'auto' | 'moto' | 'camioneta'
  condition: '0km' | 'usado'
  fuel?: string | null
  transmission?: string | null
  mileage: number
  description?: string | null
  image_url?: string | null
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface VehicleFormData {
  name: string
  brand: string
  model: string
  year: number
  price: number
  type: 'auto' | 'moto' | 'camioneta'
  condition: '0km' | 'usado'
  fuel?: string
  transmission?: string
  mileage: number
  description?: string
  image_url?: string
  is_featured: boolean
  is_active: boolean
}
