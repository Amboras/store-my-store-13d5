'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { hasAnalyticsConsent } from '@/lib/cookie-consent'
import { initAnalytics, trackPageView, destroyAnalytics } from '@/lib/analytics'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  console.log('[AnalyticsProvider] render, pathname:', pathname)

  useEffect(() => {
    const consent = hasAnalyticsConsent()
    console.log('[AnalyticsProvider] mount, hasConsent:', consent)
    if (consent) {
      console.log('[AnalyticsProvider] Calling initAnalytics()')
      initAnalytics()
    }
    return () => {
      console.log('[AnalyticsProvider] unmount, destroying analytics')
      destroyAnalytics()
    }
  }, [])

  useEffect(() => {
    const consent = hasAnalyticsConsent()
    console.log('[AnalyticsProvider] pathname changed to:', pathname, 'consent:', consent)
    if (consent) {
      trackPageView(pathname, document.title)
    }
  }, [pathname])

  return <>{children}</>
}
