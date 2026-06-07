"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, Upload, Headphones, Zap, Globe, FileText, Star } from "lucide-react";

const stats = [
  { value: "8+", label: "форматів файлів" },
  { value: "Системні", label: "голоси" },
  { value: "14+", label: "мов" },
  { value: "Швидко", label: "та зручно" },
];

const audioWaveHeights = [16, 28, 40, 52, 64, 52, 40, 28, 16, 24, 36, 48, 60, 48, 36, 24];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1a] via-[#1e1b4b] to-[#2e1065] dark:opacity-100 opacity-95" />
      <div className="absolute inset-0 dot-grid opacity-30" />

      {/* Decorative orbs */}
      <div className="orb w-96 h-96 bg-brand-600 top-20 -left-32 opacity-20" />
      <div className="orb w-80 h-80 bg-violet-600 bottom-20 -right-24 opacity-25" />
      <div className="orb w-64 h-64 bg-brand-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-brand border border-brand-500/30 mb-6"
          >
            <Sparkles className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-medium text-brand-300">
              AI-озвучення нового покоління
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight"
          >
            Перетворюйте{" "}
            <span className="relative inline-block">
              <span className="text-gradient-light">ваші файли</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M0 6 Q75 12 150 6 Q225 0 300 6" stroke="url(#underlineGrad)" strokeWidth="3" strokeLinecap="round" />
                <defs>
                  <linearGradient id="underlineGrad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            {" "}на аудіо
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-brand-200/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Завантажте PDF, DOCX, EPUB або будь-який з 8+ підтримуваних форматів і відтворюйте
            текст зручно за допомогою <strong className="text-white">вбудованих голосів</strong> вашого браузера

          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/converter"
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 text-white font-bold text-lg shadow-brand-xl hover:shadow-brand-xl hover:scale-105 transition-all duration-300"
              id="hero-cta-convert"
            >
              <Upload className="w-5 h-5 group-hover:animate-bounce" />
              Конвертувати безкоштовно
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#demo"
              className="flex items-center gap-3 px-8 py-4 rounded-2xl glass border border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
              id="hero-cta-demo"
            >
              <Play className="w-5 h-5 fill-current" />
              Демо
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto mb-16"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm text-brand-300/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Audio wave visualizer */}
          <motion.div
            id="demo"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-3xl mx-auto glass-brand border border-brand-500/30 rounded-3xl p-6 sm:p-8"
          >
            {/* Player header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">Демо: "Кобзар" Т.Г. Шевченко</div>
                  <div className="text-xs text-brand-300/70 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Голос: Системний · Українська
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[Globe, FileText, Zap].map((Icon, i) => (
                  <div key={i} className="p-1.5 rounded-lg glass text-brand-300">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Waveform */}
            <div className="flex items-center justify-center gap-1 h-20 mb-6">
              {audioWaveHeights.map((h, i) => (
                <div
                  key={i}
                  className="audio-bar"
                  style={{
                    height: `${h}px`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-500 to-violet-500"
                  style={{ width: "38%" }}
                />
              </div>
              <div className="flex justify-between text-xs text-brand-300/50">
                <span>1:24</span>
                <span>3:47</span>
              </div>
            </div>

            {/* Format badges */}
            <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
              {["PDF", "DOCX", "EPUB", "FB2", "TXT", "MOBI", "+19"].map((fmt) => (
                <span
                  key={fmt}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-brand-300 font-mono"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex items-center justify-center gap-3"
          >
            <div className="flex -space-x-2">
              {["О", "М", "І", "А", "В"].map((letter, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold border-2 border-[#1e1b4b]"
                >
                  {letter}
                </div>
              ))}
            </div>
            <div className="text-sm text-brand-300/70">
              <span className="text-white font-semibold">1,200+</span> користувачів вже конвертують
            </div>
            <div className="flex items-center gap-0.5">
              {Array(5).fill(null).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
