'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import type { Tool, Category } from '@/types'
import { ToolCard } from '@/components/ToolCard'

interface Props {
  tools: Tool[]
  categories: Category[]
}

export function SearchPage({ tools, categories }: Props) {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Tool[]>([])
  const [hasSearched, setHasSearched] = useState(!!initialQuery)

  const fuse = useMemo(
    () =>
      new Fuse(tools, {
        keys: [
          { name: 'name', weight: 0.4 },
          { name: 'tagline', weight: 0.3 },
          { name: 'description', weight: 0.15 },
          { name: 'tags', weight: 0.15 },
        ],
        threshold: 0.35,
        includeScore: true,
      }),
    [tools]
  )

  useEffect(() => {
    if (initialQuery) {
      const res = fuse.search(initialQuery).map((r) => r.item)
      setResults(res)
    }
  }, [initialQuery, fuse])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    const res = fuse.search(query.trim()).map((r) => r.item)
    setResults(res)
    setHasSearched(true)
    // Update URL without full navigation
    const url = new URL(window.location.href)
    url.searchParams.set('q', query)
    window.history.pushState({}, '', url.toString())
  }

  const popularSearches = ['ChatGPT', 'Midjourney', 'GitHub Copilot', 'Claude', 'Gemini', 'ElevenLabs']

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
        Search AI Tools
      </h1>
      <p className="text-gray-500 text-center mb-8">
        Find the perfect AI tool from our directory of {tools.length}+ tools
      </p>

      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, categories, use cases..."
            autoFocus
            className="w-full pl-12 pr-4 py-4 text-base bg-white border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-3 bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-brand-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Popular searches */}
      {!hasSearched && (
        <div>
          <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term)
                  const res = fuse.search(term).map((r) => r.item)
                  setResults(res)
                  setHasSearched(true)
                }}
                className="text-sm font-medium px-3 py-1.5 bg-gray-100 hover:bg-brand-100 hover:text-brand-700 text-gray-700 rounded-full transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Category browsing */}
          <h2 className="text-base font-semibold text-gray-900 mb-3">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex flex-col items-center p-3 bg-white rounded-xl border border-gray-200 hover:border-brand-300 transition-colors text-center"
              >
                <span className="font-medium text-gray-900 text-sm">{cat.name}</span>
                <span className="text-xs text-gray-500">{cat.toolCount} tools</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {hasSearched && (
        <div>
          <p className="text-sm text-gray-500 mb-4">
            {results.length > 0
              ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
              : `No results found for "${query}"`}
          </p>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-4">
                Can&apos;t find what you&apos;re looking for?
              </p>
              <Link
                href="/submit"
                className="text-brand-600 font-medium hover:underline"
              >
                Submit a new tool →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
