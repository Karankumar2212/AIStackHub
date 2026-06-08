import Link from 'next/link'
import { ArrowRight, PenLine, Code2, Palette, TrendingUp, Video, Zap, MessageSquare, Music } from 'lucide-react'
import type { Metadata } from 'next'
import { getAllCategories } from '@/lib/data'

export const metadata: Metadata = {
  title: 'AI Tool Categories – Browse by Use Case',
  description: 'Browse AI tools by category. Find the best AI tools for writing, coding, design, marketing, video production, productivity, chatbots, and audio.',
}

const categoryIcons: Record<string, React.ReactNode> = {
  writing: <PenLine className="w-7 h-7" />,
  coding: <Code2 className="w-7 h-7" />,
  design: <Palette className="w-7 h-7" />,
  marketing: <TrendingUp className="w-7 h-7" />,
  video: <Video className="w-7 h-7" />,
  productivity: <Zap className="w-7 h-7" />,
  chatbots: <MessageSquare className="w-7 h-7" />,
  audio: <Music className="w-7 h-7" />,
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
          AI Tool Categories
        </h1>
        <p className="text-gray-500 text-lg">
          Browse {categories.length} categories and find AI tools for every need
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="group flex flex-col bg-white rounded-2xl border border-gray-200 hover:border-brand-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
          >
            <div className={`p-6 bg-gradient-to-br ${cat.color}`}>
              <div className="text-white mb-3">
                {categoryIcons[cat.slug]}
              </div>
              <h2 className="text-xl font-bold text-white mb-1">
                {cat.name}
              </h2>
              <p className="text-white/75 text-sm">{cat.toolCount} tools</p>
            </div>
            <div className="p-5 flex-1">
              <p className="text-gray-600 text-sm leading-relaxed">
                {cat.description}
              </p>
            </div>
            <div className="px-5 pb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-brand-600 group-hover:text-brand-700">
                Browse {cat.name} Tools
              </span>
              <ArrowRight className="w-4 h-4 text-brand-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
