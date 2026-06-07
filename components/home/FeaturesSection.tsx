"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import {
  FileText, Globe, Mic, Zap, Download, History,
  Upload, Settings, Play, CheckCircle,
} from "lucide-react";
import { FEATURES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, Globe, Mic, Zap, Download, History,
};

const colors: Record<string, string> = {
  brand: "from-brand-600 to-brand-500",
  violet: "from-violet-600 to-violet-500",
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Завантажте файл",
    desc: "Drag & Drop або кнопка завантаження. Підтримка 25+ форматів.",
    color: "brand",
  },
  {
    icon: Settings,
    step: "02",
    title: "Оберіть голос",
    desc: "13 AI-голосів: жіночі та чоловічі. Налаштуйте швидкість і тональність.",
    color: "violet",
  },
  {
    icon: Play,
    step: "03",
    title: "Генерація аудіо",
    desc: "AI автоматично визначає мову та конвертує текст у природне аудіо.",
    color: "brand",
  },
  {
    icon: Download,
    step: "04",
    title: "Завантажте MP3",
    desc: "Слухайте в онлайн-плеєрі або завантажте на свій пристрій.",
    color: "violet",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" ref={ref} className="py-20 lg:py-28 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/10 border border-brand-600/20 mb-4">
            <Zap className="w-3.5 h-3.5 text-brand-600" />
            <span className="text-sm font-medium text-brand-600">Можливості</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] mb-4">
            Все що потрібно для{" "}
            <span className="text-gradient">ідеального аудіо</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Від завантаження файлу до готового MP3 — автоматично, швидко, якісно
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="card-base card-hover p-6 group"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300",
                    colors[feature.color]
                  )}
                >
                  {Icon && <Icon className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] mb-2">
            Як це працює
          </h2>
          <p className="text-[var(--text-secondary)]">4 кроки до готової аудіокниги</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="relative text-center"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[60%] w-full h-px bg-gradient-to-r from-brand-600/40 to-transparent" />
                )}

                <div
                  className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mx-auto mb-4 shadow-brand",
                    colors[step.color]
                  )}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="absolute top-0 right-1/2 -translate-y-1/2 translate-x-8 w-5 h-5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-brand-600">{step.step}</span>
                </div>

                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 p-6 rounded-2xl bg-gradient-to-br from-brand-600/10 to-violet-600/10 border border-brand-600/20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Без реєстрації для старту",
              "Авто-визначення мови",
              "До 500 МБ на файл",
              "MP3 у високій якості",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-brand-600 shrink-0" />
                <span className="text-sm font-medium text-[var(--text-primary)]">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
