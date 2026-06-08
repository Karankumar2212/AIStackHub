export interface PricingPlan {
  name: string
  price: string
  features: string[]
}

export interface Pricing {
  model: 'free' | 'freemium' | 'paid' | 'open-source'
  free: boolean
  freeDescription: string
  startingPrice: string
  hasTrial: boolean
  plans: PricingPlan[]
}

export interface Tool {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  category: string
  tags: string[]
  website: string
  affiliateUrl: string
  logo: string
  screenshot: string
  pricing: Pricing
  rating: number
  reviewCount: number
  featured: boolean
  trending: boolean
  isNew: boolean
  sponsored: boolean
  features: string[]
  pros: string[]
  cons: string[]
  useCases: string[]
  alternatives: string[]
  publishedAt: string
  updatedAt: string
  seoTitle: string
  seoDescription: string
}

export interface Category {
  slug: string
  name: string
  description: string
  icon: string
  color: string
  bgColor: string
  textColor: string
  seoTitle: string
  seoDescription: string
  toolCount: number
}

export interface Listicle {
  slug: string
  title: string
  description: string
  seoTitle: string
  seoDescription: string
  category: string | null
  toolSlugs: string[]
  publishedAt: string
  updatedAt: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  updatedAt: string
  seoTitle: string
  seoDescription: string
  coverImage: string
}

export interface SearchResult {
  type: 'tool' | 'category' | 'post'
  slug: string
  title: string
  description: string
  category?: string
  rating?: number
  logo?: string
  pricing?: string
}
