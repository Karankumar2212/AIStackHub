import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { getAllCategories, getCategoryBySlug, getToolsByCategory } from '@/lib/data'
import { getCategoryMetadata, getBreadcrumbJsonLd } from '@/lib/seo'
import { ToolCard } from '@/components/ToolCard'
import { Button } from '@/components/ui/Button'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllCategories().map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}
  return getCategoryMetadata(category)
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const tools = getToolsByCategory(slug)
  const featuredTools = tools.filter((t) => t.featured)
  const otherTools = tools.filter((t) => !t.featured)

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: 'https://aistackhub.com' },
    { name: 'Categories', url: 'https://aistackhub.com/categories' },
    { name: category.name, url: `https://aistackhub.com/category/${category.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <section className={`bg-gradient-to-br ${category.color} py-12 lg:py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-white/70 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/categories" className="hover:text-white">Categories</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{category.name}</span>
          </nav>

          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
            Best AI {category.name} Tools
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mb-4">
            {category.description}
          </p>
          <p className="text-white/60 text-sm">
            {tools.length} tool{tools.length !== 1 ? 's' : ''} in this category
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Featured tools in this category */}
        {featuredTools.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Top {category.name} AI Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {featuredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} variant="featured" />
              ))}
            </div>
          </div>
        )}

        {/* All tools */}
        {otherTools.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              All {category.name} Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )}

        {tools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No tools in this category yet.</p>
            <Button href="/submit">Submit a Tool</Button>
          </div>
        )}

        {/* Related guides */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Related Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: `/best-ai-${category.slug}-tools`, label: `Best AI ${category.name} Tools 2024` },
              { href: '/free-ai-tools', label: 'Best Free AI Tools 2024' },
              { href: '/ai-tools-for-students', label: 'AI Tools for Students' },
              { href: '/ai-tools-for-marketers', label: 'AI Tools for Marketers' },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 hover:border-brand-300 transition-colors text-sm font-medium text-gray-700 hover:text-brand-600 group"
              >
                {guide.label}
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
