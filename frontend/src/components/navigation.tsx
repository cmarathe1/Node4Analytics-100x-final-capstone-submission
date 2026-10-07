'use client';

import React, { useState, useCallback } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CircleDot, Menu, X } from 'lucide-react';
import posthog from 'posthog-js';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'How It Works', href: '#workflow' },
  { label: 'Why n4a', href: '#benefits' },
  { label: 'Features', href: '#features' },
];

const Navigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      posthog.capture('nav_link_clicked', { section: href });
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    },
    []
  );

  return (
    <nav
      data-testid="main-nav"
      className="sticky top-0 z-50 backdrop-blur-md bg-[#FFF2DF]/80 border-b border-[hsl(30_25%_85%)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a
          href="#hero"
          data-testid="brand-logo"
          className="flex items-center gap-2 font-semibold text-lg tracking-tight"
          style={{
            color: 'hsl(222 35% 12%)',
            fontFamily: "var(--font-gloock), 'Gloock', serif",
          }}
          onClick={(e) => handleNavClick(e, '#hero')}
        >
          <CircleDot
            className="h-5 w-5"
            style={{ color: 'hsl(196 55% 38%)' }}
          />
          Node4analytics
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-testid={`nav-link-${link.label.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:text-[hsl(196_55%_38%)]"
              style={{ color: 'hsl(222 18% 34%)' }}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <Button
            data-testid="nav-cta-button"
            className="rounded-xl bg-[hsl(222_45%_16%)] text-white hover:bg-[hsl(222_45%_14%)] text-sm px-5"
            onClick={() => {
              posthog.capture('nav_cta_clicked', { label: 'Request Early Access', source: 'desktop_nav' });
              const el = document.querySelector('#contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Request Early Access
          </Button>
        </div>

        <button
          data-testid="mobile-menu-toggle"
          className="md:hidden p-2 rounded-lg hover:bg-[hsl(210_30%_95%)]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, height: 0 }}
            className="md:hidden border-t border-[hsl(30_25%_85%)] bg-[#FFF2DF]/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium py-2"
                  style={{ color: 'hsl(222 18% 34%)' }}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="w-full rounded-xl bg-[hsl(222_45%_16%)] text-white mt-2"
                onClick={() => {
                  posthog.capture('nav_cta_clicked', { label: 'Request Early Access', source: 'mobile_menu' });
                  const el = document.querySelector('#contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileOpen(false);
                }}
              >
                Request Early Access
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
