import type { Metadata } from 'next'
import { Mail, Twitter, Github, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact AIStackHub',
  description: 'Get in touch with the AIStackHub team for tool submissions, sponsorships, partnerships, or general questions.',
}

const contactItems = [
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'General Inquiries',
    value: 'hello@aistackhub.com',
    href: 'mailto:hello@aistackhub.com',
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: 'Tool Submissions',
    value: 'submit@aistackhub.com',
    href: 'mailto:submit@aistackhub.com',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Sponsorships & Partnerships',
    value: 'partners@aistackhub.com',
    href: 'mailto:partners@aistackhub.com',
  },
  {
    icon: <Twitter className="w-5 h-5" />,
    label: 'Twitter / X',
    value: '@aistackhub',
    href: 'https://twitter.com/aistackhub',
  },
  {
    icon: <Github className="w-5 h-5" />,
    label: 'GitHub',
    value: 'github.com/aistackhub',
    href: 'https://github.com/aistackhub',
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Get in Touch</h1>
        <p className="text-gray-500 text-lg">
          Have a question, submission, or partnership idea? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="space-y-3 mb-10">
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith('http') ? '_blank' : undefined}
            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-4 bg-white rounded-2xl border border-gray-200 p-5 hover:border-brand-300 hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-100 transition-colors">
              {item.icon}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">{item.label}</p>
              <p className="text-gray-900 font-semibold text-sm">{item.value}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Sponsorship info */}
      <div className="bg-gradient-to-br from-brand-50 to-accent-50 rounded-2xl border border-brand-200 p-6">
        <h2 className="font-bold text-gray-900 mb-2">Sponsorship Opportunities</h2>
        <p className="text-gray-600 text-sm mb-3">
          Reach 10,000+ AI enthusiasts, developers, and marketers with a sponsored listing.
          Our directory is growing 20% month-over-month.
        </p>
        <ul className="space-y-1.5 text-sm text-gray-600 mb-4">
          <li>✅ Featured tool placement on homepage</li>
          <li>✅ Sponsored badge on tool page</li>
          <li>✅ Category page priority listing</li>
          <li>✅ Monthly performance report</li>
        </ul>
        <a
          href="mailto:partners@aistackhub.com"
          className="inline-flex items-center gap-2 bg-brand-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-700 transition-colors"
        >
          <Mail className="w-4 h-4" />
          Get Sponsorship Details
        </a>
      </div>
    </div>
  )
}
