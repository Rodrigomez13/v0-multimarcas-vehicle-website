import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Vehicle } from '@/lib/vehicles-data'

// GET: Obtener todos los vehículos
export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(vehicles)
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return NextResponse.json(
      { error: 'Error al obtener vehículos' },
      { status: 500 }
    )
  }
}

// POST: Agregar nuevo vehículo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validación básica
    if (!body.name || !body.brand || !body.model) {
      return NextResponse.json(
        { error: 'Nombre, marca y modelo son requeridos' },
        { status: 400 }
      )
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        name: body.name,
        brand: body.brand,
        model: body.model,
        year: parseInt(body.year) || new Date().getFullYear(),
        price: parseFloat(body.price) || 0,
        type: body.type || 'auto',
        condition: body.condition || '0km',
        kilometers: parseInt(body.kilometers) || 0,
        fuel: body.fuel || 'Nafta',
        transmission: body.transmission || 'Manual',
        image: body.image || '',
        featured: body.featured || false
      }
    })

    return NextResponse.json(vehicle, { status: 201 })
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return NextResponse.json(
      { error: 'Error al crear vehículo' },
      { status: 500 }
    )
  }
}

// PUT: Actualizar vehículo
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      )
    }

    const vehicle = await prisma.vehicle.update({
      where: { id },
      data: {
        name: body.name,
        brand: body.brand,
        model: body.model,
        year: parseInt(body.year),
        price: parseFloat(body.price),
        type: body.type,
        condition: body.condition,
        kilometers: parseInt(body.kilometers),
        fuel: body.fuel,
        transmission: body.transmission,
        image: body.image,
        featured: body.featured
      }
    })

    return NextResponse.json(vehicle)
  } catch (error) {
    console.error('Error updating vehicle:', error)
    return NextResponse.json(
      { error: 'Error al actualizar vehículo' },
      { status: 500 }
    )
  }
}

// DELETE: Eliminar vehículo
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json(
        { error: 'ID es requerido' },
        { status: 400 }
      )
    }

    await prisma.vehicle.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    return NextResponse.json(
      { error: 'Error al eliminar vehículo' },
      { status: 500 }
    )
  }
}
