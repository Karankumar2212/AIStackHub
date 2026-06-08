import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Calendar, ArrowRight, Check } from 'lucide-react'
import type { Metadata } from 'next'
import { getAllListicles, getListicleBySlug, getToolsBySlugs } from '@/lib/data'
import { getListicleMetadata, getBreadcrumbJsonLd } from '@/lib/seo'
import { StarRating } from '@/components/ui/StarRating'
import { Button } from '@/components/ui/Button'

// Pages that should NOT be caught by this dynamic route
const RESERVED_ROUTES = new Set([
  'tools', 'categories', 'category', 'blog', 'search',
  'submit', 'about', 'contact', 'privacy', 'terms',
  'sitemap.xml', 'robots.txt', 'favicon.svg',
])

interface Props {
  params: Promise<{ listicle: string }>
}

export async function generateStaticParams() {
  return getAllListicles().map((l) => ({ listicle: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { listicle: slug } = await params
  if (RESERVED_ROUTES.has(slug)) return {}
  const listicle = getListicleBySlug(slug)
  if (!listicle) return {}
  return getListicleMetadata(listicle.seoTitle, listicle.seoDescription, listicle.slug)
}

export default async function ListiclePage({ params }: Props) {
  const { listicle: slug } = await params
  if (RESERVED_ROUTES.has(slug)) notFound()

  const listicle = getListicleBySlug(slug)
  if (!listicle) notFound()

  const tools = getToolsBySlugs(listicle.toolSlugs)

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: 'https://aistackhub.com' },
    { name: listicle.title, url: `https://aistackhub.com/${listicle.slug}` },
  ])

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: listicle.title,
    description: listicle.description,
    datePublished: listicle.publishedAt,
    dateModified: listicle.updatedAt,
    author: { '@type': 'Organization', name: 'AIStackHub' },
    publisher: { '@type': 'Organization', name: 'AIStackHub', url: 'https://aistackhub.com' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium truncate">{listicle.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 text-balance leading-tight">
            {listicle.title}
          </h1>
          <p className="text-gray-500 text-lg mb-4 leading-relaxed">
            {listicle.description}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Updated {new Date(listicle.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <span>{tools.length} tools reviewed</span>
          </div>
        </header>

        {/* Quick navigation */}
        <div className="bg-gray-50 rounded-2xl p-5 mb-8 border border-gray-200">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">In this guide:</h2>
          <ol className="space-y-1">
            {tools.map((tool, i) => (
              <li key={tool.id}>
                <a
                  href={`#tool-${tool.slug}`}
                  className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 hover:underline"
                >
                  <span className="w-5 h-5 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  {tool.name}
                  <span className="text-gray-400">— {tool.tagline}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Tools list */}
        <div className="space-y-8">
          {tools.map((tool, i) => (
            <article
              key={tool.id}
              id={`tool-${tool.slug}`}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-brand-200 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center text-xl font-bold text-brand-700 flex-shrink-0">
                  {tool.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-gray-400">#{i + 1}</span>
                    <h3 className="text-xl font-bold text-gray-900">{tool.name}</h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">{tool.tagline}</p>
                  <StarRating rating={tool.rating} reviewCount={tool.reviewCount} size="sm" />
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">{tool.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Features</h4>
                  <ul className="space-y-1">
                    {tool.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-sm text-gray-600">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Pricing</h4>
                  <p className="text-sm text-gray-600">
                    {tool.pricing.free ? '✅ Free tier available' : '💳 Paid only'}
                  </p>
                  {tool.pricing.startingPrice && (
                    <p className="text-sm text-gray-600">Starting at {tool.pricing.startingPrice}</p>
                  )}
                  {tool.pricing.hasTrial && (
                    <p className="text-sm text-emerald-600">Free trial available</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button href={`/tools/${tool.slug}`} variant="secondary" size="sm">
                  Full Review
                </Button>
                <Button href={tool.affiliateUrl || tool.website} external size="sm">
                  Visit {tool.name}
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 bg-brand-50 rounded-2xl p-6 border border-brand-200 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Looking for more AI tools?
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Browse our complete directory of {listicle.category ? `${listicle.category} AI ` : 'AI '}tools.
          </p>
          <Button href={listicle.category ? `/category/${listicle.category}` : '/tools'}>
            Browse All Tools
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  )
}
