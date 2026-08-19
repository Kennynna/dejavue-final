# Dejavue

Монорепозиторий интернет-магазина парфюмерии.

```
dejavue/
├── frontend/   # React + Vite (витрина)
├── backend/    # NestJS API (в разработке)
└── docs/       # Спецификации
```

## Быстрый старт

```bash
# из корня репозитория
npm install
npm run dev
```

Фронтенд: http://localhost:5173

## Скрипты (из корня)

| Команда | Описание |
|---------|----------|
| `npm run dev` | Dev-сервер фронтенда |
| `npm run build` | Production-сборка фронтенда |
| `npm run lint` | ESLint фронтенда |
| `npm run preview` | Preview production-сборки |

## Workspaces

- `@dejavue/frontend` — React 19, Vite, Tailwind, PWA
- `@dejavue/backend` — NestJS (пока пустой, см. `docs/product-api-spec.md`)

## Ветки

| Ветка | Назначение |
|-------|------------|
| **`Lending-version`** | Лендинг / витрина → деплой на Vercel |
| **`fullstack`** | Frontend + backend, интеграция с API |

Подробнее: [`docs/BRANCHES.md`](docs/BRANCHES.md)

```bash
git checkout Lending-version   # только витрина
git checkout fullstack         # фулстэк-разработка
```

## Деплой (Vercel)

В настройках проекта указать **Root Directory: `frontend`**.
