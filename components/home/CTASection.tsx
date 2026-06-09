"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Upload } from "lucide-react";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700 p-10 sm:p-14 text-center shadow-brand-xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
          <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="text-sm font-medium text-white">Безкоштовно — без реєстрації</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              Готові перетворити ваш текст
              <br />
              <span className="text-brand-200">на якісне аудіо?</span>
            </h2>

            <p className="text-lg text-brand-200 mb-10 max-w-2xl mx-auto">
              Завантажте перший файл зараз і отримайте MP3 за лічені хвилини.
              11 нейромережевих голосів чекають.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/converter"
                id="cta-start-converting"
                className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-brand-700 font-bold text-lg hover:bg-brand-50 transform hover:-translate-y-0.5 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Upload className="w-5 h-5 group-hover:animate-bounce" />
                Почати конвертацію
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
