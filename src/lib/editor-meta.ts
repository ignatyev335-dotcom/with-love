import type { BlockType, ThemeStyle } from "@/types";

export const BLOCK_LABELS: Record<
  BlockType,
  { label: string; labelEn: string; hint: string }
> = {
  hero: {
    label: "Обложка",
    labelEn: "Cover",
    hint: "Фото, имена и дата",
  },
  countdown: {
    label: "Таймер",
    labelEn: "Countdown",
    hint: "Обратный отсчёт",
  },
  story: {
    label: "О нас",
    labelEn: "Our story",
    hint: "История любви",
  },
  rsvp: {
    label: "RSVP форма",
    labelEn: "RSVP form",
    hint: "Подтверждение",
  },
  schedule: {
    label: "Программа",
    labelEn: "Schedule",
    hint: "План дня",
  },
  transfer: {
    label: "Трансфер",
    labelEn: "Transfer",
    hint: "Как добраться",
  },
  location: {
    label: "Карта",
    labelEn: "Location",
    hint: "Адрес и карта",
  },
  wishes: {
    label: "Пожелания",
    labelEn: "Wishes",
    hint: "Гостевая книга",
  },
  dresscode: {
    label: "Дресс-код",
    labelEn: "Dress code",
    hint: "Стиль и цвета",
  },
  faq: {
    label: "FAQ",
    labelEn: "FAQ",
    hint: "Частые вопросы",
  },
  gifts: {
    label: "Подарки",
    labelEn: "Gifts",
    hint: "Пожелания к подаркам",
  },
  music: {
    label: "Музыка",
    labelEn: "Music",
    hint: "Фоновый трек",
  },
  afterparty: {
    label: "После свадьбы",
    labelEn: "After party",
    hint: "After wedding",
  },
  seating: {
    label: "Рассадка",
    labelEn: "Seating",
    hint: "План столов",
  },
  payment: {
    label: "Оплата",
    labelEn: "Payment",
    hint: "Реквизиты",
  },
};

export const THEME_PRESETS: {
  id: ThemeStyle;
  name: string;
  colors: {
    primary: string;
    accent: string;
    background: string;
    text: string;
  };
}[] = [
  {
    id: "classic",
    name: "Классика",
    colors: {
      primary: "#E8A09A",
      accent: "#D4A537",
      background: "#FAF7F2",
      text: "#282B2B",
    },
  },
  {
    id: "minimal",
    name: "Минимализм",
    colors: {
      primary: "#282B2B",
      accent: "#A7B8A1",
      background: "#FFFFFF",
      text: "#282B2B",
    },
  },
  {
    id: "luxury",
    name: "Роскошь",
    colors: {
      primary: "#D4A537",
      accent: "#D4A537",
      background: "#111111",
      text: "#FAF7F2",
    },
  },
  {
    id: "travel",
    name: "Путешествия",
    colors: {
      primary: "#4A90A4",
      accent: "#D4A537",
      background: "#FDF9F3",
      text: "#282B2B",
    },
  },
  {
    id: "botanic",
    name: "Ботаника",
    colors: {
      primary: "#5C6B55",
      accent: "#A7B8A1",
      background: "#E8EDE5",
      text: "#282B2B",
    },
  },
  {
    id: "rustic",
    name: "Рустик",
    colors: {
      primary: "#C98B88",
      accent: "#8B7355",
      background: "#F2EDE6",
      text: "#282B2B",
    },
  },
];

export const COVER_PRESETS = [
  {
    id: "c1",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80",
    label: "Классика",
  },
  {
    id: "c2",
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80",
    label: "Романтика",
  },
  {
    id: "c3",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80",
    label: "Пара",
  },
  {
    id: "c4",
    url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80",
    label: "Церемония",
  },
  {
    id: "c5",
    url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80",
    label: "Сад",
  },
  {
    id: "c6",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    label: "Пляж",
  },
];

export const MUSIC_LIBRARY = [
  {
    id: "m1",
    name: "All of Me — John Legend",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "m2",
    name: "Perfect — soft piano",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "m3",
    name: "A Thousand Years — instrumental",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "m4",
    name: "Canon in D — wedding classic",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
];

export const HEADING_FONTS = [
  "Playfair Display",
  "Cormorant Garamond",
  "Libre Baskerville",
  "Great Vibes",
];

export const BODY_FONTS = ["Inter", "Lato", "Montserrat", "Source Sans 3"];

export const COLOR_SWATCHES = [
  "#E8A09A",
  "#C98B88",
  "#D4A537",
  "#A7B8A1",
  "#4A90A4",
  "#5C6B55",
  "#8B7355",
  "#282B2B",
  "#111111",
  "#FAF7F2",
];

export const SPACING_OPTIONS = [
  { id: "compact", label: "Компактные" },
  { id: "moderate", label: "Умеренные" },
  { id: "airy", label: "Свободные" },
] as const;
