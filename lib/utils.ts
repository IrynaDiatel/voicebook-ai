import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { WORDS_PER_MINUTE } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} сек`;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60);

  if (hours > 0) {
    return `${hours}год ${minutes}хв`;
  }
  return `${minutes}хв ${secs}сек`;
}

export function estimateAudioDuration(wordCount: number, speed = 1.0): number {
  // returns seconds
  return Math.round((wordCount / WORDS_PER_MINUTE / speed) * 60);
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "…";
}

export function getFileExtension(filename: string): string {
  return filename.slice(filename.lastIndexOf(".")).toLowerCase();
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function chunkText(text: string, maxChunkSize = 4000): string[] {
  const chunks: string[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  let currentChunk = "";

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? " " : "") + sentence;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getLanguageName(code: string): string {
  const map: Record<string, string> = {
    uk: "Українська",
    ru: "Русский",
    en: "English",
    pl: "Polski",
    de: "Deutsch",
    fr: "Français",
    es: "Español",
    it: "Italiano",
    pt: "Português",
    cs: "Čeština",
    sk: "Slovenčina",
    tr: "Türkçe",
    ro: "Română",
    nl: "Nederlands",
  };
  return map[code] ?? code.toUpperCase();
}
