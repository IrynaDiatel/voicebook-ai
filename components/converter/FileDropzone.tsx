"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Plus, AlertCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { cn, generateId, formatBytes } from "@/lib/utils";
import {
  SUPPORTED_MIME_TYPES,
  SUPPORTED_FILE_TYPES,
  MAX_FILE_SIZE_BYTES,
  MAX_FILES,
} from "@/lib/constants";
import { useConverterStore } from "@/store/useConverterStore";
import type { FileInfo } from "@/types";

export function FileDropzone() {
  const { files, addFiles } = useConverterStore();
  const [isDragActive, setIsDragActive] = useState(false);

  const processFiles = useCallback(
    async (acceptedFiles: File[]) => {
      const remaining = MAX_FILES - files.length;
      if (remaining <= 0) {
        toast.error(`Максимум ${MAX_FILES} файлів одночасно`);
        return;
      }

      const filesToProcess = acceptedFiles.slice(0, remaining);
      if (acceptedFiles.length > remaining) {
        toast.error(`Додано лише перші ${remaining} файлів (ліміт: ${MAX_FILES})`);
      }

      const newFiles: FileInfo[] = filesToProcess.map((file) => ({
        id: generateId(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "pending" as const,
      }));

      addFiles(newFiles);
      toast.success(
        `${newFiles.length} ${newFiles.length === 1 ? "файл додано" : "файли додано"}`
      );

      // Simulate text extraction for demo
      for (const fileInfo of newFiles) {
        setTimeout(() => {
          const wordCount = Math.floor(Math.random() * 50000) + 1000;
          const charCount = wordCount * 5;
          useConverterStore.getState().updateFile(fileInfo.id, {
            status: "ready",
            wordCount,
            charCount,
            pageCount: Math.ceil(wordCount / 250),
            estimatedDuration: Math.round((wordCount / 150) * 60),
            language: "uk",
            extractedText: "Це демонстраційний текст. У реальному застосунку тут буде витягнутий текст з вашого документа...",
          });
        }, 1500 + Math.random() * 1000);

        useConverterStore.getState().updateFile(fileInfo.id, {
          status: "extracting",
        });
      }
    },
    [files, addFiles]
  );

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop: processFiles,
    accept: Object.fromEntries(
      SUPPORTED_MIME_TYPES.map((mime) => [mime, []])
    ),
    maxSize: MAX_FILE_SIZE_BYTES,
    multiple: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => {
      setIsDragActive(false);
      toast.error("Файл не підтримується або занадто великий (макс. 500 МБ)");
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300",
          isDragActive
            ? "border-brand-500 bg-brand-600/10 scale-[1.02]"
            : "border-[var(--border-color)] hover:border-brand-500/50 hover:bg-brand-600/5",
          files.length >= MAX_FILES && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        <input {...getInputProps()} aria-label="Завантаження файлів" />

        {/* Drop indicator overlay */}
        <AnimatePresence>
          {isDragActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-2xl bg-brand-600/10 border-2 border-brand-500 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <Plus className="w-16 h-16 text-brand-500 mx-auto" />
                </motion.div>
                <p className="text-lg font-semibold text-brand-500 mt-3">
                  Відпустіть файли
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center shadow-brand animate-float">
          <Upload className="w-8 h-8 text-white" />
        </div>

        {/* Text */}
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
          Перетягніть файли сюди
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-4">
          або{" "}
          <span className="text-brand-600 font-semibold underline underline-offset-2">
            натисніть для вибору
          </span>
        </p>

        {/* Supported formats */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-2">
          {SUPPORTED_FILE_TYPES.slice(0, 12).map((ext) => (
            <span
              key={ext}
              className="px-2 py-0.5 text-xs rounded-md bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-muted)] font-mono"
            >
              {ext}
            </span>
          ))}
          <span className="px-2 py-0.5 text-xs rounded-md bg-brand-600/10 border border-brand-600/20 text-brand-600 font-mono">
            +{SUPPORTED_FILE_TYPES.length - 12} інших
          </span>
        </div>

        <p className="text-xs text-[var(--text-muted)]">
          <FileText className="w-3 h-3 inline mr-1" />
          Максимальний розмір: 500 МБ · До {MAX_FILES} файлів одночасно
        </p>
      </div>

      {/* Rejection errors */}
      {fileRejections.length > 0 && (
        <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-600 dark:text-red-400">
            {fileRejections.length} файл(ів) відхилено: непідтримуваний формат або розмір перевищує 500 МБ
          </p>
        </div>
      )}
    </div>
  );
}
