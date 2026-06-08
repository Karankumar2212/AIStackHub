import Link from 'next/link'
import { Search, Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-7xl mb-6">🔍</div>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Page not found</h1>
      <p className="text-gray-500 mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try searching for what you need.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-700 transition-colors"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
        >
          <Search className="w-4 h-4" />
          Search Tools
        </Link>
      </div>

      <div className="mt-12">
        <p className="text-sm text-gray-400 mb-4">Popular pages:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { label: 'All Tools', href: '/tools' },
            { label: 'Writing Tools', href: '/category/writing' },
            { label: 'Coding Tools', href: '/category/coding' },
            { label: 'Free AI Tools', href: '/free-ai-tools' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-brand-600 hover:text-brand-700 hover:underline flex items-center gap-1"
            >
              {link.label}
              <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
