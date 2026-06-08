'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import Fuse from 'fuse.js'
import type { Tool, Category } from '@/types'
import { ToolCard } from '@/components/ToolCard'

interface Props {
  tools: Tool[]
  categories: Category[]
}

const PRICING_FILTERS = ['All', 'Free', 'Freemium', 'Paid']
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Rating', value: 'rating' },
  { label: 'Newest', value: 'newest' },
  { label: 'A–Z', value: 'az' },
]

export function ToolsDirectory({ tools, categories }: Props) {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPricing, setSelectedPricing] = useState('All')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  const fuse = useMemo(
    () =>
      new Fuse(tools, {
        keys: ['name', 'tagline', 'tags', 'description'],
        threshold: 0.35,
        includeScore: true,
      }),
    [tools]
  )

  const filtered = useMemo(() => {
    let results: Tool[] = tools

    // Text search
    if (query.trim()) {
      results = fuse.search(query.trim()).map((r) => r.item)
    }

    // Category filter
    if (selectedCategory !== 'all') {
      results = results.filter((t) => t.category === selectedCategory)
    }

    // Pricing filter
    if (selectedPricing !== 'All') {
      results = results.filter((t) => {
        if (selectedPricing === 'Free') return t.pricing.model === 'free'
        if (selectedPricing === 'Freemium') return t.pricing.model === 'freemium'
        if (selectedPricing === 'Paid') return t.pricing.model === 'paid'
        return true
      })
    }

    // Sort
    return [...results].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'newest') return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      if (sortBy === 'az') return a.name.localeCompare(b.name)
      // featured: sponsored first, then featured, then rest
      if (b.sponsored !== a.sponsored) return b.sponsored ? 1 : -1
      if (b.featured !== a.featured) return b.featured ? 1 : -1
      return b.rating - a.rating
    })
  }, [query, selectedCategory, selectedPricing, sortBy, tools, fuse])

  const clearFilters = () => {
    setQuery('')
    setSelectedCategory('all')
    setSelectedPricing('All')
    setSortBy('featured')
  }

  const hasActiveFilters = query || selectedCategory !== 'all' || selectedPricing !== 'All'

  return (
    <div>
      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm bg-white border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2.5 border rounded-xl transition-colors ${
              showFilters ? 'bg-brand-50 border-brand-300 text-brand-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-brand-500 rounded-full" />
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 px-2"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5 space-y-4">
          {/* Category */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Category</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-brand-300'
                }`}
              >
                All ({tools.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-brand-300'
                  }`}
                >
                  {cat.name} ({cat.toolCount})
                </button>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Pricing</h3>
            <div className="flex flex-wrap gap-2">
              {PRICING_FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedPricing(filter)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                    selectedPricing === filter
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-brand-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category quick filters (inline) */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
            selectedCategory === 'all'
              ? 'bg-brand-600 text-white border-brand-600'
              : 'bg-white text-gray-600 border-gray-300 hover:border-brand-300'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.slug)}
            className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              selectedCategory === cat.slug
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-brand-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <>
          <p className="text-sm text-gray-500 mb-4">
            Showing {filtered.length} tool{filtered.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg mb-2">No tools found</p>
          <p className="text-gray-400 text-sm mb-4">Try adjusting your search or filters</p>
          <button
            onClick={clearFilters}
            className="text-brand-600 hover:underline text-sm font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
