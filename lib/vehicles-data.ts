export type VehicleType = 'auto' | 'moto' | 'camioneta'
export type VehicleCondition = '0km' | 'usado'

export interface Vehicle {
  id: string
  name: string
  brand: string
  model: string
  year: number
  price: number
  type: VehicleType
  condition: VehicleCondition
  kilometers: number
  fuel: string
  transmission: string
  image: string
  featured?: boolean
}

export const vehicles: Vehicle[] = [
  {
    id: '1',
    name: 'Toyota Corolla Cross',
    brand: 'Toyota',
    model: 'Corolla Cross SEG',
    year: 2024,
    price: 42500000,
    type: 'auto',
    condition: '0km',
    kilometers: 0,
    fuel: 'Nafta',
    transmission: 'Automática',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
    featured: true
  },
  {
    id: '2',
    name: 'Honda CB500F',
    brand: 'Honda',
    model: 'CB500F',
    year: 2024,
    price: 8900000,
    type: 'moto',
    condition: '0km',
    kilometers: 0,
    fuel: 'Nafta',
    transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80',
    featured: true
  },
  {
    id: '3',
    name: 'Ford Ranger',
    brand: 'Ford',
    model: 'Ranger XLT 4x4',
    year: 2023,
    price: 55000000,
    type: 'camioneta',
    condition: 'usado',
    kilometers: 25000,
    fuel: 'Diesel',
    transmission: 'Automática',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    featured: true
  },
  {
    id: '4',
    name: 'Volkswagen Gol Trend',
    brand: 'Volkswagen',
    model: 'Gol Trend',
    year: 2022,
    price: 12500000,
    type: 'auto',
    condition: 'usado',
    kilometers: 45000,
    fuel: 'Nafta',
    transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800&q=80'
  },
  {
    id: '5',
    name: 'Yamaha MT-07',
    brand: 'Yamaha',
    model: 'MT-07',
    year: 2023,
    price: 11500000,
    type: 'moto',
    condition: 'usado',
    kilometers: 8000,
    fuel: 'Nafta',
    transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80'
  },
  {
    id: '6',
    name: 'Chevrolet S10',
    brand: 'Chevrolet',
    model: 'S10 High Country',
    year: 2024,
    price: 62000000,
    type: 'camioneta',
    condition: '0km',
    kilometers: 0,
    fuel: 'Diesel',
    transmission: 'Automática',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&q=80'
  },
  {
    id: '7',
    name: 'Fiat Cronos',
    brand: 'Fiat',
    model: 'Cronos Drive',
    year: 2024,
    price: 22000000,
    type: 'auto',
    condition: '0km',
    kilometers: 0,
    fuel: 'Nafta',
    transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'
  },
  {
    id: '8',
    name: 'Kawasaki Ninja 400',
    brand: 'Kawasaki',
    model: 'Ninja 400',
    year: 2024,
    price: 12800000,
    type: 'moto',
    condition: '0km',
    kilometers: 0,
    fuel: 'Nafta',
    transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80'
  },
  {
    id: '9',
    name: 'Toyota Hilux',
    brand: 'Toyota',
    model: 'Hilux SRX',
    year: 2022,
    price: 48000000,
    type: 'camioneta',
    condition: 'usado',
    kilometers: 38000,
    fuel: 'Diesel',
    transmission: 'Automática',
    image: 'https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=800&q=80'
  },
  {
    id: '10',
    name: 'Peugeot 208',
    brand: 'Peugeot',
    model: '208 Allure',
    year: 2023,
    price: 19500000,
    type: 'auto',
    condition: 'usado',
    kilometers: 18000,
    fuel: 'Nafta',
    transmission: 'Automática',
    image: 'https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800&q=80'
  },
  {
    id: '11',
    name: 'BMW G310R',
    brand: 'BMW',
    model: 'G310R',
    year: 2023,
    price: 9800000,
    type: 'moto',
    condition: 'usado',
    kilometers: 5000,
    fuel: 'Nafta',
    transmission: 'Manual',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80'
  },
  {
    id: '12',
    name: 'Renault Duster',
    brand: 'Renault',
    model: 'Duster Iconic',
    year: 2024,
    price: 35000000,
    type: 'camioneta',
    condition: '0km',
    kilometers: 0,
    fuel: 'Nafta',
    transmission: 'CVT',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80'
  }
]

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

export function formatKilometers(km: number): string {
  return km === 0 ? '0 km' : `${new Intl.NumberFormat('es-AR').format(km)} km`
}
