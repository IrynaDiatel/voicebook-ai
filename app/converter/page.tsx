"use client";

import { useEffect, useRef, useState } from "react";
import { SUPPORTED_LANGUAGES, VOICES, DEFAULT_VOICE_ID } from "@/lib/constants";

const FORMATS = [
  "TXT",
  "DOCX",
  "PDF",
  "RTF",
  "EPUB",
  "FB2",
  "ZIP",
  "RAR",
];

export default function ConverterPage() {
const fileInputRef = useRef<HTMLInputElement>(null);

const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [text, setText] = useState("");

const [isSpeaking, setIsSpeaking] = useState(false);
const [browserVoices, setBrowserVoices] = useState<SpeechSynthesisVoice[]>([]);
const [language, setLanguage] = useState("uk");
const [selectedVoiceId, setSelectedVoiceId] = useState(DEFAULT_VOICE_ID);

// Update selected voice when language changes
useEffect(() => {
  const availableVoicesForLang = VOICES.filter(v => v.languageCode.startsWith(language));
  if (availableVoicesForLang.length > 0) {
    setSelectedVoiceId(availableVoicesForLang[0].id);
  }
}, [language]);

const generateAudio = () => {
  if (!text.trim() && !selectedFile) {
    alert("Введіть текст або завантажте документ");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Try to find a matching browser voice (rough mockup for Web Speech API)
  const voiceInfo = VOICES.find(v => v.id === selectedVoiceId);
  const voice = browserVoices.find((v) => v.lang.toLowerCase().startsWith(language)) || browserVoices[0];

  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  }
  
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onstart = () => setIsSpeaking(true);
  utterance.onend = () => setIsSpeaking(false);

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

const previewVoice = () => {
  let previewText = "Привіт. Це демонстрація голосу.";
  if (language === "en") previewText = "Hello. This is a voice preview.";
  if (language === "ru") previewText = "Привет. Это демонстрация голоса.";
  if (language === "pl") previewText = "Cześć. To jest demonstracja głosu.";
  if (language === "de") previewText = "Hallo. Dies ist eine Stimmendemonstration.";
  if (language === "fr") previewText = "Bonjour. Ceci est une démonstration vocale.";
  if (language === "es") previewText = "Hola. Esta es una demostración de voz.";

  const demo = new SpeechSynthesisUtterance(previewText);

  // Try to find a matching browser voice
  const voice = browserVoices.find((v) => v.lang.toLowerCase().startsWith(language)) || browserVoices[0];

  if (voice) {
    demo.voice = voice;
    demo.lang = voice.lang;
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(demo);
};

useEffect(() => {
  const loadVoices = () => setBrowserVoices(window.speechSynthesis.getVoices());
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}, []);

const handleFileChange = async (
e: React.ChangeEvent<HTMLInputElement>
) => {
const file = e.target.files?.[0];


if (!file) return;

setSelectedFile(file);

const extension = file.name.split(".").pop()?.toLowerCase();

if (
  extension &&
  [
    "txt",
    "csv",
    "json",
    "xml",
    "log",
    "srt",
    "vtt",
    "html",
    "htm",
  ].includes(extension)
) {
  const content = await file.text();
  setText(content);
} else {
  setSelectedFile(file);
}
};

return (
  <main className="relative min-h-screen pt-44 pb-24 overflow-hidden">
    {/* Background */}
    <div className="fixed inset-0 bg-gradient-to-br from-[#0f0f1a] via-[#1e1b4b] to-[#2e1065] dark:opacity-100 opacity-95 -z-10" />
    <div className="fixed inset-0 dot-grid opacity-30 -z-10" />

    {/* Decorative orbs */}
    <div className="fixed orb w-96 h-96 bg-brand-600 top-20 -left-32 opacity-20 -z-10" />
    <div className="fixed orb w-80 h-80 bg-violet-600 bottom-20 -right-24 opacity-25 -z-10" />
    <div className="fixed orb w-64 h-64 bg-brand-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 -z-10" />

    <div className="relative z-10 max-w-7xl mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 text-white">
          Конвертація тексту в аудіо
        </h1>


    <p className="text-lg text-gray-400 mb-10">
      Вставте текст, оберіть голос і отримайте якісне аудіо за кілька секунд.
    </p>

    <div className="rounded-2xl border border-white/10 p-6 bg-white/5 backdrop-blur mb-6">
      <label className="block mb-3 font-medium">
        Завантаження файлів
      </label>

      <input
        ref={fileInputRef}
        type="file"
      accept=".txt,.docx,.pdf,.rtf,.epub,.fb2,.md,.zip,.rar"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition cursor-pointer"
      >
        Вибрати файл
      </button>

      {selectedFile && (
        <p className="mt-4 text-violet-400">
          Обрано файл: {selectedFile.name}
        </p>
      )}
     <p className="mt-6 text-sm text-gray-400">
  Підтримуються книги, документи та архіви:
    </p>

     <div className="mt-3 flex flex-wrap gap-2">
  {FORMATS.map((format) => (
    <span
      key={format}
      className="px-3 py-1 text-xs rounded-lg border border-violet-500/30 bg-violet-500/10 text-gray-300"
    >
      {format}
    </span>
  ))}
</div>
    </div>

    <div className="rounded-2xl border border-white/10 p-6 bg-white/5 backdrop-blur">
      <label className="block mb-3 font-medium">
        Текст для озвучування
      </label>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-64 rounded-xl bg-black/20 border border-white/10 p-4 resize-none"
        placeholder="Вставте текст тут..."
      />
<div className="grid md:grid-cols-2 gap-6 mt-6">

  <div>
    <label className="block mb-2 font-medium">
      Мова
    </label>

    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="w-full rounded-xl border border-white/10 bg-[#16182a] text-white p-3 cursor-pointer"
    >
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option
          key={lang.code}
          value={lang.code}
          style={{ backgroundColor: "#16182a", color: "#fff" }}
        >
          {lang.flag} {lang.nativeName}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label className="block mb-2 font-medium">
      Голос
    </label>

    <select
      value={selectedVoiceId}
      onChange={(e) => setSelectedVoiceId(e.target.value)}
      className="w-full rounded-xl border border-white/10 bg-[#16182a] text-white p-3 cursor-pointer"
    >
      {VOICES.filter((v) => v.languageCode.startsWith(language)).length > 0 ? (
        VOICES.filter((v) => v.languageCode.startsWith(language)).map((voice) => (
          <option
            key={voice.id}
            value={voice.id}
            style={{ backgroundColor: "#16182a", color: "#fff" }}
          >
            {voice.name} ({voice.gender === "female" ? "Жіночий" : "Чоловічий"}) - {voice.description}
          </option>
        ))
      ) : (
        <option disabled style={{ backgroundColor: "#16182a", color: "#fff" }}>
          Немає доступних голосів для цієї мови
        </option>
      )}
    </select>

    <button
      type="button"
      onClick={previewVoice}
      className="mt-3 text-sm text-violet-400 hover:text-violet-300 cursor-pointer flex items-center gap-1 transition-colors"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
      Прослухати голос
    </button>
  </div>

  <div className="md:col-span-2">
    <label className="block mb-2 font-medium">
      Якість та формат аудіо
    </label>

    <select className="w-full rounded-xl border border-white/10 bg-[#16182a] text-white p-3 cursor-pointer">
      <option value="mp3-high" style={{ backgroundColor: "#16182a", color: "#fff" }}>MP3 (Висока якість - 192 kbps)</option>
      <option value="mp3-std" style={{ backgroundColor: "#16182a", color: "#fff" }}>MP3 (Стандартна - 128 kbps)</option>
      <option value="wav" style={{ backgroundColor: "#16182a", color: "#fff" }}>WAV (Без втрат)</option>
    </select>
  </div>

</div>

<div className="mt-8 flex flex-wrap gap-4">
  <button
    onClick={generateAudio}
    className="min-w-[180px] px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold cursor-pointer"
  >
    {isSpeaking ? "Відтворюється..." : "Згенерувати аудіо"}
  </button>

  <button
    onClick={() => {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }}
    className="min-w-[180px] px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold cursor-pointer"
  >
    Зупинити
  </button>

  <button
    onClick={() => window.speechSynthesis.pause()}
    className="min-w-[180px] px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold cursor-pointer"
  >
    Пауза
  </button>

  <button
    onClick={() => window.speechSynthesis.resume()}
    className="min-w-[180px] px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold cursor-pointer"
  >
    Продовжити
  </button>
</div>
    </div>
  </div>
</div>
</main>

  );
}
