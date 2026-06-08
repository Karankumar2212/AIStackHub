# AIStackHub

The best AI tools directory. Discover, compare and find your perfect AI stack.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS 


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

