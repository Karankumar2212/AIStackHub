import { Star } from 'lucide-react'
import { clsx } from 'clsx'

interface StarRatingProps {
  rating: number
  reviewCount?: number
  size?: 'sm' | 'md'
  showCount?: boolean
}

export function StarRating({ rating, reviewCount, size = 'sm', showCount = true }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0)

  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className={clsx(iconSize, 'fill-amber-400 text-amber-400')} />
        ))}
        {hasHalf && (
          <span className="relative">
            <Star className={clsx(iconSize, 'text-gray-200 fill-gray-200')} />
            <span className="absolute inset-0 overflow-hidden w-1/2">
              <Star className={clsx(iconSize, 'fill-amber-400 text-amber-400')} />
            </span>
          </span>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className={clsx(iconSize, 'text-gray-200 fill-gray-200')} />
        ))}
      </div>
      <span className={clsx('font-semibold text-gray-700', textSize)}>{rating.toFixed(1)}</span>
      {showCount && reviewCount !== undefined && (
        <span className={clsx('text-gray-400', textSize)}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  )
}
