'use client'

import { usePolicies } from '@/hooks/use-policies'
import { Loader2 } from 'lucide-react'
import { PolicyMarkdown } from '@/components/policy-markdown'

export default function CookiePolicyPage() {
  const { policies, isLoading } = usePolicies()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const policy = policies?.cookie_policy
  const contactEmail = policies?.contact_email || 'privacy@yourstore.com'
  const updatedAt = policies?.updated_at
    ? new Date(policies.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : 'March 2026'

  return (
    <>
      <div className="border-b">
        <div className="container-custom py-section-sm text-center">
          <h1 className="text-h1 font-heading font-semibold">Cookie Policy</h1>
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
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">What Are Cookies</h2>
              <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and to provide information to site owners.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">How We Use Cookies</h2>
              <p>We use cookies for several purposes:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li><strong>Essential cookies:</strong> Required for the website to function properly (e.g., shopping cart, checkout)</li>
                <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Marketing cookies:</strong> Track visitor behavior to show relevant ads</li>
                <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Third-Party Cookies</h2>
              <p>We may use third-party services like Google Analytics and payment processors that also set cookies. These cookies help us analyze site traffic and process payments securely.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Managing Cookies</h2>
              <p>You can control and manage cookies in your browser settings. Note that disabling certain cookies may affect the functionality of our website, particularly the shopping cart and checkout process.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Your Consent</h2>
              <p>By using our website, you consent to our use of cookies in accordance with this Cookie Policy. You can withdraw your consent at any time by adjusting your browser settings or using the &ldquo;Manage Cookies&rdquo; button in the footer.</p>
            </section>

            <section>
              <h2 className="text-h4 font-heading font-semibold text-foreground mb-3">Contact</h2>
              <p>If you have questions about our use of cookies, please contact us at <span className="text-foreground">{contactEmail}</span>.</p>
            </section>
          </div>
        )}
      </div>
    </>
  )
}
