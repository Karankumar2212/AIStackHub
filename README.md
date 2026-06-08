# AIStackHub

The best AI tools directory. Discover, compare and find your perfect AI stack.

**Live site:** https://aistackhub.com  
**Stack:** Next.js 15 · TypeScript · Tailwind CSS · Static Export · Zero recurring costs

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # generates /out (static site)
```

---

## Project Structure

```
AIStackHub/
├── data/
│   ├── tools.json          ← ALL tool data lives here
│   ├── categories.json     ← Category definitions
│   └── listicles.json      ← "Best of" list pages
├── src/
│   ├── app/                ← Next.js App Router pages
│   │   ├── page.tsx              → Homepage
│   │   ├── tools/[slug]/         → Tool detail pages
│   │   ├── category/[slug]/      → Category pages
│   │   ├── [listicle]/           → Programmatic SEO pages
│   │   ├── blog/[slug]/          → Blog posts
│   │   ├── search/               → Search page
│   │   ├── submit/               → Submit a tool
│   │   └── ...
│   ├── components/         ← Reusable UI components
│   ├── lib/
│   │   ├── data.ts         ← All data access functions
│   │   └── seo.ts          ← Metadata & JSON-LD helpers
│   └── types/index.ts      ← TypeScript interfaces
├── scripts/
│   └── generate-sitemap.mjs ← Auto-runs before every build
└── public/
    ├── sitemap.xml         ← Auto-generated on build
    ├── robots.txt
    └── favicon.svg
```

---

## Content Management (File-Based CMS)

### Adding a New AI Tool

Edit `data/tools.json` and add a new object following this schema:

```json
{
  "id": "my-tool",
  "slug": "my-tool",
  "name": "My Tool",
  "tagline": "One-line description",
  "description": "Full 2-3 sentence description.",
  "category": "writing",
  "tags": ["writing", "free-tier"],
  "website": "https://mytool.com",
  "affiliateUrl": "",
  "logo": "/logos/my-tool.svg",
  "screenshot": "/screenshots/my-tool.png",
  "pricing": {
    "model": "freemium",
    "free": true,
    "freeDescription": "Free tier description",
    "startingPrice": "$20/month",
    "hasTrial": false,
    "plans": [
      { "name": "Free", "price": "$0", "features": ["Feature 1"] },
      { "name": "Pro",  "price": "$20/mo", "features": ["Feature 1", "Feature 2"] }
    ]
  },
  "rating": 4.5,
  "reviewCount": 1000,
  "featured": false,
  "trending": false,
  "isNew": true,
  "sponsored": false,
  "features": ["Key feature 1", "Key feature 2"],
  "pros": ["Pro 1", "Pro 2"],
  "cons": ["Con 1"],
  "useCases": ["Use case 1"],
  "alternatives": ["chatgpt", "claude"],
  "publishedAt": "2024-06-01",
  "updatedAt": "2024-06-01",
  "seoTitle": "My Tool Review 2024 – Features & Pricing",
  "seoDescription": "Detailed My Tool review. Features, pricing, and comparison."
}
```

Valid categories: `writing`, `coding`, `design`, `marketing`, `video`, `productivity`, `chatbots`, `audio`

### Adding a New "Best Of" List Page

Edit `data/listicles.json` and add:

```json
{
  "slug": "best-ai-tools-for-startups",
  "title": "10 Best AI Tools for Startups in 2024",
  "description": "The top AI tools every startup should be using.",
  "seoTitle": "Best AI Tools for Startups 2024",
  "seoDescription": "Top 10 AI tools for startups...",
  "category": null,
  "toolSlugs": ["chatgpt", "cursor", "notion-ai"],
  "publishedAt": "2024-06-01",
  "updatedAt": "2024-06-01"
}
```

The page will be live at `/best-ai-tools-for-startups` after the next build.

### Adding a Blog Post

Add entries to the `posts` object in `src/app/blog/[slug]/page.tsx`. For a full Markdown-based blog, see the **Scaling Guide** below.

---

## Deployment

### Vercel (Recommended — Free)

1. Push code to GitHub
2. Import repo at [vercel.com](https://vercel.com)
3. Set environment variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   GOOGLE_SITE_VERIFICATION=your-verification-code
   NEXT_PUBLIC_ADSENSE_ENABLED=false
   ```
4. Deploy — Vercel auto-detects Next.js and uses `output: export`

### Netlify (Free)

1. Push code to GitHub
2. Import repo at [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `out`
5. Set same environment variables as above

### Cloudflare Pages (Free)

1. Push code to GitHub
2. Create project at [pages.cloudflare.com](https://pages.cloudflare.com)
3. Framework preset: Next.js (Static HTML Export)
4. Build command: `npm run build`
5. Build output directory: `out`

---

## SEO Architecture

Every page is statically generated with:
- Dynamic `<title>` and `<meta description>` per page
- Open Graph + Twitter Card tags
- JSON-LD structured data (SoftwareApplication, Article, BreadcrumbList, WebSite)
- `sitemap.xml` — auto-generated on every build (run `npm run sitemap` manually)
- `robots.txt` — in `public/`
- Canonical URLs on all pages

### URL Structure

| URL | Content |
|---|---|
| `/` | Homepage |
| `/tools` | Full directory with filters |
| `/tools/chatgpt` | Tool detail page |
| `/category/writing` | Category landing page |
| `/best-ai-writing-tools` | Programmatic SEO listicle |
| `/free-ai-tools` | Programmatic SEO listicle |
| `/ai-tools-for-students` | Programmatic SEO listicle |
| `/blog/chatgpt-vs-claude` | Blog post |
| `/search` | Search (CSR) |

---

## Monetization Setup

### 1. Google AdSense

1. Apply at [adsense.google.com](https://adsense.google.com) — free
2. Once approved, get your **publisher ID** (ca-pub-XXXXXXXXXX)
3. In `src/app/layout.tsx`, uncomment the AdSense script and replace `XXXXXXXXXX`
4. In `src/components/AdUnit.tsx`, replace `ca-pub-XXXXXXXXXX` with your publisher ID
5. Set `NEXT_PUBLIC_ADSENSE_ENABLED=true` in your deployment environment variables
6. Use `<AdUnit slot="YOUR_SLOT_ID" format="horizontal" />` anywhere in pages

Ad placements are already prepared in:
- Tool detail page sidebar
- Homepage bottom section (commented out, ready to enable)

### 2. Sponsored Listings

Tools with `"sponsored": true` in `tools.json` show a "Sponsored" badge.

**Pricing suggestion:** $99–$499/month per sponsored slot depending on traffic.

To add a sponsor:
1. Set `"sponsored": true` and `"featured": true` on their tool entry
2. Set `"affiliateUrl"` to their tracking link
3. Invoice them monthly

### 3. Affiliate Links

Set `"affiliateUrl"` on any tool to a partner/affiliate tracking URL.  
All CTA buttons use `affiliateUrl` when present, falling back to `website`.  
Affiliate disclosure is automatically shown when `affiliateUrl` is set.

---

## Scaling to Thousands of Pages

The current data architecture scales to any size:

- **1,000+ tools:** Just keep adding to `tools.json` — or split into multiple JSON files and merge in `src/lib/data.ts`
- **100+ listicle pages:** Keep adding to `listicles.json`
- **Full Markdown blog:** Install `gray-matter` + `remark` (already in `package.json`) and read `.md` files from `content/blog/`

### Markdown Blog (optional upgrade)

Create `src/lib/blog.ts`:

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const POSTS_DIR = path.join(process.cwd(), 'content/blog')

export async function getPostBySlug(slug: string) {
  const file = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), 'utf-8')
  const { data, content } = matter(file)
  const processed = await remark().use(html).process(content)
  return { ...data, content: processed.toString() }
}
```

Then create `content/blog/my-post.md` with frontmatter and publish instantly on next build.

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your domain | `https://aistackhub.com` |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console verification | empty |
| `NEXT_PUBLIC_ADSENSE_ENABLED` | Enable real AdSense ads | `false` |

---

## Performance

The build produces a fully static site with:
- **Zero server** — pure HTML/CSS/JS files
- **~103 kB** shared JS (First Load)
- Client-side search via Fuse.js (no API calls)
- Images unoptimized (for static export) — add Cloudflare Image Resizing or imgix for CDN optimization
- Security headers configured in `vercel.json` and `netlify.toml`

Target Lighthouse scores: **95+** on all metrics.

---

## License

MIT — use freely for commercial projects.
