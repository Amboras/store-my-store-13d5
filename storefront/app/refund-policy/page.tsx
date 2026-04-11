'use client'

import { usePolicies } from '@/hooks/use-policies'
import { Loader2 } from 'lucide-react'
import { PolicyMarkdown } from '@/components/policy-markdown'

export default function RefundPolicyPage() {
  const { policies, isLoading } = usePolicies()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const policy = policies?.refund_policy
  const contactEmail = policies?.contact_email || 'support@yourstore.com'
  const updatedAt = policies?.updated_at
    ? new Date(policies.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'March 2026'

  return (
    <>
      <div className="border-b">
        <div className="container-custom py-section-sm text-center">
          <h1 className="text-h1 font-heading font-semibold">Refund Policy</h1>
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
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Refund Eligibility</h2>
              <p>We accept returns and offer full refunds within 30 days of delivery for items that meet our return criteria.</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Items must be in original condition with tags attached</li>
                <li>Items must be unworn, unwashed, and undamaged</li>
                <li>Original packaging should be included when possible</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Non-Refundable Items</h2>
              <p>Certain items are not eligible for refunds:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Sale or clearance items (final sale)</li>
                <li>Gift cards</li>
                <li>Downloadable products</li>
                <li>Personal care items</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Refund Processing</h2>
              <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed within 5-7 business days to your original payment method.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Late or Missing Refunds</h2>
              <p>If you haven&apos;t received your refund after 7 business days, first check your bank account, then contact your credit card company. If the problem persists, please contact us at <span className="text-foreground">{contactEmail}</span>.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Exchanges</h2>
              <p>If you need to exchange an item for a different size or color, please initiate a return and place a new order for the item you want.</p>
            </section>
          </div>
        )}
      </div>
    </>
  )
}
