import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";


const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://voicebook-ai.com"),
  icons: {
    icon: "/favicon.svg",
  },
  title: {
    default: "VoiceBook AI — Перетворення тексту на аудіо",
    template: "%s | VoiceBook AI",
  },
  description:
    "Перетворюйте PDF, DOCX, EPUB та 25+ форматів документів на якісне аудіо за допомогою AI. Голоси Поліна, Остап та ще 11 нейромережевих голосів для 14+ мов.",
  keywords: [
    "text to speech",
    "TTS",
    "аудіокнига",
    "перетворення тексту",
    "epub to audio",
    "pdf to audio",
    "Ukrainian TTS",
    "Поліна голос",
    "VoiceBook AI",
    "озвучення документів",
  ],
  authors: [{ name: "VoiceBook AI Team" }],
  creator: "VoiceBook AI",
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: "https://voicebook-ai.com",
    siteName: "VoiceBook AI",
    title: "VoiceBook AI — Перетворення тексту на аудіо",
    description:
      "Перетворюйте PDF, DOCX, EPUB та 25+ форматів документів на якісне аудіо за допомогою AI. 13 нейромережевих голосів, 14+ мов.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VoiceBook AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoiceBook AI — Перетворення тексту на аудіо",
    description:
      "PDF, DOCX, EPUB → MP3 за секунди. AI-голоси Поліна, Остап та ще 11 нейромережевих голосів.",
    images: ["/og-image.png"],
    creator: "@voicebookai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://voicebook-ai.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "VoiceBook AI",
              description:
                "SaaS платформа для перетворення текстових документів та електронних книг на аудіофайли з використанням AI",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web Browser",
              url: "https://voicebook-ai.com",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Text to Speech conversion",
                "25+ file formats support",
                "14+ languages",
                "Neural TTS voices",
                "MP3 download",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <ThemeProvider>
          <QueryProvider>
            <Header />
            <main className="flex-1 pt-16 lg:pt-20">
              {children}
            </main>
            <Footer />
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "var(--bg-card)",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  boxShadow: "var(--shadow-md)",
                  fontFamily: "var(--font-inter)",
                  fontSize: "14px",
                },
                success: {
                  iconTheme: {
                    primary: "#4f46e5",
                    secondary: "#ffffff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#ffffff",
                  },
                },
              }}
            />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
