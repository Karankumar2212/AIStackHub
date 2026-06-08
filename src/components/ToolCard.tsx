import Link from 'next/link'
import { ExternalLink, Flame, Sparkles, Star } from 'lucide-react'
import type { Tool } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { StarRating } from '@/components/ui/StarRating'
import { formatPricingLabel } from '@/lib/data'

interface ToolCardProps {
  tool: Tool
  variant?: 'default' | 'compact' | 'featured'
}

const pricingVariant = (model: string): 'green' | 'blue' | 'gray' => {
  if (model === 'free' || model === 'freemium') return 'green'
  if (model === 'open-source') return 'blue'
  return 'gray'
}

export function ToolCard({ tool, variant = 'default' }: ToolCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={`/tools/${tool.slug}`}
        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 text-lg font-bold text-gray-600 overflow-hidden">
          {tool.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-gray-900 text-sm truncate">{tool.name}</span>
            {tool.trending && <Flame className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />}
          </div>
          <p className="text-xs text-gray-500 truncate">{tool.tagline}</p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold text-gray-700">{tool.rating}</span>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/tools/${tool.slug}`}
        className="group flex flex-col bg-white rounded-2xl border border-gray-200 hover:border-brand-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
      >
        <div className="p-5 flex-1">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center text-xl font-bold text-brand-700 flex-shrink-0">
              {tool.name.charAt(0)}
            </div>
            <div className="flex items-center gap-1.5">
              {tool.sponsored && (
                <Badge variant="orange" size="sm">Sponsored</Badge>
              )}
              {tool.trending && (
                <Badge variant="orange" size="sm">
                  <Flame className="w-3 h-3 mr-0.5" />
                  Hot
                </Badge>
              )}
              {tool.isNew && (
                <Badge variant="green" size="sm">
                  <Sparkles className="w-3 h-3 mr-0.5" />
                  New
                </Badge>
              )}
            </div>
          </div>

          <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-brand-600 transition-colors">
            {tool.name}
          </h3>
          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{tool.tagline}</p>

          <StarRating rating={tool.rating} reviewCount={tool.reviewCount} />
        </div>

        <div className="px-5 pb-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <Badge variant={pricingVariant(tool.pricing.model)} size="sm">
            {formatPricingLabel(tool)}
          </Badge>
          <span className="text-xs text-gray-400 capitalize">{tool.category}</span>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-200 hover:border-brand-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="p-5 flex-1">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-lg font-bold text-gray-600 flex-shrink-0">
            {tool.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors">
                {tool.name}
              </h3>
              {tool.sponsored && <Badge variant="orange" size="sm">Sponsored</Badge>}
              {tool.trending && (
                <Badge variant="orange" size="sm">
                  <Flame className="w-3 h-3 mr-0.5" />
                  Trending
                </Badge>
              )}
              {tool.isNew && (
                <Badge variant="green" size="sm">
                  <Sparkles className="w-3 h-3 mr-0.5" />
                  New
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">{tool.tagline}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{tool.description.slice(0, 120)}…</p>

        <div className="flex items-center gap-2 flex-wrap">
          {tool.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="gray" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="px-5 pb-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="flex items-center gap-3">
          <StarRating rating={tool.rating} showCount={false} />
          <Badge variant={pricingVariant(tool.pricing.model)} size="sm">
            {formatPricingLabel(tool)}
          </Badge>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-brand-500 transition-colors" />
      </div>
    </Link>
  )
}
