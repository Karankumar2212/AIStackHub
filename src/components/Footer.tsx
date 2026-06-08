import Link from 'next/link'
import { Zap, Twitter, Github, Rss } from 'lucide-react'

const footerLinks = {
  'AI Tools': [
    { label: 'All Tools', href: '/tools' },
    { label: 'Trending', href: '/tools?filter=trending' },
    { label: 'New Tools', href: '/tools?filter=new' },
    { label: 'Free Tools', href: '/free-ai-tools' },
    { label: 'Submit Tool', href: '/submit' },
  ],
  Categories: [
    { label: 'Writing', href: '/category/writing' },
    { label: 'Coding', href: '/category/coding' },
    { label: 'Design', href: '/category/design' },
    { label: 'Marketing', href: '/category/marketing' },
    { label: 'Video', href: '/category/video' },
    { label: 'Productivity', href: '/category/productivity' },
  ],
  'Best Lists': [
    { label: 'Best AI Writing Tools', href: '/best-ai-writing-tools' },
    { label: 'Best AI Coding Tools', href: '/best-ai-coding-tools' },
    { label: 'AI Tools for Students', href: '/ai-tools-for-students' },
    { label: 'AI Tools for Marketers', href: '/ai-tools-for-marketers' },
    { label: 'Free AI Tools', href: '/free-ai-tools' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">
                AI<span className="text-brand-400">Stack</span>Hub
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              The best directory for discovering and comparing AI tools. Find your perfect AI stack.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/aistackhub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/aistackhub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="/rss.xml"
                className="hover:text-white transition-colors"
                aria-label="RSS Feed"
              >
                <Rss className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-white font-semibold text-sm mb-3">{heading}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} AIStackHub. All rights reserved.
          </p>
          <p className="text-sm">
            Built with ❤️ for the AI community
          </p>
        </div>
      </div>
    </footer>
  )
}
