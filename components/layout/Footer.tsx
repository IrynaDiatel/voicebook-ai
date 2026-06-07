import Link from "next/link";
import { Headphones, Sparkles, Mail, Heart } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Конвертер", href: "/converter" },
  ],
};

const supportedFormats = ["TXT", "DOCX", "PDF", "RTF", "EPUB", "FB2", "MD", "HTML"];

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] mt-auto">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center shadow-brand">
                <Headphones className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-gradient">VoiceBook</span>
                <span className="text-[var(--text-primary)]"> AI</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 max-w-xs">
              Перетворюйте ваші файли на аудіо зручно та швидко
              за допомогою вбудованих голосів вашого браузера.
            </p>

            {/* Supported formats */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {supportedFormats.map((fmt) => (
                <span
                  key={fmt}
                  className="px-2 py-0.5 text-xs rounded-md bg-brand-600/10 text-brand-600 dark:text-brand-400 font-mono font-medium border border-brand-600/20"
                >
                  {fmt}
                </span>
              ))}
            </div>

            

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Продукт</h3>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-secondary)] hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-[var(--text-muted)] flex items-center gap-1.5">
            © {new Date().getFullYear()} VoiceBook AI. Зроблено з{" "}
            <Heart className="w-3.5 h-3.5 text-brand-600 fill-current" /> в Україні
          </p>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span className="text-xs text-[var(--text-muted)]">
              Powered by Web Speech API
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
