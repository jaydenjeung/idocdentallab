import { createServerSupabaseClient } from '@/lib/supabase-server'
import DigitalImpressionClient from '@/components/DigitalImpressionClient'

export default async function DigitalImpressionPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase
      .from('clinic_profiles')
      .select('full_name, practice_name')
      .eq('id', user.id)
      .single()
    profile = data
  }

  return <DigitalImpressionClient userId={user?.id || null} profile={profile} />
}