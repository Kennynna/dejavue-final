# Dejavue Parfume Store

Интернет-магазин люксовых духов, переведенный с Next.js на чистый React с Vite.

## Технологии

- **React 19** - UI библиотека
- **Vite** - Сборщик и dev-сервер
- **TypeScript** - Типизация
- **React Router** - Маршрутизация
- **Tailwind CSS v4** - Стилизация
- **Radix UI** - UI компоненты
- **Framer Motion** - Анимации

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Запустите dev-сервер:
```bash
npm run dev
```

3. Откройте браузер по адресу `http://localhost:5173`

## Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist/`.

## Структура проекта

```
src/
├── components/     # React компоненты
│   ├── ui/        # UI компоненты (Radix UI)
│   └── ...
├── pages/         # Страницы приложения
├── lib/           # Утилиты и данные
├── hooks/         # React хуки
├── App.tsx        # Главный компонент с роутингом
└── main.tsx       # Точка входа
```

## Скрипты

- `npm run dev` - Запуск dev-сервера
- `npm run build` - Сборка для продакшена
- `npm run preview` - Предпросмотр собранного приложения
- `npm run lint` - Проверка кода линтером

