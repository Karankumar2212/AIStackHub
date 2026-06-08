import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Tools Blog – Guides, News & Reviews',
  description: 'In-depth guides, tool comparisons, and news about the latest AI tools and trends. Stay up to date with the AI tools landscape.',
}

// Static blog posts data (add Markdown support if needed)
const posts = [
  {
    slug: 'chatgpt-vs-claude-vs-gemini',
    title: 'ChatGPT vs Claude vs Gemini: Which AI Chatbot Is Best in 2024?',
    excerpt: 'We put the three biggest AI chatbots head-to-head across writing, coding, reasoning, and everyday tasks. Here\'s what we found.',
    category: 'Comparisons',
    publishedAt: '2024-05-15',
    readTime: '8 min read',
  },
  {
    slug: 'best-free-ai-tools-2024',
    title: '20 Actually Free AI Tools That Don\'t Require a Credit Card',
    excerpt: 'Tired of "free trials" that ask for your credit card? We found 20 genuinely free AI tools with no gotchas.',
    category: 'Guides',
    publishedAt: '2024-05-10',
    readTime: '6 min read',
  },
  {
    slug: 'ai-tools-for-solopreneurs',
    title: 'The Ultimate AI Stack for Solopreneurs in 2024',
    excerpt: 'Running a business solo? These AI tools will help you punch well above your weight without breaking the bank.',
    category: 'Guides',
    publishedAt: '2024-05-05',
    readTime: '10 min read',
  },
  {
    slug: 'github-copilot-vs-cursor',
    title: 'GitHub Copilot vs Cursor: Which AI Code Assistant Is Better?',
    excerpt: 'Detailed comparison of the two most popular AI coding tools. We tested both for 30 days on real projects.',
    category: 'Comparisons',
    publishedAt: '2024-04-28',
    readTime: '7 min read',
  },
  {
    slug: 'midjourney-v6-guide',
    title: 'Midjourney V6 Complete Guide: Prompts, Tips & Best Practices',
    excerpt: 'Everything you need to know about Midjourney V6 — from prompt structure to advanced techniques for stunning results.',
    category: 'Guides',
    publishedAt: '2024-04-20',
    readTime: '12 min read',
  },
]

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
          AI Tools Blog
        </h1>
        <p className="text-gray-500 text-lg">
          Guides, comparisons and news about the best AI tools
        </p>
      </div>

      <div className="space-y-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:flex-row gap-4 bg-white rounded-2xl border border-gray-200 p-5 hover:border-brand-300 hover:shadow-md transition-all"
          >
            <div className="sm:w-48 h-32 bg-gradient-to-br from-brand-100 to-brand-200 rounded-xl flex-shrink-0 flex items-center justify-center">
              <span className="text-5xl">📝</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span>{post.readTime}</span>
              </div>
            </div>
            <div className="sm:flex items-center hidden">
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-brand-500 transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
