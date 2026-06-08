import type { Metadata } from 'next'
import type { Tool, Category } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aistackhub.com'
const SITE_NAME = 'AIStackHub'
const DEFAULT_DESCRIPTION =
  'Discover the best AI tools for writing, coding, design, marketing, video and productivity. Compare features, pricing, and find your perfect AI stack.'

export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} – Find The Best AI Tools`,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@aistackhub',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  }
}

export function getToolMetadata(tool: Tool): Metadata {
  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url: `${SITE_URL}/tools/${tool.slug}`,
      images: [
        {
          url: tool.screenshot || `/og-default.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} – AI Tool Screenshot`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seoTitle,
      description: tool.seoDescription,
    },
    alternates: {
      canonical: `${SITE_URL}/tools/${tool.slug}`,
    },
  }
}

export function getCategoryMetadata(category: Category): Metadata {
  return {
    title: category.seoTitle,
    description: category.seoDescription,
    openGraph: {
      title: category.seoTitle,
      description: category.seoDescription,
      url: `${SITE_URL}/category/${category.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: category.seoTitle,
      description: category.seoDescription,
    },
    alternates: {
      canonical: `${SITE_URL}/category/${category.slug}`,
    },
  }
}

export function getListicleMetadata(title: string, description: string, slug: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/${slug}`,
    },
  }
}

// ─── Structured Data / JSON-LD ───────────────────────────────────────────────

export function getToolJsonLd(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'WebApplication',
    url: tool.website,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      reviewCount: tool.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      '@type': 'Offer',
      price: tool.pricing.free ? '0' : tool.pricing.startingPrice?.replace(/[^0-9.]/g, '') || '0',
      priceCurrency: 'USD',
    },
  }
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function getBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
