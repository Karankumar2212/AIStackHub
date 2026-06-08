import type { Metadata } from 'next'
import { CheckCircle2, FileJson, Github, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Submit an AI Tool – AIStackHub',
  description: 'Know an AI tool that should be on AIStackHub? Submit it here. We review all submissions and add quality tools to our directory.',
}

const steps = [
  {
    step: '1',
    title: 'Fork the repository',
    description: 'Fork the AIStackHub GitHub repo to your account.',
    icon: <Github className="w-5 h-5" />,
  },
  {
    step: '2',
    title: 'Add tool to tools.json',
    description: 'Open data/tools.json and add your tool following the existing schema.',
    icon: <FileJson className="w-5 h-5" />,
  },
  {
    step: '3',
    title: 'Submit a Pull Request',
    description: 'Open a PR with your changes. Our team will review within 48 hours.',
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
  {
    step: '4',
    title: 'Get listed automatically',
    description: 'Once merged, the site rebuilds and your tool is live instantly.',
    icon: <Zap className="w-5 h-5" />,
  },
]

const toolSchema = `{
  "id": "your-tool-id",
  "slug": "your-tool-slug",
  "name": "Tool Name",
  "tagline": "One-line description",
  "description": "Full description (2-3 sentences)",
  "category": "writing|coding|design|marketing|video|productivity|chatbots|audio",
  "tags": ["tag1", "tag2", "tag3"],
  "website": "https://yourtool.com",
  "affiliateUrl": "",
  "logo": "/logos/your-tool.svg",
  "pricing": {
    "model": "free|freemium|paid|open-source",
    "free": true,
    "freeDescription": "Description of free tier",
    "startingPrice": "$X/month",
    "hasTrial": false,
    "plans": [
      {
        "name": "Free",
        "price": "$0",
        "features": ["Feature 1", "Feature 2"]
      }
    ]
  },
  "rating": 4.5,
  "reviewCount": 1000,
  "featured": false,
  "trending": false,
  "isNew": true,
  "sponsored": false,
  "features": ["Feature 1", "Feature 2"],
  "pros": ["Pro 1", "Pro 2"],
  "cons": ["Con 1"],
  "useCases": ["Use case 1", "Use case 2"],
  "alternatives": ["other-tool-slug"],
  "publishedAt": "2024-01-01",
  "updatedAt": "2024-01-01",
  "seoTitle": "Tool Name Review 2024",
  "seoDescription": "SEO description for the tool page"
}`

export default function SubmitPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div className="text-center mb-10">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
          Submit an AI Tool
        </h1>
        <p className="text-gray-500 text-lg">
          Help the community discover great AI tools by adding them to our directory.
          Submissions are free and reviewed within 48 hours.
        </p>
      </div>

      {/* Process Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {steps.map((s) => (
          <div key={s.step} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-brand-100 text-brand-700 rounded-lg flex items-center justify-center flex-shrink-0">
                {s.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">
                Step {s.step}: {s.title}
              </h3>
            </div>
            <p className="text-gray-500 text-sm">{s.description}</p>
          </div>
        ))}
      </div>

      {/* Tool Schema */}
      <div className="bg-gray-950 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-300">data/tools.json — Tool Schema</h2>
          <span className="text-xs text-gray-500">JSON</span>
        </div>
        <pre className="text-xs text-green-400 overflow-x-auto leading-relaxed">
          <code>{toolSchema}</code>
        </pre>
      </div>

      {/* Guidelines */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
        <h2 className="font-semibold text-amber-900 mb-3">Submission Guidelines</h2>
        <ul className="space-y-1.5 text-sm text-amber-800">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            The tool must be publicly accessible (no invite-only tools)
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            All information must be accurate and up to date
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            The tool must genuinely use AI/ML technology
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            No promotional or spam submissions
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            Sponsored listings are available — contact us for details
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <a
          href="https://github.com/aistackhub/aistackhub"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors"
        >
          <Github className="w-5 h-5" />
          Open a Pull Request on GitHub
        </a>
        <p className="text-sm text-gray-400 mt-3">
          Or email us at{' '}
          <a href="mailto:submit@aistackhub.com" className="text-brand-600 hover:underline">
            submit@aistackhub.com
          </a>
        </p>
      </div>
    </div>
  )
}
