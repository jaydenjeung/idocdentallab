import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const npi = searchParams.get('npi')
  const firstName = searchParams.get('firstName')
  const lastName = searchParams.get('lastName')

  if (!npi || !firstName || !lastName) {
    return NextResponse.json({ valid: false, error: 'Missing parameters' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://npiregistry.cms.hhs.gov/api/?number=${npi}&enumeration_type=NPI-1&version=2.1`
    )
    const data = await res.json()

    if (!data.results || data.results.length === 0) {
      return NextResponse.json({ valid: false, error: 'NPI not found' })
    }

    const result = data.results[0]
    const basic = result.basic

    // 이름 매칭 (대소문자 무시)
    const firstMatch = basic.first_name?.toLowerCase() === firstName.toLowerCase()
    const lastMatch = basic.last_name?.toLowerCase() === lastName.toLowerCase()

    // 치과의사 taxonomy 확인
    const taxonomies = result.taxonomies || []
    const isDentist = taxonomies.some((t: { code: string }) =>
      t.code.startsWith('122') || t.code.startsWith('124') || t.code.startsWith('126')
    )

    if (!firstMatch || !lastMatch) {
      return NextResponse.json({ valid: false, error: 'Name does not match NPI records' })
    }

    if (!isDentist) {
      return NextResponse.json({ valid: false, error: 'NPI is not registered as a dental provider' })
    }

    return NextResponse.json({
      valid: true,
      name: `${basic.first_name} ${basic.last_name}`,
      credential: basic.credential,
    })
  } catch {
    return NextResponse.json({ valid: false, error: 'Verification failed' }, { status: 500 })
  }
}