"use client";

import { useRef, useEffect, useState } from "react";
import {
  Play, Pause, Download, RotateCcw, Volume2, VolumeX,
  Rewind, FastForward, Music2,
} from "lucide-react";
import { cn, formatDuration } from "@/lib/utils";

interface AudioPlayerProps {
  src: string;
  fileName?: string;
  className?: string;
}

export function AudioPlayer({ src, fileName = "audio.mp3", className }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    const onCanPlay = () => setIsLoading(false);
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => setIsLoading(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
    };
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * duration;
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
    setIsMuted(v === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !isMuted;
    setIsMuted(next);
    audio.muted = next;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn("card-base p-5 sm:p-6", className)}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center shadow-brand shrink-0">
          <Music2 className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
            {fileName}
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            {isLoading ? "Завантаження…" : formatDuration(duration)}
          </p>
        </div>
        <a
          href={src}
          download={fileName.endsWith(".mp3") ? fileName : `${fileName}.mp3`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600/10 border border-brand-600/20 text-brand-600 text-xs font-semibold hover:bg-brand-600/20 transition-colors duration-200"
          aria-label="Завантажити MP3"
        >
          <Download className="w-3.5 h-3.5" />
          MP3
        </a>
      </div>

      {/* Waveform bars (decorative) */}
      <div className="flex items-center justify-center gap-0.5 h-10 mb-4">
        {Array(40).fill(null).map((_, i) => {
          const h = 20 + Math.sin(i * 0.5) * 15 + Math.random() * 10;
          const filled = (i / 40) * 100 < progress;
          return (
            <div
              key={i}
              className={cn(
                "w-1 rounded-full transition-colors duration-100",
                filled ? "bg-gradient-to-t from-brand-600 to-violet-500" : "bg-[var(--bg-secondary)]"
              )}
              style={{ height: `${h}px` }}
            />
          );
        })}
      </div>

      {/* Progress bar */}
      <div
        className="relative h-2 bg-[var(--bg-secondary)] rounded-full cursor-pointer mb-3 group"
        onClick={seek}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
        aria-label="Прогрес відтворення"
      >
        <div
          className="h-full bg-gradient-to-r from-brand-600 to-violet-600 rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-brand-600 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ left: `calc(${progress}% - 8px)` }}
        />
      </div>

      {/* Time */}
      <div className="flex justify-between text-xs text-[var(--text-muted)] mb-4 tabular-nums">
        <span>{formatDuration(currentTime)}</span>
        <span>{formatDuration(duration)}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3">
        {/* Volume */}
        <div className="flex items-center gap-2 flex-1">
          <button
            onClick={toggleMute}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-brand-600 hover:bg-brand-600/10 transition-all duration-200"
            aria-label={isMuted ? "Увімкнути звук" : "Вимкнути звук"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={handleVolume}
            className="w-20 accent-brand-600"
            aria-label="Гучність"
          />
        </div>

        {/* Playback */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => skip(-10)}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-brand-600 hover:bg-brand-600/10 transition-all duration-200"
            aria-label="Назад 10 секунд"
          >
            <Rewind className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            disabled={isLoading}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-600 to-violet-600 flex items-center justify-center text-white shadow-brand hover:shadow-brand-lg hover:scale-105 transition-all duration-200 disabled:opacity-60"
            aria-label={isPlaying ? "Пауза" : "Відтворити"}
            id="audio-play-pause-btn"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={() => skip(10)}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-brand-600 hover:bg-brand-600/10 transition-all duration-200"
            aria-label="Вперед 10 секунд"
          >
            <FastForward className="w-4 h-4" />
          </button>
        </div>

        {/* Reset */}
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => {
              if (audioRef.current) audioRef.current.currentTime = 0;
              setIsPlaying(false);
            }}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-brand-600 hover:bg-brand-600/10 transition-all duration-200"
            aria-label="На початок"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
