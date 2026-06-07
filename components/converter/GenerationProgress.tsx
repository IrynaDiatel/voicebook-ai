"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, XCircle, FileAudio, ChevronDown } from "lucide-react";
import { useConverterStore } from "@/store/useConverterStore";
import { cn, formatDuration } from "@/lib/utils";
import type { AudioJob } from "@/types";

function JobItem({ job }: { job: AudioJob }) {
  const { updateJob, removeJob, setActiveJobId } = useConverterStore();

  const statusColors: Record<AudioJob["status"], string> = {
    queued: "text-yellow-600 bg-yellow-500/10 border-yellow-500/20",
    processing: "text-blue-600 bg-blue-500/10 border-blue-500/20",
    completed: "text-green-600 bg-green-500/10 border-green-500/20",
    failed: "text-red-600 bg-red-500/10 border-red-500/20",
  };

  const statusLabels: Record<AudioJob["status"], string> = {
    queued: "В черзі",
    processing: "Генерація…",
    completed: "Готово",
    failed: "Помилка",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="card-base p-4"
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center shrink-0">
          {job.status === "processing" ? (
            <Loader2 className="w-5 h-5 text-white animate-spin" />
          ) : job.status === "completed" ? (
            <CheckCircle className="w-5 h-5 text-white" />
          ) : job.status === "failed" ? (
            <XCircle className="w-5 h-5 text-white" />
          ) : (
            <FileAudio className="w-5 h-5 text-white" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
              {job.fileName}
            </p>
            <span
              className={cn(
                "text-xs px-2 py-0.5 rounded-full border shrink-0",
                statusColors[job.status]
              )}
            >
              {statusLabels[job.status]}
            </span>
          </div>

          {/* Progress bar */}
          {job.status === "processing" && (
            <div className="mt-2 space-y-1">
              <div className="h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-600 to-violet-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${job.progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex justify-between text-xs text-[var(--text-muted)]">
                <span>
                  Частина {job.processedChunks} / {job.totalChunks}
                </span>
                <span>{job.progress}%</span>
              </div>
            </div>
          )}

          {/* Completed info */}
          {job.status === "completed" && job.audioUrl && (
            <div className="mt-2 flex items-center gap-3">
              {job.audioDuration && (
                <span className="text-xs text-[var(--text-muted)]">
                  ⏱ {formatDuration(job.audioDuration)}
                </span>
              )}
              <button
                onClick={() => setActiveJobId(job.id)}
                className="text-xs text-brand-600 hover:underline"
              >
                Відкрити плеєр
              </button>
              <a
                href={job.audioUrl}
                download={`${job.fileName}.mp3`}
                className="text-xs text-brand-600 hover:underline"
              >
                Завантажити MP3
              </a>
            </div>
          )}

          {/* Error */}
          {job.status === "failed" && job.error && (
            <p className="mt-1 text-xs text-red-500">{job.error}</p>
          )}
        </div>

        <button
          onClick={() => removeJob(job.id)}
          className="p-1 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 transition-all duration-200 shrink-0"
          aria-label="Видалити завдання"
        >
          <XCircle className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

export function GenerationProgress() {
  const { jobs } = useConverterStore();

  const activeJobs = jobs.filter(
    (j) => j.status === "queued" || j.status === "processing"
  );
  const recentJobs = jobs.filter(
    (j) => j.status === "completed" || j.status === "failed"
  ).slice(0, 5);

  if (jobs.length === 0) return null;

  return (
    <div className="space-y-4">
      {activeJobs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Loader2 className="w-4 h-4 text-brand-600 animate-spin" />
            Обробка ({activeJobs.length})
          </h3>
          <div className="space-y-2">
            <AnimatePresence>
              {activeJobs.map((job) => (
                <JobItem key={job.id} job={job} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {recentJobs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
            Нещодавні результати
          </h3>
          <div className="space-y-2">
            <AnimatePresence>
              {recentJobs.map((job) => (
                <JobItem key={job.id} job={job} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
