import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { getAllVehicles } from '@/lib/vehicles'

export default async function AdminPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/admin/login')
  }
  
  const vehicles = await getAllVehicles()
  
  return <AdminDashboard initialVehicles={vehicles} userEmail={user.email || ''} />
}
