/**
 * generate-sitemap.mjs
 *
 * Run: node scripts/generate-sitemap.mjs
 * Generates public/sitemap.xml from data files.
 * Called automatically as part of the build (see package.json prebuild).
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aistackhub.com'

const tools = JSON.parse(readFileSync(join(root, 'data/tools.json'), 'utf-8'))
const categories = JSON.parse(readFileSync(join(root, 'data/categories.json'), 'utf-8'))
const listicles = JSON.parse(readFileSync(join(root, 'data/listicles.json'), 'utf-8'))

const today = new Date().toISOString().split('T')[0]

const staticPages = [
  { url: '',             priority: '1.0', changefreq: 'daily'   },
  { url: '/tools',       priority: '0.95', changefreq: 'daily'  },
  { url: '/categories',  priority: '0.85', changefreq: 'weekly' },
  { url: '/blog',        priority: '0.75', changefreq: 'daily'  },
  { url: '/about',       priority: '0.5',  changefreq: 'monthly'},
  { url: '/submit',      priority: '0.4',  changefreq: 'monthly'},
  { url: '/contact',     priority: '0.4',  changefreq: 'monthly'},
]

function url(path, priority, changefreq, lastmod = today) {
  return `
  <url>
    <loc>${SITE_URL}${path}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => url(p.url, p.priority, p.changefreq)).join('')}
${categories.map(c => url(`/category/${c.slug}`, '0.9', 'daily')).join('')}
${tools.map(t => url(`/tools/${t.slug}`, '0.8', 'weekly', t.updatedAt)).join('')}
${listicles.map(l => url(`/${l.slug}`, '0.85', 'weekly', l.updatedAt)).join('')}
</urlset>`

writeFileSync(join(root, 'public/sitemap.xml'), xml.trim())
console.log(`✅ sitemap.xml generated with ${staticPages.length + categories.length + tools.length + listicles.length} URLs`)
