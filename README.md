# With Love ❤️

**RSVP-приглашения на свадьбу нового поколения**

SaaS-платформа: красивые шаблоны → конструктор → публикация → управление гостями.

## Live

| | |
|--|--|
| **Production** | https://with-love-teal.vercel.app |
| **GitHub** | https://github.com/ignatyev335-dotcom/with-love |
| **Demo invite** | https://with-love-teal.vercel.app/ru/invite/aleksandr-ekaterina |

Автодеплой: push в `main` → Vercel production.

## Быстрый старт

```bash
cd with-love
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) — редирект на `/ru`.

## Демо-аккаунты

| Роль | Email | Пароль |
|------|-------|--------|
| Организатор | `anna@example.com` | любой |
| Админ | `admin@withlove.app` | любой |

## Что реализовано

### Маркетинг
- Главная (лендинг по референсу 01): hero, фичи, стили, отзывы, тарифы, FAQ
- Галерея шаблонов (12+ дизайнов)
- Страница тарифов
- i18n: русский + English (`next-intl`)

### Организатор
- Регистрация / вход (локальный store)
- Дашборд: RSVP-статистика, последние ответы, ссылка на приглашение
- Гости: фильтры, статусы, добавление/удаление
- Аналитика RSVP
- **Конструктор**: вкл/выкл блоков, цвета, музыка, предпросмотр, публикация

### Публичное приглашение
- `/ru/invite/aleksandr-ekaterina` — live-сайт для гостей
- Таймер, программа, локация, трансфер, дресс-код
- RSVP-форма, пожелания, FAQ
- Фоновая музыка (play/pause + soft autoplay)

### Админка
- Дашборд метрик, пользователи, платежи, шаблоны, поддержка, аналитика

## Стек

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4**
- **next-intl** (ru/en)
- **Zustand** (persist) — mock backend для MVP
- **Framer Motion**, Lucide icons
- Playfair Display + Inter

## Дизайн-система

| Токен | HEX |
|-------|-----|
| Ivory | `#FAF7F2` |
| Blush | `#F76E62` |
| Gold | `#D4A537` |
| Sage | `#A7B8A1` |
| Charcoal | `#282B2B` |

Референсы: `../WED/` (14 скриншотов).

## Структура

```
src/
  app/[locale]/          # marketing, auth, dashboard, admin, invite
  components/            # UI, landing, invitation, dashboard, admin
  lib/                   # store, seed, utils
  messages/              # ru.json, en.json
  types/
```

## Следующие шаги (production)

1. Supabase (Auth + DB + Realtime + Storage)
2. Drizzle ORM + миграции
3. Stripe Checkout (разовые платежи)
4. Resend (email)
5. Деплой на Vercel

Полное ТЗ — в папке `WED/README (1).md`.

---

*Сделано с любовью к красивым свадьбам.*
