"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, User, Sliders, Volume2, Gauge, Music, Headphones, ChevronDown, Play } from "lucide-react";
import { useConverterStore } from "@/store/useConverterStore";
import { VOICES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { VoiceOption } from "@/types";

const qualityOptions = [
  { value: "standard", label: "Стандартна", desc: "128 кбіт/с" },
  { value: "high", label: "Висока", desc: "192 кбіт/с" },
  { value: "ultra", label: "Ультра", desc: "320 кбіт/с ✦" },
] as const;

function VoiceCard({
  voice,
  isSelected,
  onSelect,
}: {
  voice: VoiceOption;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full p-3 rounded-xl border text-left transition-all duration-200 group",
        isSelected
          ? "border-brand-500 bg-brand-600/10"
          : "border-[var(--border-color)] hover:border-brand-500/40 hover:bg-[var(--bg-secondary)]"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
            voice.gender === "female"
              ? "bg-gradient-to-br from-pink-500 to-rose-600"
              : "bg-gradient-to-br from-blue-500 to-indigo-600"
          )}
        >
          {voice.gender === "female" ? (
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              {voice.name}
            </span>
            <span className="text-xs px-1.5 py-0.5 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-muted)]">
              {voice.gender === "female" ? "♀" : "♂"}
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] truncate">{voice.language}</p>
        </div>

        {isSelected && (
          <div className="w-5 h-5 rounded-full bg-brand-600 flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}

function SliderControl({
  label,
  icon: Icon,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)]">
          <Icon className="w-3.5 h-3.5 text-brand-600" />
          {label}
        </label>
        <span className="text-xs font-semibold text-brand-600 tabular-nums w-10 text-right">
          {displayValue}
        </span>
      </div>
      <div className="relative h-2 bg-[var(--bg-secondary)] rounded-full">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-brand-600 to-violet-600 rounded-full transition-all duration-150"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-brand-600 shadow-md transition-all duration-150"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  );
}

export function VoiceSettings() {
  const { voiceSettings, setVoiceSettings } = useConverterStore();
  const [filterGender, setFilterGender] = useState<"all" | "female" | "male">("all");
  const [showVoices, setShowVoices] = useState(true);

  const filteredVoices = VOICES.filter(
    (v) => filterGender === "all" || v.gender === filterGender
  );

  const selectedVoice = VOICES.find((v) => v.id === voiceSettings.voiceId);

  return (
    <div className="space-y-6">
      {/* Voice selector */}
      <div className="card-base p-5">
        <button
          onClick={() => setShowVoices(!showVoices)}
          className="w-full flex items-center justify-between mb-4"
        >
          <div className="flex items-center gap-2">
            <Mic className="w-4 h-4 text-brand-600" />
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              Голос озвучення
            </span>
          </div>
          <div className="flex items-center gap-2">
            {selectedVoice && (
              <span className="text-xs text-[var(--text-muted)]">{selectedVoice.name}</span>
            )}
            <ChevronDown
              className={cn(
                "w-4 h-4 text-[var(--text-muted)] transition-transform duration-200",
                showVoices && "rotate-180"
              )}
            />
          </div>
        </button>

        {showVoices && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* Gender filter */}
            <div className="flex gap-1.5 mb-3">
              {(["all", "female", "male"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setFilterGender(g)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                    filterGender === g
                      ? "bg-brand-600 text-white"
                      : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-brand-600/10"
                  )}
                >
                  {g === "all" ? "Всі" : g === "female" ? "♀ Жіночі" : "♂ Чоловічі"}
                </button>
              ))}
            </div>

            {/* Voice grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
              {filteredVoices.map((voice) => (
                <VoiceCard
                  key={voice.id}
                  voice={voice}
                  isSelected={voiceSettings.voiceId === voice.id}
                  onSelect={() => setVoiceSettings({ voiceId: voice.id })}
                />
              ))}
            </div>

            {/* Selected voice info */}
            {selectedVoice && (
              <div className="mt-3 p-3 rounded-xl bg-brand-600/5 border border-brand-600/20">
                <div className="flex items-center gap-2 mb-1">
                  <Headphones className="w-3.5 h-3.5 text-brand-600" />
                  <span className="text-xs font-semibold text-brand-600">
                    {selectedVoice.name} · {selectedVoice.language}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  {selectedVoice.description}
                </p>
                <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                  {selectedVoice.voiceName}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Sound controls */}
      <div className="card-base p-5 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-4 h-4 text-brand-600" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            Налаштування звуку
          </span>
        </div>

        <SliderControl
          label="Швидкість читання"
          icon={Gauge}
          value={voiceSettings.speed}
          min={0.5}
          max={2.0}
          step={0.1}
          displayValue={`${voiceSettings.speed.toFixed(1)}×`}
          onChange={(v) => setVoiceSettings({ speed: v })}
        />

        <SliderControl
          label="Висота голосу"
          icon={Music}
          value={voiceSettings.pitch}
          min={-50}
          max={50}
          step={1}
          displayValue={voiceSettings.pitch === 0 ? "0" : voiceSettings.pitch > 0 ? `+${voiceSettings.pitch}` : `${voiceSettings.pitch}`}
          onChange={(v) => setVoiceSettings({ pitch: v })}
        />

        <SliderControl
          label="Гучність"
          icon={Volume2}
          value={voiceSettings.volume}
          min={10}
          max={100}
          step={5}
          displayValue={`${voiceSettings.volume}%`}
          onChange={(v) => setVoiceSettings({ volume: v })}
        />
      </div>

      {/* Quality selector */}
      <div className="card-base p-5">
        <div className="flex items-center gap-2 mb-3">
          <Headphones className="w-4 h-4 text-brand-600" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            Якість аудіо
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {qualityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setVoiceSettings({ quality: opt.value })}
              className={cn(
                "p-2.5 rounded-xl border text-center transition-all duration-200",
                voiceSettings.quality === opt.value
                  ? "border-brand-500 bg-brand-600/10"
                  : "border-[var(--border-color)] hover:border-brand-500/40"
              )}
            >
              <div className="text-xs font-semibold text-[var(--text-primary)]">
                {opt.label}
              </div>
              <div className="text-xs text-[var(--text-muted)]">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => useConverterStore.getState().resetVoiceSettings()}
        className="w-full text-xs text-[var(--text-muted)] hover:text-brand-600 transition-colors py-1"
      >
        Скинути до стандартних
      </button>
    </div>
  );
}
