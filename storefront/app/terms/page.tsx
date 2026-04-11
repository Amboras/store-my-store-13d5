'use client'

import { usePolicies } from '@/hooks/use-policies'
import { Loader2 } from 'lucide-react'
import { PolicyMarkdown } from '@/components/policy-markdown'

export default function TermsPage() {
  const { policies, isLoading } = usePolicies()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const policy = policies?.terms_of_service
  const storeName = policies?.store_name || 'Store'
  const contactEmail = policies?.contact_email || 'legal@yourstore.com'
  const updatedAt = policies?.updated_at
    ? new Date(policies.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'March 2026'

  return (
    <>
      <div className="border-b">
        <div className="container-custom py-section-sm text-center">
          <h1 className="text-h1 font-heading font-semibold">Terms of Service</h1>
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
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Overview</h2>
              <p>This website is operated by {storeName}. Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to {storeName}. We offer this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Online Store Terms</h2>
              <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">General Conditions</h2>
              <p>We reserve the right to refuse service to anyone for any reason at any time. Your content (not including credit card information) may be transferred unencrypted and involve transmissions over various networks and changes to conform and adapt to technical requirements.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Accuracy of Information</h2>
              <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Products & Pricing</h2>
              <p>Certain products may be available exclusively online through the website. These products may have limited quantities and are subject to return only according to our Return Policy. We reserve the right to limit the quantities of any products that we offer. All descriptions of products or product pricing are subject to change at any time without notice.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Contact</h2>
              <p>Questions about the Terms of Service should be sent to us at <span className="text-foreground">{contactEmail}</span>.</p>
            </section>
          </div>
        )}
      </div>
    </>
  )
}
