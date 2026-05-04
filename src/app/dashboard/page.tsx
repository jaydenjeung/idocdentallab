import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import LogoutButton from '@/components/LogoutButton'
import DashboardClient from '@/components/DashboardClient'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('clinic_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  const { data: cases } = await supabase
    .from('clinic_cases')
    .select('*')
    .eq('clinic_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">IDOC Dental Lab</h1>
            <p className="text-xs text-gray-500">Client Portal</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{profile?.practice_name || profile?.full_name}</span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome, Dr. {profile?.full_name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">{profile?.practice_name}</p>
        </div>
        <DashboardClient userId={user.id} doctorName={profile?.full_name || ''} initialCases={cases || []} />
      </main>
    </div>
  )
}