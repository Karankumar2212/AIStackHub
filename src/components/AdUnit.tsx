'use client'

/**
 * AdUnit – Drop-in AdSense component.
 *
 * SETUP:
 * 1. Get approved for Google AdSense at https://adsense.google.com
 * 2. Replace XXXXXXXXXX with your publisher ID in layout.tsx script tag
 * 3. Replace the data-ad-slot values below with your real ad unit slot IDs
 * 4. Set NEXT_PUBLIC_ADSENSE_ENABLED=true in your .env.local
 *
 * For Sponsored listings, use the `sponsored` prop variant.
 */

interface AdUnitProps {
  slot: string
  format?: 'horizontal' | 'rectangle' | 'sidebar'
  className?: string
}

const formatClasses = {
  horizontal: 'w-full h-24 sm:h-28',
  rectangle: 'w-full h-64',
  sidebar: 'w-full h-96',
}

const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true'

export function AdUnit({ slot, format = 'horizontal', className = '' }: AdUnitProps) {
  if (!ADSENSE_ENABLED) {
    // Show placeholder in development
    return (
      <div
        className={`bg-gray-100 border border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 text-xs ${formatClasses[format]} ${className}`}
        aria-label="Advertisement placeholder"
      >
        <span>Ad Unit · {format} · slot: {slot}</span>
      </div>
    )
  }

  return (
    <div className={`${formatClasses[format]} ${className}`}>
      {/* Replace with real AdSense ins tag once approved */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}

/**
 * SponsoredBanner – For sponsored tool listings.
 * Tools with `sponsored: true` in tools.json appear with a "Sponsored" badge.
 * Charge a monthly fee for sponsored placement.
 */
export function SponsoredBanner({ toolName, url, description }: {
  toolName: string
  url: string
  description: string
}) {
  return (
    <div className="relative bg-gradient-to-r from-brand-50 to-accent-50 border border-brand-200 rounded-2xl p-5">
      <span className="absolute top-3 right-3 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-full px-2 py-0.5">
        Sponsored
      </span>
      <p className="text-xs text-gray-500 mb-1">Sponsored Tool</p>
      <h3 className="font-bold text-gray-900 mb-1">{toolName}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        Learn more →
      </a>
    </div>
  )
}
