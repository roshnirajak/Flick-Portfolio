"use client";

import { useRouter, usePathname } from "next/navigation";
import navigationData from "../data/navigation.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { email, navLinks, socialLinks } = navigationData;
  const router = useRouter();
  const pathname = usePathname();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Check if it's a route (starts with /) or a hash link (starts with #)
    if (href.startsWith('/')) {
      // Route navigation - use Next.js router
      router.push(href);
    } else if (href.startsWith('#')) {
      // Hash link - if on homepage, scroll; otherwise navigate to homepage first
      if (pathname === '/') {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        router.push(`/${href}`);
      }
    }
  };

  return (
    <footer
      className="w-full py-12 px-6"
      style={{ backgroundColor: '#0a0a0a' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3
              className="text-2xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-akira-expanded)' }}
            >
              Flick
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              Creative portfolio showcasing innovative work and digital experiences.
            </p>
            <p className="text-gray-400 text-sm">
              Email: <a href={`mailto:${email}`} className="text-white hover:underline">{email}</a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Socials</h4>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} Flick. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm text-center md:text-right">
              Designed & developed by my sis
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

