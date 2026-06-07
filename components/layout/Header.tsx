"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Headphones, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Theme toggle removed

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 5);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Theme is forced dark

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-150",
        isScrolled
          ? "bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-color)] shadow-[var(--shadow-sm)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="VoiceBook AI — Головна"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center shadow-brand group-hover:shadow-brand-lg transition-shadow duration-300">
              <Headphones className="w-5 h-5 text-white" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-br from-violet-400 to-violet-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-1.5 h-1.5 text-white" />
              </div>
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="text-gradient">VoiceBook</span>
              <span className="text-[var(--text-primary)]"> AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-brand-600/10 text-brand-600 dark:text-brand-400"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors duration-200"
              aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="pb-4 pt-2 space-y-1 border-t border-[var(--border-color)]">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-brand-600/10 text-brand-600 dark:text-brand-400"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                )}
              >
                {link.label}
              </Link>
            ))}

          </div>
        </div>
      </nav>
    </header>
  );
}
