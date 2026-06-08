import type { Metadata } from 'next'
import { getAllTools, getAllCategories } from '@/lib/data'
import { ToolsDirectory } from '@/components/ToolsDirectory'

export const metadata: Metadata = {
  title: 'All AI Tools – Browse 500+ AI Tools Directory',
  description: 'Browse our complete directory of 500+ AI tools. Filter by category, pricing, and rating to find the perfect AI tools for your workflow.',
}

export default function ToolsPage() {
  const tools = getAllTools()
  const categories = getAllCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
          AI Tools Directory
        </h1>
        <p className="text-gray-500 text-lg">
          {tools.length} tools across {categories.length} categories
        </p>
      </div>
      <ToolsDirectory tools={tools} categories={categories} />
    </div>
  )
}
