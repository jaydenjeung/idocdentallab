import { createServerSupabaseClient } from '@/lib/supabase-server'
import ShippingLabelForm from '@/components/ShippingLabelForm'

export default async function ShippingLabelPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  let prefill = null
  if (user) {
    const { data: profile } = await supabase
      .from('clinic_profiles')
      .select('full_name, practice_name, phone, address, city, state, zip')
      .eq('id', user.id)
      .single()
    prefill = profile
  }

  return <ShippingLabelForm prefill={prefill} />
}