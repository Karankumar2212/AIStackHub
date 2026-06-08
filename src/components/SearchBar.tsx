'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import Fuse from 'fuse.js'
import type { Tool } from '@/types'

interface SearchBarProps {
  tools: Tool[]
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

export function SearchBar({ tools, placeholder = 'Search 500+ AI tools...', className = '', autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Tool[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const fuse = useCallback(
    () =>
      new Fuse(tools, {
        keys: [
          { name: 'name', weight: 0.4 },
          { name: 'tagline', weight: 0.3 },
          { name: 'tags', weight: 0.2 },
          { name: 'category', weight: 0.1 },
        ],
        threshold: 0.35,
        includeScore: true,
      }),
    [tools]
  )

  useEffect(() => {
    const q = query.trim()
    if (!q) {
      setResults([])
      setIsOpen(false)
      return
    }
    const f = fuse()
    const matches = f.search(q).slice(0, 8).map((r) => r.item)
    setResults(matches)
    setIsOpen(true)
  }, [query, fuse])

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const clearSearch = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-11 pr-10 py-3 text-base bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder:text-gray-400 transition"
          aria-label="Search AI tools"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="search-listbox"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Dropdown results */}
      {isOpen && (
        <div
          id="search-listbox"
          role="listbox"
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50"
        >
          {results.length > 0 ? (
            <>
              <div className="p-2">
                {results.map((tool) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center text-sm font-bold text-brand-700 flex-shrink-0">
                      {tool.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">{tool.name}</div>
                      <div className="text-xs text-gray-500 truncate">{tool.tagline}</div>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-xs text-gray-400 capitalize">{tool.category}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-100 p-2">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-brand-50 text-brand-600 text-sm font-medium transition-colors"
                >
                  <Search className="w-4 h-4" />
                  See all results for &ldquo;{query}&rdquo;
                </Link>
              </div>
            </>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-500">No tools found for &ldquo;{query}&rdquo;</p>
              <Link
                href="/submit"
                className="text-sm text-brand-600 hover:underline mt-1 inline-block"
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
