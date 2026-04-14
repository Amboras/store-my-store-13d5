'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface PayPalPaymentFormProps {
  amount: number
  currency: string
  onPaymentSuccess: () => void
  onError: (message: string) => void
  isCompletingOrder?: boolean
}

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        style?: {
          layout?: string
          color?: string
          shape?: string
          label?: string
          height?: number
        }
        createOrder: (data: unknown, actions: {
          order: {
            create: (params: {
              purchase_units: Array<{
                amount: { value: string; currency_code: string }
              }>
            }) => Promise<string>
          }
        }) => Promise<string>
        onApprove: (data: { orderID: string }, actions: {
          order: { capture: () => Promise<{ id: string; status: string }> }
        }) => Promise<void>
        onError: (err: unknown) => void
        onCancel: () => void
      }) => { render: (selector: string) => Promise<void>; isEligible: () => boolean }
    }
  }
}

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb'

export function PayPalPaymentForm({
  amount,
  currency,
  onPaymentSuccess,
  onError,
  isCompletingOrder,
}: PayPalPaymentFormProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [sdkReady, setSdkReady] = useState(false)
  const renderedRef = useRef(false)

  // Load PayPal SDK script dynamically
  useEffect(() => {
    const scriptId = 'paypal-sdk-script'

    if (document.getElementById(scriptId)) {
      setSdkReady(true)
      setLoading(false)
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${currency.toUpperCase()}`
    script.async = true
    script.onload = () => {
      setSdkReady(true)
      setLoading(false)
    }
    script.onerror = () => {
      setLoading(false)
      onError('Failed to load PayPal. Please refresh and try again.')
    }
    document.body.appendChild(script)
  }, [currency, onError])

  // Render PayPal buttons once SDK is ready
  useEffect(() => {
    if (!sdkReady || !window.paypal || !containerRef.current || renderedRef.current) return
    renderedRef.current = true

    const amountInDollars = (amount / 100).toFixed(2)

    const buttons = window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'pay',
        height: 48,
      },
      createOrder: async (_data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amountInDollars,
                currency_code: currency.toUpperCase(),
              },
            },
          ],
        })
      },
      onApprove: async (_data, actions) => {
        try {
          const details = await actions.order.capture()
          if (details.status === 'COMPLETED') {
            onPaymentSuccess()
          } else {
            onError('Payment was not completed. Please try again.')
          }
        } catch {
          onError('Payment capture failed. Please contact support.')
        }
      },
      onError: () => {
        onError('PayPal encountered an error. Please try again.')
      },
      onCancel: () => {
        // User cancelled — do nothing, just let them try again
      },
    })

    if (buttons.isEligible()) {
      buttons.render('#paypal-button-container')
    }
  }, [sdkReady, amount, currency, onPaymentSuccess, onError])

  if (loading) {
    return (
      <div className="border rounded-sm p-8 flex flex-col items-center justify-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading PayPal...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* PayPal info banner */}
      <div className="border rounded-sm p-4 bg-[#FFF8E7] border-[#F5A623]/30 flex items-start gap-3">
        <svg className="w-6 h-6 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 21L3 12L7.5 3H16.5C18.985 3 21 5.015 21 7.5C21 9.985 18.985 12 16.5 12H10L7.5 21Z" fill="#009CDE"/>
          <path d="M10.5 18L6.5 9.5H15C17.485 9.5 19.5 7.485 19.5 5C19.5 4.656 19.456 4.322 19.375 4C20.941 4.685 22 6.226 22 8C22 10.485 19.985 12.5 17.5 12.5H11L10.5 18Z" fill="#003087"/>
        </svg>
        <div>
          <p className="text-sm font-semibold text-[#003087]">Pay with PayPal</p>
          <p className="text-xs text-[#003087]/70 mt-0.5">
            You&apos;ll be redirected to PayPal to complete your payment securely.
          </p>
        </div>
      </div>

      {/* PayPal Buttons container */}
      {isCompletingOrder ? (
        <div className="border rounded-sm p-6 flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Completing your order...</span>
        </div>
      ) : (
        <div
          id="paypal-button-container"
          ref={containerRef}
          className="min-h-[50px]"
        />
      )}

      <p className="text-xs text-center text-muted-foreground">
        🔒 Your payment is secured by PayPal
      </p>
    </div>
  )
}
