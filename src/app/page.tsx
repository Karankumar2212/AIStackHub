import Link from 'next/link'
import {
  ArrowRight, Zap, Flame, Sparkles, TrendingUp,
  PenLine, Code2, Palette, Video, MessageSquare, Music
} from 'lucide-react'
import { getAllTools, getAllCategories, getFeaturedTools, getTrendingTools, getLatestTools, getSiteStats } from '@/lib/data'
import { ToolCard } from '@/components/ToolCard'
import { SearchBar } from '@/components/SearchBar'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AIStackHub – Discover The Best AI Tools in 2024',
  description: 'Find and compare 500+ AI tools for writing, coding, design, marketing, video, and productivity. Your complete guide to the best AI stack.',
  openGraph: {
    title: 'AIStackHub – Discover The Best AI Tools in 2024',
    description: 'Find and compare 500+ AI tools for writing, coding, design, marketing, video, and productivity.',
    url: 'https://aistackhub.com',
  },
}

const categoryIcons: Record<string, React.ReactNode> = {
  writing: <PenLine className="w-6 h-6" />,
  coding: <Code2 className="w-6 h-6" />,
  design: <Palette className="w-6 h-6" />,
  marketing: <TrendingUp className="w-6 h-6" />,
  video: <Video className="w-6 h-6" />,
  productivity: <Zap className="w-6 h-6" />,
  chatbots: <MessageSquare className="w-6 h-6" />,
  audio: <Music className="w-6 h-6" />,
}

export default function HomePage() {
  const allTools = getAllTools()
  const categories = getAllCategories()
  const featuredTools = getFeaturedTools()
  const trendingTools = getTrendingTools()
  const latestTools = getLatestTools(6)
  const stats = getSiteStats()

  return (
    <>
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative bg-hero-gradient overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-40 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-white/90 text-sm font-medium">{stats.totalTools}+ AI tools indexed and growing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight text-balance">
              Find the Best{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                AI Tools
              </span>{' '}
              for Your Stack
            </h1>

            <p className="text-lg sm:text-xl text-white/75 mb-8 max-w-2xl mx-auto leading-relaxed">
              Compare, discover and choose from {stats.totalTools}+ curated AI tools across {stats.totalCategories} categories. From writing to coding, design to video — build your perfect AI stack.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto mb-8">
              <SearchBar tools={allTools} placeholder="Search ChatGPT, Midjourney, Cursor..." />
            </div>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-300" />
                {stats.totalTools}+ Tools
              </span>
              <span className="flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-amber-300" />
                {stats.totalCategories} Categories
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                {stats.freeTools} Free Tools
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Categories Grid ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Browse by Category</h2>
            <p className="text-gray-500 mt-1">Find AI tools for every use case</p>
          </div>
          <Button href="/categories" variant="secondary" size="sm">
            All Categories
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${cat.bgColor} hover:scale-105 transition-all duration-200 group cursor-pointer`}
            >
              <div className={`${cat.textColor} group-hover:scale-110 transition-transform`}>
                {categoryIcons[cat.slug]}
              </div>
              <span className={`font-semibold text-xs ${cat.textColor}`}>{cat.name}</span>
              <span className="text-gray-500 text-xs">{cat.toolCount} tools</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured Tools ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Tools</h2>
            </div>
            <p className="text-gray-500 text-sm">Editor&apos;s top picks for 2024</p>
          </div>
          <Button href="/tools" variant="secondary" size="sm">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredTools.slice(0, 8).map((tool) => (
            <ToolCard key={tool.id} tool={tool} variant="featured" />
          ))}
        </div>
      </section>

      {/* ─── Trending Tools ───────────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-200 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Flame className="w-5 h-5 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
              </div>
              <p className="text-gray-500 text-sm">What the AI community is using this week</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingTools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Listicle Promos ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Best AI Tools Guides</h2>
          <p className="text-gray-500 text-sm mt-1">In-depth comparisons and curated lists</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: '/best-ai-writing-tools', emoji: '✍️', title: 'Best AI Writing Tools 2024', desc: '15 top picks tested and ranked by our team' },
            { href: '/best-ai-coding-tools', emoji: '💻', title: 'Best AI Coding Tools 2024', desc: 'Code faster with these AI-powered dev tools' },
            { href: '/free-ai-tools', emoji: '🆓', title: 'Best Free AI Tools 2024', desc: 'No credit card. No trials. Just free AI tools.' },
            { href: '/ai-tools-for-students', emoji: '🎓', title: 'AI Tools for Students', desc: 'Study smarter and write better papers with AI' },
            { href: '/ai-tools-for-marketers', emoji: '📣', title: 'AI Tools for Marketers', desc: 'Boost campaigns and ROI with these AI tools' },
            { href: '/best-ai-image-generators', emoji: '🎨', title: 'Best AI Image Generators', desc: 'Midjourney, DALL-E 3 and more compared' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:border-brand-300 hover:shadow-md transition-all group"
            >
              <div className="text-3xl flex-shrink-0">{item.emoji}</div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-brand-500 transition-colors ml-auto flex-shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Latest Tools ─────────────────────────────────────────────────── */}
      <section className="bg-gray-100 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
              <p className="text-gray-500 text-sm mt-1">The newest tools in our directory</p>
            </div>
            <Button href="/tools" variant="secondary" size="sm">
              Browse All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA / Newsletter ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="bg-hero-gradient rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full" />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-3">
              Know an AI tool we&apos;re missing?
            </h2>
            <p className="text-white/75 mb-6 max-w-lg mx-auto">
              Submit your tool or suggest one and help the community discover the best AI stack.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button href="/submit" size="lg" className="bg-white text-brand-700 hover:bg-gray-100">
                Submit a Tool
                <Sparkles className="w-4 h-4" />
              </Button>
              <Button href="/tools" variant="ghost" size="lg" className="text-white hover:bg-white/10">
                Browse Directory
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AdSense Placeholder ──────────────────────────────────────────── */}
      {/* Uncomment and replace with real ad unit when AdSense approved
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-gray-100 rounded-xl h-24 flex items-center justify-center text-gray-400 text-sm">
          Advertisement
        </div>
      </div>
      */}
    </>
  )
}
