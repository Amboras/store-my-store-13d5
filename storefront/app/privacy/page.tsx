'use client'

import { usePolicies } from '@/hooks/use-policies'
import { Loader2 } from 'lucide-react'
import { PolicyMarkdown } from '@/components/policy-markdown'

export default function PrivacyPage() {
  const { policies, isLoading } = usePolicies()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const policy = policies?.privacy_policy
  const storeName = policies?.store_name || 'Store'
  const contactEmail = policies?.contact_email || 'privacy@yourstore.com'
  const updatedAt = policies?.updated_at
    ? new Date(policies.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'March 2026'

  return (
    <>
      <div className="border-b">
        <div className="container-custom py-section-sm text-center">
          <h1 className="text-h1 font-heading font-semibold">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {updatedAt}</p>
        </div>
      </div>

      <div className="container-custom py-section max-w-3xl">
        {policy ? (
          <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed">
            <PolicyMarkdown content={policy} />
          </div>
        ) : (
          <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Information We Collect</h2>
              <p>When you visit our store, we collect certain information about your device, your interaction with the store, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about orders, products, and promotions</li>
                <li>Screen orders for potential risk or fraud</li>
                <li>Improve and optimize our store</li>
                <li>Provide you with information or advertising relating to our products</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Sharing Your Information</h2>
              <p>We share your personal information with service providers to help us provide our services and fulfill our contracts with you. For example, we use payment processors to accept payments, shipping carriers to deliver orders, and analytics providers to understand site usage.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Your Rights</h2>
              <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Data Retention</h2>
              <p>When you place an order through the store, we will maintain your order information for our records unless and until you ask us to delete this information.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Contact</h2>
              <p>For more information about our privacy practices or if you have questions, please contact us by email at <span className="text-foreground">{contactEmail}</span>.</p>
            </section>
          </div>
        )}
      </div>
    </>
  )
}
