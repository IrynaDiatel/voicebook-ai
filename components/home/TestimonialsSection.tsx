"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const avatarColors = [
    "from-brand-600 to-brand-500",
    "from-violet-600 to-violet-500",
    "from-indigo-600 to-indigo-500",
    "from-purple-600 to-purple-500",
  ];

  return (
    <section id="testimonials" ref={ref} className="py-20 lg:py-28 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/10 border border-brand-600/20 mb-4">
            <Star className="w-3.5 h-3.5 text-brand-600 fill-current" />
            <span className="text-sm font-medium text-brand-600">Відгуки</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mb-4">
            Що кажуть{" "}
            <span className="text-gradient">наші користувачі</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
            {Array(5).fill(null).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
            <span>4.9 / 5 на основі 120+ відгуків</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-base card-hover p-6 sm:p-7"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array(t.rating).fill(null).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-[var(--text-primary)] text-sm sm:text-base leading-relaxed mb-5">
                &ldquo;{t.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[var(--text-primary)] text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
