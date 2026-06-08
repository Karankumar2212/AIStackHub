import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy – AIStackHub',
  description: 'AIStackHub privacy policy. Learn how we collect, use, and protect your information.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: May 2024</p>

      <div className="prose-content space-y-6">
        <section>
          <h2>Overview</h2>
          <p>
            AIStackHub (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your privacy.
            This policy explains what data we collect, why we collect it, and how we use it.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <p>
            AIStackHub is a static website. We do not run a server-side database and we do not
            store personal information on our servers. We collect limited data through:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>Analytics (page views, referring URLs, browser/device type) via privacy-friendly analytics</li>
            <li>Contact form submissions (email address and message content only)</li>
            <li>Cookies required by Google AdSense if you consent</li>
          </ul>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            We use cookies for analytics and, if you view ads, for Google AdSense. You can opt out
            of non-essential cookies at any time via your browser settings.
          </p>
        </section>

        <section>
          <h2>Affiliate Links</h2>
          <p>
            Some links on AIStackHub are affiliate links. If you click through and make a purchase,
            we may earn a commission at no extra cost to you. Affiliate links are disclosed on the
            relevant tool pages.
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
            <li>Google AdSense (advertising)</li>
            <li>Google Analytics (optional, privacy-friendly config)</li>
            <li>Vercel / Netlify / Cloudflare (hosting — no personal data stored)</li>
          </ul>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>
            You have the right to access, correct, or delete any personal data we hold about you.
            Contact us at{' '}
            <a href="mailto:privacy@aistackhub.com" className="text-brand-600 hover:underline">
              privacy@aistackhub.com
            </a>{' '}
            for any privacy-related requests.
          </p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>
            We may update this policy occasionally. Changes are posted on this page with an updated date.
          </p>
        </section>
      </div>
    </div>
  )
}
