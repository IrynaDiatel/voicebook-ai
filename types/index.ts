// Voice definitions for TTS
export interface VoiceOption {
  id: string;
  name: string;
  gender: "female" | "male";
  language: string;
  languageCode: string;
  provider: "azure" | "google" | "openai";
  voiceName: string;
  preview?: string;
  description: string;
  accent?: string;
}

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface FileInfo {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: "pending" | "extracting" | "ready" | "error";
  extractedText?: string;
  wordCount?: number;
  charCount?: number;
  pageCount?: number;
  estimatedDuration?: number;
  language?: string;
  error?: string;
}

export interface VoiceSettings {
  voiceId: string;
  speed: number;       // 0.5 - 2.0
  pitch: number;       // -50 - 50 (semitones)
  volume: number;      // 0 - 100
  quality: "standard" | "high" | "ultra";
  language?: string;   // auto-detected or manual
}

export interface AudioJob {
  id: string;
  fileIds: string[];
  fileName: string;
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  totalChunks: number;
  processedChunks: number;
  audioUrl?: string;
  audioDuration?: number;
  audioSize?: number;
  settings: VoiceSettings;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

export interface AudioHistoryItem {
  id: string;
  fileName: string;
  voiceName: string;
  language: string;
  duration: number;       // seconds
  fileSize: number;       // bytes
  audioUrl: string;
  createdAt: string;
  status: "completed" | "failed";
}

export interface UserStats {
  totalFiles: number;
  totalDuration: number;     // seconds
  storageUsed: number;       // bytes
  filesThisMonth: number;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  features: string[];
  limits: {
    filesPerMonth: number;
    maxFileSize: number;     // MB
    maxDuration: number;     // minutes
    storageGB: number;
  };
  popular?: boolean;
  cta: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ExtractTextResponse {
  text: string;
  wordCount: number;
  charCount: number;
  pageCount: number;
  language: string;
  estimatedDuration: number;
}

export interface UploadResponse {
  fileId: string;
  url: string;
  fileName: string;
  size: number;
}

export interface TtsJobResponse {
  jobId: string;
  status: AudioJob["status"];
  audioUrl?: string;
  progress?: number;
}
