import type { VoiceOption, SupportedLanguage, PricingPlan, FAQ, Testimonial } from "@/types";

export const SUPPORTED_FILE_TYPES = [
  ".txt", ".doc", ".docx", ".pdf", ".rtf", ".odt",
  ".html", ".htm", ".epub", ".fb2", ".mobi", ".azw3",
  ".md", ".csv", ".json", ".xml", ".log", ".srt", ".vtt",
  ".ppt", ".pptx", ".xls", ".xlsx", ".zip",
];

export const SUPPORTED_MIME_TYPES = [
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/rtf",
  "text/rtf",
  "application/vnd.oasis.opendocument.text",
  "text/html",
  "application/epub+zip",
  "application/x-fictionbook+xml",
  "application/x-mobipocket-ebook",
  "application/vnd.amazon.ebook",
  "text/markdown",
  "text/csv",
  "application/json",
  "application/xml",
  "text/xml",
  "text/x-log",
  "application/zip",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const MAX_FILE_SIZE_MB = 500;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const MAX_FILES = 10;

export const VOICES: VoiceOption[] = [
  // Ukrainian female
  {
    id: "polina-uk",
    name: "Поліна",
    gender: "female",
    language: "Українська",
    languageCode: "uk-UA",
    provider: "azure",
    voiceName: "uk-UA-PolinaNeural",
    description: "Тепле, природне українське жіноче звучання",
    accent: "Neutral UA",
  },
  // Ukrainian male
  {
    id: "ostap-uk",
    name: "Остап",
    gender: "male",
    language: "Українська",
    languageCode: "uk-UA",
    provider: "azure",
    voiceName: "uk-UA-OstapNeural",
    description: "Впевнений, чіткий чоловічий голос",
    accent: "Neutral UA",
  },
  // Russian female
  {
    id: "svetlana-ru",
    name: "Світлана",
    gender: "female",
    language: "Русский",
    languageCode: "ru-RU",
    provider: "azure",
    voiceName: "ru-RU-SvetlanaNeural",
    description: "Чистий, виразний жіночий голос",
    accent: "Russian",
  },
  // Russian male
  {
    id: "dmitry-ru",
    name: "Дмитрій",
    gender: "male",
    language: "Русский",
    languageCode: "ru-RU",
    provider: "azure",
    voiceName: "ru-RU-DmitryNeural",
    description: "Глибокий, авторитетний чоловічий голос",
    accent: "Russian",
  },
  // English female (US)
  {
    id: "jenny-en",
    name: "Jenny",
    gender: "female",
    language: "English",
    languageCode: "en-US",
    provider: "azure",
    voiceName: "en-US-JennyNeural",
    description: "Friendly and conversational American female",
    accent: "US",
  },
  // English male (US)
  {
    id: "guy-en",
    name: "Guy",
    gender: "male",
    language: "English",
    languageCode: "en-US",
    provider: "azure",
    voiceName: "en-US-GuyNeural",
    description: "Professional and clear American male",
    accent: "US",
  },
  // English female (UK)
  {
    id: "sonia-en-gb",
    name: "Sonia",
    gender: "female",
    language: "English (UK)",
    languageCode: "en-GB",
    provider: "azure",
    voiceName: "en-GB-SoniaNeural",
    description: "Elegant British female voice",
    accent: "British",
  },
  // Polish female
  {
    id: "zofia-pl",
    name: "Zofia",
    gender: "female",
    language: "Polski",
    languageCode: "pl-PL",
    provider: "azure",
    voiceName: "pl-PL-ZofiaNeural",
    description: "Naturalne polskie brzmienie żeńskie",
    accent: "Polish",
  },
  // German female
  {
    id: "katja-de",
    name: "Katja",
    gender: "female",
    language: "Deutsch",
    languageCode: "de-DE",
    provider: "azure",
    voiceName: "de-DE-KatjaNeural",
    description: "Klare und präzise deutsche Stimme",
    accent: "German",
  },
  // German male
  {
    id: "konrad-de",
    name: "Konrad",
    gender: "male",
    language: "Deutsch",
    languageCode: "de-DE",
    provider: "azure",
    voiceName: "de-DE-ConradNeural",
    description: "Professionelle männliche Stimme",
    accent: "German",
  },
  // French female
  {
    id: "denise-fr",
    name: "Denise",
    gender: "female",
    language: "Français",
    languageCode: "fr-FR",
    provider: "azure",
    voiceName: "fr-FR-DeniseNeural",
    description: "Voix féminine française naturelle",
    accent: "French",
  },
  // Spanish female
  {
    id: "elvira-es",
    name: "Elvira",
    gender: "female",
    language: "Español",
    languageCode: "es-ES",
    provider: "azure",
    voiceName: "es-ES-ElviraNeural",
    description: "Voz femenina española cálida",
    accent: "Spanish",
  },
  // Italian female
  {
    id: "elsa-it",
    name: "Elsa",
    gender: "female",
    language: "Italiano",
    languageCode: "it-IT",
    provider: "azure",
    voiceName: "it-IT-ElsaNeural",
    description: "Voce femminile italiana melodiosa",
    accent: "Italian",
  },
];

export const DEFAULT_VOICE_ID = "polina-uk";

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  { code: "uk", name: "Ukrainian", nativeName: "Українська", flag: "🇺🇦" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "pl", name: "Polish", nativeName: "Polski", flag: "🇵🇱" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "cs", name: "Czech", nativeName: "Čeština", flag: "🇨🇿" },
  { code: "sk", name: "Slovak", nativeName: "Slovenčina", flag: "🇸🇰" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
  { code: "ro", name: "Romanian", nativeName: "Română", flag: "🇷🇴" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱" },
];

export const DEFAULT_VOICE_SETTINGS = {
  voiceId: DEFAULT_VOICE_ID,
  speed: 1.0,
  pitch: 0,
  volume: 100,
  quality: "high" as const,
};

export const WORDS_PER_MINUTE = 150; // avg reading speed for TTS

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Безкоштовний",
    price: { monthly: 0, annual: 0 },
    description: "Ідеально для знайомства з сервісом",
    features: [
      "5 файлів на місяць",
      "До 50 МБ на файл",
      "До 30 хвилин аудіо",
      "MP3 формат",
      "Базові голоси",
      "1 ГБ хмарного сховища",
    ],
    limits: {
      filesPerMonth: 5,
      maxFileSize: 50,
      maxDuration: 30,
      storageGB: 1,
    },
    cta: "Почати безкоштовно",
  },
  {
    id: "premium",
    name: "Premium",
    price: { monthly: 19, annual: 15 },
    description: "Для серйозної роботи з контентом",
    features: [
      "Необмежена кількість файлів",
      "До 500 МБ на файл",
      "Необмежена тривалість аудіо",
      "MP3 у високій якості",
      "Всі голоси + нові",
      "50 ГБ хмарного сховища",
      "Пріоритетна обробка",
      "API доступ",
      "Підтримка 24/7",
    ],
    limits: {
      filesPerMonth: -1,
      maxFileSize: 500,
      maxDuration: -1,
      storageGB: 50,
    },
    popular: true,
    cta: "Спробувати Premium",
  },
];

export const FAQS: FAQ[] = [
  {
    question: "Які формати файлів підтримуються?",
    answer: "VoiceBook AI підтримує понад 25 форматів: TXT, DOC, DOCX, PDF, RTF, ODT, HTML, EPUB, FB2, MOBI, MD, CSV, JSON, XML, PPT, PPTX, XLS, XLSX та ZIP-архіви з текстовими документами.",
  },
  {
    question: "Як відбувається визначення мови?",
    answer: "Система автоматично аналізує текст та визначає мову за допомогою AI-алгоритму. Підтримуються українська, російська, англійська, польська, німецька, французька, іспанська, італійська та інші мови.",
  },
  {
    question: "Який голос найкращий для українського тексту?",
    answer: "Рекомендуємо голос Поліна (uk-UA-PolinaNeural) — це нейромережевий голос від Azure Cognitive Services, спеціально навчений для природного звучання української мови.",
  },
  {
    question: "Як довго обробляється файл?",
    answer: "Час обробки залежить від розміру файлу. Невеликий документ (до 10 сторінок) обробляється за 30-60 секунд. Великі книги (200+ сторінок) можуть займати 5-15 хвилин.",
  },
  {
    question: "Де зберігаються мої файли?",
    answer: "Оригінальні документи та згенеровані аудіофайли зберігаються у захищеному хмарному сховищі. Ви можете видалити їх у будь-який момент з особистого кабінету.",
  },
  {
    question: "Чи можна об'єднати кілька документів в одну аудіокнигу?",
    answer: "Так! Завантажте кілька файлів та увімкніть опцію «Об'єднати в одне аудіо». Система автоматично конвертує їх у єдиний MP3-файл.",
  },
  {
    question: "Яка якість аудіо на виході?",
    answer: "VoiceBook AI використовує нейромережеві TTS-голоси (Neural Text-to-Speech), які звучать максимально природно. Якість аудіо — 192 кбіт/с MP3 для Premium і 128 кбіт/с для безкоштовного плану.",
  },
  {
    question: "Чи є мобільний застосунок?",
    answer: "Наразі VoiceBook AI — це веб-застосунок з повністю адаптивним дизайном. Він чудово працює на смартфонах та планшетах. Нативний мобільний застосунок у розробці.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Оксана Мельник",
    role: "Викладач університету",
    avatar: "О",
    content: "Неймовірно зручний сервіс! Конвертую лекції та навчальні матеріали для студентів з вадами зору. Голос Поліна звучить дуже природно, майже не відрізниш від реального диктора.",
    rating: 5,
  },
  {
    id: "2",
    name: "Максим Коваленко",
    role: "Контент-маркетолог",
    avatar: "М",
    content: "Використовую для створення аудіоверсій статей блогу. Клієнти в захваті! Швидко, якісно, підтримка різних мов. Premium план повністю виправдовує свою ціну.",
    rating: 5,
  },
  {
    id: "3",
    name: "Ірина Сидоренко",
    role: "Письменниця",
    avatar: "І",
    content: "Як письменниця, я використовую VoiceBook AI для перевірки ритму своїх текстів. Дуже зручно слухати власні твори у виконанні якісного TTS. Рекомендую всім авторам!",
    rating: 5,
  },
  {
    id: "4",
    name: "Андрій Петренко",
    role: "Підприємець",
    avatar: "А",
    content: "Конвертую бізнес-документи та звіти для прослуховування під час поїздок. Економлю годинами часу щотижня. Інтерфейс дуже зрозумілий, навіть без інструкцій.",
    rating: 4,
  },
];

export const FEATURES = [
  {
    icon: "FileText",
    title: "25+ форматів файлів",
    description: "PDF, DOCX, EPUB, FB2, MOBI та ще 20+ популярних форматів документів",
    color: "brand",
  },
  {
    icon: "Globe",
    title: "14+ мов",
    description: "Автоматичне визначення мови тексту та озвучення відповідним голосом",
    color: "violet",
  },
  {
    icon: "Mic",
    title: "13 AI-голосів",
    description: "Жіночі та чоловічі нейромережеві голоси найвищої якості",
    color: "brand",
  },
  {
    icon: "Zap",
    title: "Швидка обробка",
    description: "Паралельна обробка великих документів по частинах з відображенням прогресу",
    color: "violet",
  },
  {
    icon: "Download",
    title: "MP3 завантаження",
    description: "Завантажуйте готові аудіофайли у форматі MP3 з онлайн-плеєром",
    color: "brand",
  },
  {
    icon: "History",
    title: "Особистий кабінет",
    description: "Зберігайте, шукайте та повторно завантажуйте всі свої аудіофайли",
    color: "violet",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Головна" },
];
