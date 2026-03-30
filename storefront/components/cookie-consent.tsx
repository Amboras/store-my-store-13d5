'use client'

import { useState, useEffect, useCallback } from 'react'
import { getConsent, setConsent } from '@/lib/cookie-consent'
import { initAnalytics } from '@/lib/analytics'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  console.log('[CookieConsent] render, visible:', visible)

  const checkConsent = useCallback(() => {
    const consent = getConsent()
    console.log('[CookieConsent] checkConsent:', consent)
    if (consent === null) {
      console.log('[CookieConsent] No consent found, showing banner')
      setVisible(true)
    } else {
      console.log('[CookieConsent] Consent exists:', consent)
    }
  }, [])

  useEffect(() => {
    console.log('[CookieConsent] useEffect mounted')
    checkConsent()

    const handleManageCookies = () => {
      setVisible(true)
    }

    window.addEventListener('manage-cookies', handleManageCookies)
    return () => window.removeEventListener('manage-cookies', handleManageCookies)
  }, [checkConsent])

  const handleAccept = () => {
    console.log('[CookieConsent] Accept clicked')
    setConsent(true)
    setVisible(false)
    initAnalytics()
  }

  const handleDecline = () => {
    console.log('[CookieConsent] Decline clicked')
    setConsent(false)
    setVisible(false)
  }

  if (!visible) {
    console.log('[CookieConsent] Not visible, returning null')
    return null
  }
  console.log('[CookieConsent] Rendering banner')

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 animate-fade-in">
      <div className="bg-background/95 backdrop-blur-md border-t shadow-lg">
        <div className="container-custom py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              We use cookies to understand how visitors interact with our store.
              This helps us improve your shopping experience. No personal data is
              shared with third parties.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleDecline}
                className="px-5 py-2 text-sm font-medium border rounded-md bg-background text-foreground hover:bg-muted transition-colors"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2 text-sm font-medium border rounded-md bg-background text-foreground hover:bg-muted transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
