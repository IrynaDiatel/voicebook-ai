import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "VoiceBook AI — Перетворення файлів на аудіо",
  description:
    "Перетворюйте базові текстові файли на аудіо за допомогою вбудованих голосів вашого браузера. Швидко, безкоштовно та зручно.",
  alternates: {
    canonical: "https://voicebook-ai.com",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
    </>
  );
}
