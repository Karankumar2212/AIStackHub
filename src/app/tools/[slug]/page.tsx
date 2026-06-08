import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ExternalLink, Check, X,
  ArrowRight, ChevronRight, Star
} from 'lucide-react'
import type { Metadata } from 'next'
import { getAllTools, getToolBySlug, getRelatedTools, formatPricingLabel } from '@/lib/data'
import { getToolMetadata, getToolJsonLd, getBreadcrumbJsonLd } from '@/lib/seo'
import { ToolCard } from '@/components/ToolCard'
import { StarRating } from '@/components/ui/StarRating'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return {}
  return getToolMetadata(tool)
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()

  const relatedTools = getRelatedTools(tool.slug, tool.alternatives)
  const toolJsonLd = getToolJsonLd(tool)
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: 'https://aistackhub.com' },
    { name: 'Tools', url: 'https://aistackhub.com/tools' },
    { name: tool.name, url: `https://aistackhub.com/tools/${tool.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/tools" className="hover:text-gray-700">Tools</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/category/${tool.category}`} className="hover:text-gray-700 capitalize">{tool.category}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium">{tool.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tool header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center text-2xl font-bold text-brand-700 flex-shrink-0">
                  {tool.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900">{tool.name}</h1>
                    {tool.sponsored && <Badge variant="orange">Sponsored</Badge>}
                  </div>
                  <p className="text-gray-500 text-base mb-2">{tool.tagline}</p>
                  <StarRating rating={tool.rating} reviewCount={tool.reviewCount} size="md" />
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-5">{tool.description}</p>

              <div className="flex flex-wrap items-center gap-2 mb-5">
                {tool.tags.map((tag) => (
                  <Badge key={tag} variant="gray">{tag}</Badge>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button href={tool.affiliateUrl || tool.website} external size="lg">
                  Visit {tool.name}
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button href={`/category/${tool.category}`} variant="secondary" size="lg">
                  More {tool.category} tools
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Key Features</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tool.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
                <h3 className="text-base font-bold text-emerald-800 mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Pros
                </h3>
                <ul className="space-y-2">
                  {tool.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-2 text-sm text-emerald-700">
                      <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-2xl border border-red-200 p-5">
                <h3 className="text-base font-bold text-red-800 mb-3 flex items-center gap-2">
                  <X className="w-4 h-4" />
                  Cons
                </h3>
                <ul className="space-y-2">
                  {tool.cons.map((con) => (
                    <li key={con} className="flex items-start gap-2 text-sm text-red-700">
                      <X className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Use Cases */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Use Cases</h2>
              <div className="flex flex-wrap gap-2">
                {tool.useCases.map((useCase) => (
                  <Badge key={useCase} variant="blue" size="md">
                    {useCase}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pricing Details */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing</h2>
              <div className="space-y-3">
                {tool.pricing.plans.map((plan) => (
                  <div
                    key={plan.name}
                    className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-brand-200 transition-colors"
                  >
                    <div className="sm:w-32 flex-shrink-0">
                      <div className="font-semibold text-gray-900 text-sm">{plan.name}</div>
                      <div className="text-brand-600 font-bold text-base">{plan.price}</div>
                    </div>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-1 text-sm text-gray-600">
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {tool.pricing.hasTrial && (
                <p className="text-sm text-emerald-600 mt-3 flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Free trial available — no credit card required
                </p>
              )}
            </div>

            {/* Related / Alternatives */}
            {relatedTools.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Alternatives to {tool.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedTools.slice(0, 4).map((related) => (
                    <ToolCard key={related.id} tool={related} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Quick Info</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between items-start">
                  <dt className="text-gray-500">Category</dt>
                  <dd>
                    <Link href={`/category/${tool.category}`}>
                      <Badge variant="blue" size="sm" className="capitalize">{tool.category}</Badge>
                    </Link>
                  </dd>
                </div>
                <div className="flex justify-between items-start">
                  <dt className="text-gray-500">Pricing</dt>
                  <dd>
                    <Badge variant={tool.pricing.free ? 'green' : 'gray'} size="sm">
                      {formatPricingLabel(tool)}
                    </Badge>
                  </dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-gray-500">Rating</dt>
                  <dd className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-700">{tool.rating}/5</span>
                  </dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-gray-500">Reviews</dt>
                  <dd className="font-medium text-gray-700">{tool.reviewCount.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-gray-500">Free Tier</dt>
                  <dd>
                    {tool.pricing.free ? (
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Available
                      </span>
                    ) : (
                      <span className="text-gray-500 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" />
                        Not available
                      </span>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-gray-500">Free Trial</dt>
                  <dd>
                    {tool.pricing.hasTrial ? (
                      <span className="text-emerald-600 font-medium flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Yes
                      </span>
                    ) : (
                      <span className="text-gray-500 flex items-center gap-1">
                        <X className="w-3.5 h-3.5" />
                        No
                      </span>
                    )}
                  </dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-gray-500">Last Updated</dt>
                  <dd className="text-gray-600">
                    {new Date(tool.updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <Button
                  href={tool.affiliateUrl || tool.website}
                  external
                  size="md"
                  className="w-full"
                >
                  Visit {tool.name}
                  <ExternalLink className="w-4 h-4" />
                </Button>
                {tool.pricing.hasTrial && (
                  <p className="text-xs text-center text-gray-500 mt-2">
                    Free trial available
                  </p>
                )}
              </div>

              {/* Affiliate disclosure */}
              {tool.affiliateUrl && (
                <p className="text-xs text-gray-400 mt-3 text-center">
                  * Affiliate link — we may earn a commission
                </p>
              )}
            </div>

            {/* AdSense sidebar placeholder */}
            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center text-gray-400 text-xs">
              Ad Placement
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
