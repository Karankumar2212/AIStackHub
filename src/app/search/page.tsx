import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllTools, getAllCategories } from '@/lib/data'
import { SearchPage } from '@/components/SearchPage'

export const metadata: Metadata = {
  title: 'Search AI Tools – AIStackHub',
  description: 'Search our directory of 500+ AI tools. Find the perfect AI tool for writing, coding, design, marketing, and more.',
  robots: { index: false, follow: true },
}

export default function Search() {
  const tools = getAllTools()
  const categories = getAllCategories()
  return (
    <Suspense fallback={
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-gray-400">
        Loading search…
      </div>
    }>
      <SearchPage tools={tools} categories={categories} />
    </Suspense>
  )
}
