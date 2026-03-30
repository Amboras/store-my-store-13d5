const CONSENT_COOKIE = 'amboras_consent'
const CONSENT_MAX_AGE = 31536000 // 1 year in seconds

interface ConsentState {
  analytics: boolean
  ts: string
}

export function getConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null

  const cookies = document.cookie
  console.log('[cookie-consent] raw cookies:', cookies)
  const match = cookies
    .split('; ')
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`))

  if (!match) {
    console.log('[cookie-consent] No amboras_consent cookie found')
    return null
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(match.split('=').slice(1).join('=')))
    console.log('[cookie-consent] Parsed consent:', parsed)
    return parsed
  } catch {
    console.log('[cookie-consent] Failed to parse consent cookie')
    return null
  }
}

export function hasAnalyticsConsent(): boolean {
  const consent = getConsent()
  return consent !== null && consent.analytics === true
}

export function setConsent(analytics: boolean): void {
  const value = JSON.stringify({
    analytics,
    ts: new Date().toISOString(),
  })

  const secure = window.location.protocol === 'https:' ? '; Secure' : ''

  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; path=/; SameSite=Lax; max-age=${CONSENT_MAX_AGE}${secure}`
}

export function clearConsent(): void {
  document.cookie = `${CONSENT_COOKIE}=; path=/; max-age=0`
}
