# Спецификация бэкенда (NestJS)

Документ описывает минимальный бэкенд для Dejavue: **только админ и товары**.

- **Информация о товарах** — PostgreSQL
- **Фотографии товаров** — файловое хранилище на бэке
- **Корзина, заказы, клиенты, категории** — остаются на фронте, на бэке **не нужны**

---

## 1. Объём бэкенда

### Что есть на бэке

| Сущность | Назначение |
|----------|------------|
| **Admin** | Один тип пользователя — управляет каталогом (логин, CRUD товаров, загрузка фото) |
| **Product** | Товар с метаданными и ссылками на фото |

### Чего на бэке нет

- Регистрация / аккаунты покупателей
- Корзина и заказы
- Категории и типы товаров (гели, парфюм и т.д.)
- Отдельная таблица брендов
- Отзывы, остатки на складе, промокоды

Бренды, фильтры и корзина на витрине работают как сейчас — на фронте. Бэк только отдаёт и редактирует каталог.

---

## 2. Модель товара (фронт → бэк)

Текущий тип на фронте (`frontend/src/types/index.ts`):

```typescript
type IProduct = {
  id: number
  name: string
  brand: string
  price: number
  images: string[]
  gender: string
  volume: string
  rating: number
  description: string
  featured: boolean
}
```

### Поля и где используются на витрине

| Поле | Тип | Где на фронте | На бэке |
|------|-----|---------------|---------|
| `id` | `number` | Корзина, ключи React | PK, auto-increment |
| `name` | `string` | Карточка, корзина | `products.name` |
| `brand` | `string` | Карточка, фильтр брендов | `products.brand` (просто строка) |
| `price` | `number` | Карточка, корзина, сортировка | `products.price` (рубли, целое) |
| `images` | `string[]` | Карточка — `images[0]`, корзина | `product_images` + файлы на диске |
| `gender` | `string` | Бейдж, фильтр «Пол» | enum: `male` / `female` / `unisex` |
| `volume` | `string` | «Объём: 100мл», фильтр | `products.volume_ml` → API отдаёт `"100"` |
| `rating` | `number` | Звёзды 1–5, сортировка | `products.rating` |
| `description` | `string` | Пока не показывается | `products.description` (для страницы товара) |
| `featured` | `boolean` | Блок «Избранная коллекция» | `products.featured` |

### Пример товара

```json
{
  "id": 2,
  "name": "Guidance 46",
  "brand": "Amouage",
  "price": 34000,
  "images": [
    "https://api.example.com/static/products/2/27.jpg",
    "https://api.example.com/static/products/2/26.jpg"
  ],
  "gender": "unisex",
  "volume": "100",
  "rating": 5,
  "description": "Guidance 46 от Amouage...",
  "featured": true
}
```

### Фильтры и сортировка (параметры GET /products)

Фронт уже использует эти параметры — бэк должен их поддерживать:

| Параметр | Значения |
|----------|----------|
| `genders[]` | `male`, `female`, `unisex` |
| `brands[]` | lowercase строки брендов |
| `volume` | `all`, `30`, `50`, `75`, `100+` |
| `sortBy` | `default`, `price-asc`, `price-desc`, `rating`, `name` |
| `featured` | `true` — только избранные |
| `page`, `pageSize` | пагинация, по умолчанию `pageSize=16` |

Список брендов для фильтров — `SELECT DISTINCT brand FROM products`, отдельная таблица не нужна.

---

## 3. Админ

Один тип пользователя. Нужен для входа в админку и изменения каталога.

### Таблица `admins`

```sql
CREATE TABLE admins (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Auth

| Метод | Путь | Доступ | Описание |
|-------|------|--------|----------|
| `POST` | `/api/auth/login` | публичный | `{ email, password }` → JWT |
| `GET` | `/api/auth/me` | admin | Текущий админ |

Все `/api/admin/*` — только с JWT (guard `AdminAuthGuard`).

---

## 4. Схема БД (PostgreSQL)

### `products`

```sql
CREATE TYPE gender_enum AS ENUM ('MALE', 'FEMALE', 'UNISEX');

CREATE TABLE products (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(500) NOT NULL,
  brand         VARCHAR(255) NOT NULL,
  price         INTEGER NOT NULL CHECK (price >= 0),
  volume_ml     INTEGER NOT NULL CHECK (volume_ml > 0),
  gender        gender_enum NOT NULL,
  rating        SMALLINT NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  description   TEXT NOT NULL DEFAULT '',
  featured      BOOLEAN NOT NULL DEFAULT FALSE,
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = TRUE;
CREATE INDEX idx_products_gender ON products(gender);
CREATE INDEX idx_products_price ON products(price);
```

### `product_images`

```sql
CREATE TABLE product_images (
  id            SERIAL PRIMARY KEY,
  product_id    INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  file_name     VARCHAR(255) NOT NULL,
  storage_path  VARCHAR(512) NOT NULL,
  sort_order    SMALLINT NOT NULL DEFAULT 0,
  is_primary    BOOLEAN NOT NULL DEFAULT FALSE,
  mime_type     VARCHAR(50),
  size_bytes    INTEGER,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);
```

### Хранение фото

```
PostgreSQL                    File Storage
──────────                    ────────────
products                      /uploads/products/{id}/27.jpg
product_images  ──────────▶   /uploads/products/{id}/26.jpg
  storage_path
  sort_order
  is_primary
```

- В БД — только метаданные
- Файлы — локальный диск или S3/MinIO
- API отдаёт полные URL в массиве `images[]`
- `is_primary = true` + `sort_order = 0` — главное фото (как `images[0]` на фронте)

---

## 5. API endpoints

### Публичные (витрина, без авторизации)

| Метод | Путь | Описание |
|-------|------|----------|
| `GET` | `/api/products` | Каталог: пагинация, фильтры, сортировка |
| `GET` | `/api/products/featured` | Избранные (limit=6) |
| `GET` | `/api/products/:id` | Один товар |
| `GET` | `/api/products/brands` | Уникальные бренды для фильтров |
| `GET` | `/api/static/*` | Раздача файлов изображений |

#### Формат ответа списка (совместим с фронтом)

```json
{
  "data": [ /* ProductResponseDto[] */ ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 16,
      "pageCount": 2,
      "total": 28
    }
  }
}
```

#### GET /api/products/brands

```json
{
  "data": ["amouage", "chanel", "dior", "tom ford"]
}
```

### Админские (JWT required)

| Метод | Путь | Описание |
|-------|------|----------|
| `POST` | `/api/admin/products` | Создать товар |
| `PATCH` | `/api/admin/products/:id` | Обновить товар |
| `DELETE` | `/api/admin/products/:id` | Деактивировать (`is_active = false`) |
| `POST` | `/api/admin/products/:id/images` | Загрузить фото (`multipart/form-data`) |
| `DELETE` | `/api/admin/products/:id/images/:imageId` | Удалить фото |
| `PATCH` | `/api/admin/products/:id/images/reorder` | Изменить порядок фото |

---

## 6. DTO (NestJS)

### ProductResponseDto — ответ для фронта

```typescript
class ProductResponseDto {
  id: number
  name: string
  brand: string
  price: number
  images: string[]       // полные URL, по sort_order
  gender: 'male' | 'female' | 'unisex'
  volume: string         // "100" — строка, как на фронте
  rating: number
  description: string
  featured: boolean
}
```

### QueryProductsDto

```typescript
class QueryProductsDto {
  page?: number = 1
  pageSize?: number = 16
  genders?: ('male' | 'female' | 'unisex')[]
  brands?: string[]
  volume?: 'all' | '30' | '50' | '75' | '100+'
  sortBy?: 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name'
  featured?: boolean
}
```

### CreateProductDto / UpdateProductDto

```typescript
class CreateProductDto {
  name: string
  brand: string
  price: number
  volumeMl: number
  gender: 'male' | 'female' | 'unisex'
  rating?: number
  description?: string
  featured?: boolean
}
```

### LoginDto

```typescript
class LoginDto {
  email: string
  password: string
}
```

---

## 7. Структура NestJS

```
src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts        # POST /auth/login
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   └── guards/admin-auth.guard.ts
├── admin/
│   ├── admin.module.ts
│   └── admin-products.controller.ts   # CRUD + images
├── products/
│   ├── products.module.ts
│   ├── products.controller.ts    # GET /products (публичный)
│   ├── products.service.ts
│   ├── entities/
│   │   ├── product.entity.ts
│   │   └── product-image.entity.ts
│   └── dto/
├── admins/
│   ├── admins.module.ts
│   └── entities/admin.entity.ts
└── storage/
    ├── storage.module.ts
    ├── storage.service.ts        # upload, delete, getPublicUrl
    └── static.controller.ts      # GET /static/*
```

---

## 8. Маппинг мок-данных → БД

Источник: `frontend/src/data/products.ts`

| Мок | БД |
|-----|-----|
| `name` | `products.name` |
| `brand` | `products.brand` |
| `price` | `products.price` |
| `volume` | `products.volume_ml` |
| `"Унисекс"` | `UNISEX` → API: `"unisex"` |
| `"Женский"` | `FEMALE` → API: `"female"` |
| `"Мужской"` | `MALE` → API: `"male"` |
| `rating`, `description`, `featured` | как есть |
| `images[0]` | `product_images`, `is_primary=true`, `sort_order=0` |
| `images[1..n]` | `product_images`, `sort_order=1..n` |

При seed исправить дубликаты id в моках (два товара с `id: 14`).

---

## 9. Интеграция с фронтом

1. `catalogRepository.ts` → HTTP `GET /api/products`
2. Формат `{ data, meta.pagination }` — не менять
3. `useInfiniteProducts` → `?page=N&pageSize=16`
4. `FeaturedProducts` → `GET /api/products/featured`
5. `brands` в `lib/data.ts` → `GET /api/products/brands`
6. URL фото — из `images[]` ответа API, убрать префикс `/parfume`
7. Корзина — по-прежнему localStorage на фронте, бэк не трогаем
8. `gender` — API всегда отдаёт код (`unisex`), не русскую строку

---

## 10. Чеклист

- [ ] PostgreSQL + TypeORM / Prisma
- [ ] Таблицы: `admins`, `products`, `product_images`
- [ ] Seed из `src/data/products.ts`
- [ ] Auth: login + JWT guard
- [ ] Публичный `ProductsController` (read-only)
- [ ] `AdminProductsController` (CRUD + upload)
- [ ] `StorageModule` для фото
- [ ] CORS для фронта
- [ ] Swagger
