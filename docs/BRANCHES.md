# Ветки репозитория

Чтобы не путаться: **лендинг** и **фулстэк** — разные ветки с разными задачами.

## Схема

```
Lending-version  ──►  только витрина (frontend), деплой на Vercel
       │
       │  (общая база — монорепо)
       ▼
fullstack        ──►  frontend + backend (NestJS), интеграция с API
```

## `Lending-version` — лендинг / витрина

**Для чего:** продакшен-магазин на Vercel, правки UI, контент, карточки.

**Что менять:**
- `frontend/` — да
- `backend/` — нет (не трогать)
- `docs/product-api-spec.md` — только читать как референс

**Деплой:** Vercel → ветка `Lending-version` → Root Directory: `frontend`

**Запуск локально:**
```bash
git checkout Lending-version
npm install
npm run dev
```

---

## `fullstack` — фулстэк

**Для чего:** разработка NestJS-бэка, подключение фронта к API, админка.

**Что менять:**
- `frontend/` — да (когда нужна интеграция с API)
- `backend/` — да
- `docs/` — да

**Деплой:** Vercel пока остаётся на `Lending-version`. Бэк — отдельный хостинг позже.

**Запуск локально:**
```bash
git checkout fullstack
npm install
npm run dev              # фронт
# позже: npm run dev:backend
```

---

## Теги (точки возврата)

| Тег | Описание |
|-----|----------|
| `v0-before-monorepo` | Старый формат: фронт в корне репо |
| `v1.0-frontend-only` | Монорепо, рабочий фронт без бэка |

```bash
git checkout v1.0-frontend-only   # откат к стабильному фронту
git checkout v0-before-monorepo   # откат к структуре до монорепо
```

---

## Как переносить изменения между ветками

**Только UI-фикс с fullstack → на лендинг:**
```bash
git checkout Lending-version
git cherry-pick <commit-hash>   # один коммит с frontend-правкой
```

**Или merge frontend-изменений:**
```bash
git checkout Lending-version
git merge fullstack --no-commit
# оставить только frontend/, отменить backend/ если попали лишние файлы
```

**Правило:** в `Lending-version` не мержить коммиты, которые ломают витрину без бэка.

---

## Быстрая шпаргалка

| Вопрос | Ответ |
|--------|--------|
| Где править карточки товара? | `Lending-version` |
| Где писать NestJS? | `fullstack` |
| Куда смотрит Vercel? | `Lending-version` |
| Где монорепо? | Обе ветки (папки `frontend/` + `backend/`) |
