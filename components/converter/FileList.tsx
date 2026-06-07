"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, X, CheckCircle, Loader2, AlertCircle,
  Eye, Clock, AlignLeft, BookOpen, Globe,
} from "lucide-react";
import { useConverterStore } from "@/store/useConverterStore";
import { cn, formatBytes, formatDuration, getLanguageName, truncate } from "@/lib/utils";
import type { FileInfo } from "@/types";

function FileStatusBadge({ status }: { status: FileInfo["status"] }) {
  if (status === "pending") return (
    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
      <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
      В черзі
    </span>
  );
  if (status === "extracting") return (
    <span className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
      <Loader2 className="w-3 h-3 animate-spin" />
      Витягування тексту…
    </span>
  );
  if (status === "ready") return (
    <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
      <CheckCircle className="w-3 h-3" />
      Готовий
    </span>
  );
  return (
    <span className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
      <AlertCircle className="w-3 h-3" />
      Помилка
    </span>
  );
}

function FileIcon({ name }: { name: string }) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  const colorMap: Record<string, string> = {
    pdf: "from-red-500 to-red-600",
    docx: "from-blue-500 to-blue-600",
    doc: "from-blue-500 to-blue-600",
    epub: "from-green-500 to-green-600",
    fb2: "from-orange-500 to-orange-600",
    txt: "from-gray-500 to-gray-600",
    md: "from-purple-500 to-purple-600",
    html: "from-amber-500 to-amber-600",
  };
  const color = colorMap[ext] ?? "from-brand-600 to-violet-600";

  return (
    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
      <FileText className="w-5 h-5 text-white" />
    </div>
  );
}

export function FileList() {
  const { files, removeFile, setPreviewFileId, setShowPreview } = useConverterStore();

  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
          Завантажені файли ({files.length})
        </h3>
        <button
          onClick={() => useConverterStore.getState().clearFiles()}
          className="text-xs text-[var(--text-muted)] hover:text-red-500 transition-colors"
        >
          Очистити все
        </button>
      </div>

      <AnimatePresence initial={false}>
        {files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, x: -20, height: 0 }}
            transition={{ duration: 0.25 }}
            className="card-base overflow-hidden"
          >
            <div className="p-4">
              {/* Header row */}
              <div className="flex items-start gap-3">
                <FileIcon name={file.name} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)] truncate max-w-[200px] sm:max-w-xs">
                        {file.name}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {formatBytes(file.size)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <FileStatusBadge status={file.status} />
                      <button
                        onClick={() => removeFile(file.id)}
                        className="p-1 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-all duration-200"
                        aria-label={`Видалити ${file.name}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Extraction progress */}
                  {file.status === "extracting" && (
                    <div className="mt-2 h-1 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-600 to-violet-600 rounded-full shimmer w-2/3" />
                    </div>
                  )}

                  {/* File metadata */}
                  {file.status === "ready" && file.wordCount && (
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                        <AlignLeft className="w-3 h-3" />
                        {file.wordCount.toLocaleString("uk-UA")} слів
                      </div>
                      {file.pageCount && (
                        <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                          <BookOpen className="w-3 h-3" />
                          ~{file.pageCount} стор.
                        </div>
                      )}
                      {file.estimatedDuration && (
                        <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                          <Clock className="w-3 h-3" />
                          ~{formatDuration(file.estimatedDuration)}
                        </div>
                      )}
                      {file.language && (
                        <div className="flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400">
                          <Globe className="w-3 h-3" />
                          {getLanguageName(file.language)}
                        </div>
                      )}
                      <button
                        onClick={() => {
                          setPreviewFileId(file.id);
                          setShowPreview(true);
                        }}
                        className="flex items-center gap-1 text-xs text-brand-600 hover:underline"
                      >
                        <Eye className="w-3 h-3" />
                        Перегляд
                      </button>
                    </div>
                  )}

                  {/* Error message */}
                  {file.status === "error" && file.error && (
                    <p className="mt-1.5 text-xs text-red-500">{file.error}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
