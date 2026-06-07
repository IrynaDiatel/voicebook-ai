"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FileInfo, VoiceSettings, AudioJob } from "@/types";
import { DEFAULT_VOICE_SETTINGS, DEFAULT_VOICE_ID } from "@/lib/constants";
import { generateId } from "@/lib/utils";

interface ConverterStore {
  // Files
  files: FileInfo[];
  addFiles: (files: FileInfo[]) => void;
  removeFile: (id: string) => void;
  updateFile: (id: string, updates: Partial<FileInfo>) => void;
  clearFiles: () => void;
  mergeFiles: boolean;
  setMergeFiles: (v: boolean) => void;

  // Voice settings
  voiceSettings: VoiceSettings;
  setVoiceSettings: (settings: Partial<VoiceSettings>) => void;
  resetVoiceSettings: () => void;

  // Jobs
  jobs: AudioJob[];
  addJob: (job: Omit<AudioJob, "id" | "createdAt">) => AudioJob;
  updateJob: (id: string, updates: Partial<AudioJob>) => void;
  removeJob: (id: string) => void;
  getJobById: (id: string) => AudioJob | undefined;

  // UI
  activeJobId: string | null;
  setActiveJobId: (id: string | null) => void;
  showPreview: boolean;
  setShowPreview: (v: boolean) => void;
  previewFileId: string | null;
  setPreviewFileId: (id: string | null) => void;
}

export const useConverterStore = create<ConverterStore>()(
  persist(
    (set, get) => ({
      // Files
      files: [],
      mergeFiles: false,

      addFiles: (newFiles) =>
        set((state) => ({
          files: [...state.files, ...newFiles],
        })),

      removeFile: (id) =>
        set((state) => ({
          files: state.files.filter((f) => f.id !== id),
        })),

      updateFile: (id, updates) =>
        set((state) => ({
          files: state.files.map((f) =>
            f.id === id ? { ...f, ...updates } : f
          ),
        })),

      clearFiles: () => set({ files: [] }),

      setMergeFiles: (v) => set({ mergeFiles: v }),

      // Voice settings
      voiceSettings: DEFAULT_VOICE_SETTINGS,

      setVoiceSettings: (settings) =>
        set((state) => ({
          voiceSettings: { ...state.voiceSettings, ...settings },
        })),

      resetVoiceSettings: () =>
        set({ voiceSettings: DEFAULT_VOICE_SETTINGS }),

      // Jobs
      jobs: [],

      addJob: (jobData) => {
        const job: AudioJob = {
          ...jobData,
          id: generateId(),
          createdAt: new Date(),
        };
        set((state) => ({ jobs: [job, ...state.jobs] }));
        return job;
      },

      updateJob: (id, updates) =>
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === id ? { ...j, ...updates } : j
          ),
        })),

      removeJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== id),
        })),

      getJobById: (id) => get().jobs.find((j) => j.id === id),

      // UI
      activeJobId: null,
      setActiveJobId: (id) => set({ activeJobId: id }),
      showPreview: false,
      setShowPreview: (v) => set({ showPreview: v }),
      previewFileId: null,
      setPreviewFileId: (id) => set({ previewFileId: id }),
    }),
    {
      name: "voicebook-converter",
      partialize: (state) => ({
        voiceSettings: state.voiceSettings,
        mergeFiles: state.mergeFiles,
        jobs: state.jobs.filter((j) => j.status === "completed"),
      }),
    }
  )
);
