"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="card-base overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-brand-600/5 transition-colors duration-200"
        aria-expanded={isOpen}
        id={`faq-question-${index}`}
      >
        <span className="font-semibold text-[var(--text-primary)] text-sm sm:text-base">
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-brand-600 shrink-0 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        role="region"
        aria-labelledby={`faq-question-${index}`}
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6">
          <div className="h-px bg-[var(--border-color)] mb-4" />
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            {faq.answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="py-20 lg:py-28 bg-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-600/10 border border-brand-600/20 mb-4">
            <span className="text-sm font-medium text-brand-600">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] mb-4">
            Часті запитання
          </h2>
          <p className="text-[var(--text-secondary)]">
            Відповіді на найпоширеніші питання про VoiceBook AI
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-[var(--text-muted)] mt-8"
        >
          Не знайшли відповідь?{" "}
          <a href="/contact" className="text-brand-600 hover:underline">
            Напишіть нам
          </a>
        </motion.p>
      </div>
    </section>
  );
}
