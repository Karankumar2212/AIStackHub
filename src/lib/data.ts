import toolsData from '../../data/tools.json'
import categoriesData from '../../data/categories.json'
import listiclesData from '../../data/listicles.json'
import type { Tool, Category, Listicle } from '@/types'

// ─── Tools ──────────────────────────────────────────────────────────────────

export function getAllTools(): Tool[] {
  return toolsData as Tool[]
}

export function getToolBySlug(slug: string): Tool | undefined {
  return (toolsData as Tool[]).find((t) => t.slug === slug)
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return (toolsData as Tool[]).filter((t) => t.category === categorySlug)
}

export function getFeaturedTools(): Tool[] {
  return (toolsData as Tool[]).filter((t) => t.featured)
}

export function getTrendingTools(): Tool[] {
  return (toolsData as Tool[]).filter((t) => t.trending)
}

export function getNewTools(): Tool[] {
  return (toolsData as Tool[])
    .filter((t) => t.isNew)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getLatestTools(count = 6): Tool[] {
  return [...(toolsData as Tool[])]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count)
}

export function getRelatedTools(currentSlug: string, alternatives: string[]): Tool[] {
  return alternatives
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean) as Tool[]
}

export function getToolsBySlugs(slugs: string[]): Tool[] {
  return slugs
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean) as Tool[]
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  return (toolsData as Tool[]).filter((t) => {
    return (
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
    )
  })
}

// ─── Categories ─────────────────────────────────────────────────────────────

export function getAllCategories(): Category[] {
  const categories = categoriesData as Category[]
  return categories.map((cat) => ({
    ...cat,
    toolCount: getToolsByCategory(cat.slug).length,
  }))
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const cat = (categoriesData as Category[]).find((c) => c.slug === slug)
  if (!cat) return undefined
  return {
    ...cat,
    toolCount: getToolsByCategory(slug).length,
  }
}

// ─── Listicles ───────────────────────────────────────────────────────────────

export function getAllListicles(): Listicle[] {
  return listiclesData as Listicle[]
}

export function getListicleBySlug(slug: string): Listicle | undefined {
  return (listiclesData as Listicle[]).find((l) => l.slug === slug)
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export function getSiteStats() {
  const tools = getAllTools()
  const categories = getAllCategories()
  return {
    totalTools: tools.length,
    totalCategories: categories.length,
    freeTools: tools.filter((t) => t.pricing.free).length,
    avgRating: (tools.reduce((acc, t) => acc + t.rating, 0) / tools.length).toFixed(1),
  }
}

// ─── Pricing helpers ─────────────────────────────────────────────────────────

export function formatPricingLabel(tool: Tool): string {
  const model = tool.pricing.model
  if (model === 'free') return 'Free'
  if (model === 'freemium') return 'Freemium'
  if (model === 'open-source') return 'Open Source'
  if (tool.pricing.startingPrice) return `From ${tool.pricing.startingPrice}`
  return 'Paid'
}
