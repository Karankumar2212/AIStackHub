import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ChevronRight, ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'

// Static blog posts — extend by adding Markdown files in content/blog/
// and using gray-matter + remark to parse them (see lib/blog.ts)
const posts: Record<string, {
  title: string
  excerpt: string
  content: string
  category: string
  publishedAt: string
  updatedAt: string
  readTime: string
  seoTitle: string
  seoDescription: string
}> = {
  'chatgpt-vs-claude-vs-gemini': {
    title: 'ChatGPT vs Claude vs Gemini: Which AI Chatbot Is Best in 2024?',
    excerpt: "We put the three biggest AI chatbots head-to-head across writing, coding, reasoning, and everyday tasks. Here's what we found.",
    category: 'Comparisons',
    publishedAt: '2024-05-15',
    updatedAt: '2024-05-20',
    readTime: '8 min read',
    seoTitle: 'ChatGPT vs Claude vs Gemini 2024 – Complete Comparison',
    seoDescription: 'Detailed comparison of ChatGPT, Claude, and Gemini. We tested all three on writing, coding, and reasoning tasks. Find out which AI chatbot is best for you in 2024.',
    content: `
## Overview

Three AI models dominate the chatbot landscape in 2024: **ChatGPT** by OpenAI, **Claude** by Anthropic, and **Gemini** by Google. We ran them through dozens of real-world tests to find out where each one excels — and where it falls short.

## Writing Quality

For long-form writing, Claude 3 Opus consistently produces the most nuanced, human-sounding prose. ChatGPT Plus (GPT-4) is a close second with stronger template adherence. Gemini Pro performs well for short-form content but can feel mechanical in longer pieces.

**Winner: Claude**

## Coding Ability

ChatGPT and Gemini both shine here. GPT-4 handles complex multi-file refactoring well and has the largest ecosystem of coding plugins. Gemini's code generation is strong and benefits from its Google Search integration for looking up APIs in real time.

**Winner: Tie (ChatGPT vs Gemini)**

## Reasoning & Analysis

Claude's 200K context window makes it unbeatable for reasoning over long documents — think legal contracts, research papers, or entire codebases. For shorter reasoning tasks, all three are competitive.

**Winner: Claude (long context), ChatGPT (short reasoning)**

## Real-Time Information

Gemini wins outright — it has Google Search baked in for free. ChatGPT requires a Plus subscription for browsing. Claude has no web access at all.

**Winner: Gemini**

## Pricing

| Model | Free Tier | Paid |
|---|---|---|
| ChatGPT | GPT-3.5 unlimited | $20/mo (GPT-4) |
| Claude | Sonnet (limited) | $20/mo (Opus) |
| Gemini | Pro (unlimited) | $19.99/mo (Ultra) |

## Verdict

- **Best overall:** ChatGPT Plus (widest capability range)
- **Best for writing & analysis:** Claude Pro
- **Best free option:** Gemini Pro
- **Best for research:** Perplexity AI (with citations)

There's no single winner — the right tool depends on your use case.
    `,
  },
  'best-free-ai-tools-2024': {
    title: "20 Actually Free AI Tools That Don't Require a Credit Card",
    excerpt: "Tired of \"free trials\" that ask for your credit card? We found 20 genuinely free AI tools with no gotchas.",
    category: 'Guides',
    publishedAt: '2024-05-10',
    updatedAt: '2024-05-15',
    readTime: '6 min read',
    seoTitle: 'Best Free AI Tools 2024 – No Credit Card Required',
    seoDescription: '20 genuinely free AI tools with no credit card required. Free AI for writing, coding, image generation, voice synthesis, and more.',
    content: `
## What Makes a Tool "Truly Free"?

For this guide, we only included tools where you can:
- Sign up without a credit card
- Use core features indefinitely (not just a trial)
- Do meaningful work on the free plan

Here are our top picks across every category.

## Free AI Chatbots

**1. ChatGPT (Free)** — GPT-3.5 access, no card required. Excellent for everyday tasks.

**2. Claude (Free)** — Anthropic's Claude 3 Sonnet with daily limits. Best free writing AI.

**3. Gemini (Free)** — Google's Gemini Pro, unlimited, with real-time web search.

**4. Perplexity AI (Free)** — 5 Pro searches/day, unlimited standard. Best free research tool.

## Free AI Coding Tools

**5. Codeium** — Unlimited completions, 70+ languages. Best free GitHub Copilot alternative.

**6. GitHub Copilot (Students)** — Free for verified students and open source maintainers.

## Free AI Image Generators

**7. Adobe Firefly** — 25 generative credits/month with commercial license.

**8. DALL-E 3 via ChatGPT** — Limited free generations through ChatGPT free tier.

## Free AI Writing Tools

**9. Copy.ai** — 2,000 words/month, 90+ templates. Best free copywriting tool.

## Free AI Audio

**10. ElevenLabs** — 10,000 characters/month of realistic voice synthesis.

## Verdict

The free tiers for AI tools have never been better. Start with Gemini for search + chat, Codeium for coding, and ElevenLabs for voice — you can build a genuinely powerful free AI stack.
    `,
  },
  'github-copilot-vs-cursor': {
    title: 'GitHub Copilot vs Cursor: Which AI Code Assistant Is Better?',
    excerpt: 'Detailed comparison of the two most popular AI coding tools. We tested both for 30 days on real projects.',
    category: 'Comparisons',
    publishedAt: '2024-04-28',
    updatedAt: '2024-05-05',
    readTime: '7 min read',
    seoTitle: 'GitHub Copilot vs Cursor 2024 – Which Is Better for Developers?',
    seoDescription: 'Detailed GitHub Copilot vs Cursor comparison. We tested both for 30 days. Features, pricing, code quality. Which AI coding assistant should you use in 2024?',
    content: `
## The Big Question

GitHub Copilot ($10/month) and Cursor ($20/month) are the two most popular AI coding tools. After 30 days of daily use on real production projects, here's our honest take.

## Integration Style

**Copilot** is a plugin — it lives inside your existing editor (VS Code, JetBrains, Neovim). Zero disruption to your workflow.

**Cursor** is a full editor forked from VS Code. You either switch to it entirely or use it alongside your current setup.

## Autocomplete Quality

Both are excellent. Copilot's completions feel slightly more natural for boilerplate. Cursor's "Tab" completions are smarter about multi-line edits and can complete entire functions in context.

**Slight edge: Cursor**

## Codebase Understanding

This is where Cursor wins decisively. Cursor indexes your entire repo and understands how files relate. When you ask "why is this function slow?", Cursor reads your actual code, not just the current file. Copilot is essentially stateless across files.

**Clear winner: Cursor**

## Multi-File Edits

Copilot can't do this. Cursor can make changes across 5–10 files in a single AI instruction. This is genuinely transformative for refactoring.

**Winner: Cursor (only option)**

## Pricing

| | Copilot | Cursor |
|---|---|---|
| Free | Students only | Yes (limited) |
| Individual | $10/mo | $20/mo |
| Business | $19/mo | $40/mo |

## Verdict

- **Stick with Copilot if:** You can't change editors, work in a JetBrains IDE, or want the cheapest option
- **Switch to Cursor if:** You're in VS Code and want the most powerful AI coding experience available

For most developers, Cursor's codebase awareness justifies the extra $10/month.
    `,
  },
  'midjourney-v6-guide': {
    title: 'Midjourney V6 Complete Guide: Prompts, Tips & Best Practices',
    excerpt: 'Everything you need to know about Midjourney V6 — from prompt structure to advanced techniques for stunning results.',
    category: 'Guides',
    publishedAt: '2024-04-20',
    updatedAt: '2024-04-25',
    readTime: '12 min read',
    seoTitle: 'Midjourney V6 Guide 2024 – Prompts, Tips & Techniques',
    seoDescription: 'Complete Midjourney V6 guide. Learn prompt structure, parameters, and techniques for stunning AI art. Includes example prompts and best practices for V6.',
    content: `
## What's New in Midjourney V6

Midjourney V6 is a massive leap in realism, text rendering, and prompt understanding. Key improvements:

- Dramatically better photorealism
- In-image text that actually works
- Superior prompt adherence (longer, more complex prompts work now)
- More natural lighting and composition

## Basic Prompt Structure

\`\`\`
/imagine [subject], [style], [lighting], [camera/lens], [mood], [parameters]
\`\`\`

**Example:**
\`\`\`
/imagine portrait of a woman in a Parisian café, cinematic lighting, 
shot on 35mm film, warm nostalgic mood, shallow depth of field --ar 3:2 --v 6
\`\`\`

## Essential Parameters

| Parameter | Usage | Example |
|---|---|---|
| \`--ar\` | Aspect ratio | \`--ar 16:9\` |
| \`--v 6\` | Use V6 model | Always add this |
| \`--style raw\` | Less artistic, more literal | Great for products |
| \`--cref\` | Character reference | \`--cref [url]\` |
| \`--sref\` | Style reference | \`--sref [url]\` |
| \`--q\` | Quality (0.25–2) | \`--q 2\` for max |

## Pro Tips

**1. Be specific with lighting**
Instead of "good lighting" try: "golden hour backlighting", "overcast diffused light", "neon rim lighting"

**2. Use photographic language**
"shot on Hasselblad 500C", "f/1.4 bokeh", "Kodak Portra 400" — these dramatically improve realism.

**3. Add negative prompts**
\`--no blur, watermark, text, oversaturated\` removes common issues.

**4. Style references (\`--sref\`)**
Paste an image URL after \`--sref\` to match that image's visual style without copying content.

## Top Prompt Templates

**Product photography:**
\`commercial product shot of [product], white background, studio lighting, high-end catalog photo --ar 1:1 --style raw --v 6\`

**Portrait:**
\`editorial portrait of [person description], natural light, film grain, analog photography --ar 4:5 --v 6\`

**Architecture:**
\`architectural visualization of [building type], golden hour, ultra-detailed --ar 16:9 --q 2 --v 6\`

Master these foundations and you'll be producing professional-quality images consistently.
    `,
  },
  'ai-tools-for-solopreneurs': {
    title: 'The Ultimate AI Stack for Solopreneurs in 2024',
    excerpt: 'Running a business solo? These AI tools will help you punch well above your weight without breaking the bank.',
    category: 'Guides',
    publishedAt: '2024-05-05',
    updatedAt: '2024-05-10',
    readTime: '10 min read',
    seoTitle: 'Best AI Tools for Solopreneurs 2024 – Complete Stack Guide',
    seoDescription: 'The complete AI stack for solopreneurs in 2024. Tools for writing, coding, marketing, design, and customer support. Build a one-person business with AI.',
    content: `
## Why Solopreneurs Win with AI

The single biggest advantage AI gives solopreneurs is *leverage*. You can produce content, code, designs, and customer communications at the speed of a small team — without the payroll.

Here's the stack I'd build today if starting from scratch.

## The Core Stack

### Communication & Writing
**Claude Pro ($20/mo)** — Your AI writing partner. Use it for emails, proposals, content, and anything that needs to sound human.

### Research & Search
**Perplexity AI (Free)** — Real-time research with citations. Faster than Google for most business research tasks.

### Coding & Automation
**Cursor Hobby (Free)** — Even if you're not a developer, Cursor can help you build simple automations, scripts, and landing pages.

### Design
**Adobe Firefly (Free)** — 25 commercial-safe image generations per month. Enough for social content and blog images.

### Video
**Runway ML (Free tier)** — 125 one-time credits. Great for creating a product demo or intro video.

### Meeting Notes
**Otter.ai (Free)** — 300 minutes/month of automatic transcription. Essential for client calls.

### Voice
**ElevenLabs (Free)** — 10K chars/month for voiceovers, podcast intros, or video narration.

## Total Monthly Cost: $20

That's it. One Claude Pro subscription gives you a world-class writing and analysis partner. Everything else is free.

## Scale-Up Stack (if revenue allows)

Once you're generating $2,000+/month:

- **Jasper** for scaled content marketing
- **Cursor Pro** for serious development
- **Runway Standard** for regular video content
- **ElevenLabs Creator** for podcast/voiceover production

## The Golden Rule

Don't subscribe to everything at once. Master one AI tool per category before adding the next. The bottleneck is your workflow, not the tools.
    `,
  },
}

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts[slug]
  if (!post) return {}
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `https://aistackhub.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seoDescription,
    },
    alternates: {
      canonical: `https://aistackhub.com/blog/${slug}`,
    },
  }
}

// Simple markdown-to-HTML renderer (no external deps needed for basic markdown)
function renderMarkdown(md: string): string {
  return md
    .trim()
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-brand-700 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/```[\s\S]*?```/g, (block) => {
      const code = block.replace(/```\w*\n?/, '').replace(/```$/, '').trim()
      return `<pre class="bg-gray-950 text-green-400 rounded-xl p-4 overflow-x-auto text-sm my-4"><code>${code}</code></pre>`
    })
    .replace(/^\| (.+) \|$/gm, (row) => {
      const cells = row.split('|').filter(Boolean).map(c => c.trim())
      return `<tr>${cells.map(c => `<td class="border border-gray-200 px-3 py-2 text-sm">${c}</td>`).join('')}</tr>`
    })
    .replace(/(<tr>[\s\S]*?<\/tr>)/g, (table) => {
      return `<div class="overflow-x-auto my-4"><table class="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">${table}</table></div>`
    })
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 text-gray-600 text-sm"><span class="text-brand-500 mt-1">•</span><span>$1</span></li>')
    .replace(/(<li.*<\/li>\n?)+/g, (list) => `<ul class="space-y-1.5 my-3">${list}</ul>`)
    .replace(/\n\n/g, '</p><p class="text-gray-600 leading-relaxed mb-4">')
    .replace(/^(?!<)(.+)$/gm, '<p class="text-gray-600 leading-relaxed mb-4">$1</p>')
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug]
  if (!post) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'AIStackHub', url: 'https://aistackhub.com' },
    publisher: { '@type': 'Organization', name: 'AIStackHub', url: 'https://aistackhub.com' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-gray-700">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 font-medium truncate">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-gray-400 border-b border-gray-200 pb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
            <span>By AIStackHub Team</span>
          </div>
        </header>

        {/* Content */}
        <article
          className="prose-content mb-10"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* Back to blog */}
        <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <Link
            href="/tools"
            className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            Browse AI Tools →
          </Link>
        </div>
      </div>
    </>
  )
}
