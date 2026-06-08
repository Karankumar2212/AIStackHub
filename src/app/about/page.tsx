import type { Metadata } from 'next'
import { Zap, Target, Heart, TrendingUp } from 'lucide-react'
import { getSiteStats } from '@/lib/data'

export const metadata: Metadata = {
  title: 'About AIStackHub – The Best AI Tools Directory',
  description: 'Learn about AIStackHub, our mission to help people find the best AI tools, and how we curate our directory.',
}

export default function AboutPage() {
  const stats = getSiteStats()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          Our Story
        </div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
          About AIStackHub
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          AIStackHub is the most comprehensive directory for discovering and comparing AI tools.
          We help individuals and teams build their perfect AI stack — without the research overwhelm.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { label: 'AI Tools', value: `${stats.totalTools}+` },
          { label: 'Categories', value: stats.totalCategories },
          { label: 'Free Tools', value: stats.freeTools },
          { label: 'Avg Rating', value: stats.avgRating },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
            <div className="text-2xl font-extrabold text-brand-600 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="prose-content mb-10">
        <h2>Our Mission</h2>
        <p>
          The AI tools landscape is evolving faster than anyone can keep up with. New tools launch every day,
          and it&apos;s increasingly difficult to know which ones are worth your time and money.
        </p>
        <p>
          We built AIStackHub to solve that problem. Our team researches, tests, and curates AI tools
          so you don&apos;t have to. Every tool in our directory has been reviewed for quality,
          value, and actual usefulness.
        </p>

        <h2>How We Review Tools</h2>
        <p>Every tool listed on AIStackHub goes through our review process:</p>
        <ul>
          <li><strong>Hands-on testing</strong> — We actually use the tools, not just read the marketing copy</li>
          <li><strong>Pricing verification</strong> — We confirm pricing accuracy and flag hidden costs</li>
          <li><strong>Feature audit</strong> — We verify claimed features actually work as described</li>
          <li><strong>Community feedback</strong> — We incorporate real user reviews and ratings</li>
          <li><strong>Regular updates</strong> — We review listings every 3 months to keep data fresh</li>
        </ul>

        <h2>Monetization & Transparency</h2>
        <p>
          AIStackHub is free to use and always will be. We may earn affiliate commissions when you
          click through to tools and make a purchase — this is clearly disclosed on individual
          tool pages. Sponsored placements are clearly marked.
        </p>
        <p>
          Our editorial decisions are never influenced by commercial relationships. A tool&apos;s placement
          in our directory is based on quality and community feedback, not payment.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: <Target className="w-5 h-5" />, title: 'Accuracy', desc: 'We keep data accurate and up to date so you can make informed decisions.' },
          { icon: <Heart className="w-5 h-5" />, title: 'Independence', desc: 'Our reviews are honest. We call out limitations, not just features.' },
          { icon: <TrendingUp className="w-5 h-5" />, title: 'Currency', desc: 'The AI landscape moves fast. We update listings within days of major changes.' },
        ].map((val) => (
          <div key={val.title} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="w-9 h-9 bg-brand-100 text-brand-700 rounded-xl flex items-center justify-center mb-3">
              {val.icon}
            </div>
            <h3 className="font-bold text-gray-900 mb-1 text-sm">{val.title}</h3>
            <p className="text-gray-500 text-sm">{val.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
