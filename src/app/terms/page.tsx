import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service – AIStackHub',
  description: 'AIStackHub terms of service. Read our terms before using the website.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: May 2024</p>

      <div className="prose-content space-y-6">
        <section>
          <h2>Acceptance</h2>
          <p>
            By using AIStackHub you agree to these terms. If you do not agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2>Content Accuracy</h2>
          <p>
            We strive to keep tool listings, pricing, and features accurate. However, AI tools change
            frequently. Always verify current pricing and features on the tool&apos;s official website before
            making purchasing decisions. We are not liable for any outdated information.
          </p>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <p>
            The AIStackHub website content — including text, design, and code — is owned by AIStackHub.
            Tool names and logos belong to their respective companies. Tool data in our directory is
            factual in nature and compiled from public sources.
          </p>
        </section>

        <section>
          <h2>Affiliate Disclosure</h2>
          <p>
            AIStackHub participates in affiliate programs. We may earn commissions on qualifying
            purchases made through links on this site. This does not affect our editorial independence
            or recommendations.
          </p>
        </section>

        <section>
          <h2>Sponsored Content</h2>
          <p>
            Sponsored tool listings are clearly marked as &ldquo;Sponsored&rdquo;. Sponsorship does not
            affect our editorial ratings or placement in category rankings.
          </p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            AIStackHub is provided &ldquo;as is&rdquo; without warranties. We are not liable for any
            damages arising from your use of this site or any tools discovered through it.
          </p>
        </section>

        <section>
          <h2>External Links</h2>
          <p>
            We link to third-party websites and tools. We have no control over their content and accept
            no responsibility for them.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about these terms?{' '}
            <a href="mailto:legal@aistackhub.com" className="text-brand-600 hover:underline">
              legal@aistackhub.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
