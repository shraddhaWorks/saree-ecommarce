## Backend API Reference (Silk Saree Store)

This document describes the backend APIs for the silk saree e‑commerce application.
Use this as a reference when building the frontend.

All endpoints are relative to `http://localhost:3000`.

---

### Environment variables (required)

Defined in `.env.local`:

- **`DATABASE_URL`**: Supabase Postgres pooled URL (used by Prisma)
- **`DIRECT_URL`**: Supabase Postgres direct URL (used by Prisma migrations)
- **`NEXT_PUBLIC_SUPABASE_URL`**: Supabase project URL (public)
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Supabase anon key (public, used in browser)
- **`SUPABASE_SERVICE_ROLE_KEY`**: Supabase service key (secret, server only)

Run:

```bash
npx prisma migrate dev
npm run dev
```

---

### Auth APIs

#### `POST /api/auth/signup`

- **Purpose**: Register a new customer account (Supabase Auth + local `User` row).
- **Body (JSON)**:

```json
{
  "email": "customer@example.com",
  "password": "StrongPassword123",
  "name": "Customer Name"
}
```

- **Success (201)**:

```json
{
  "user": {
    "id": "supabase-user-id",
    "email": "customer@example.com",
    "name": "Customer Name"
  }
}
```

#### `POST /api/auth/signin`

- **Purpose**: Sign in and get access/refresh tokens.
- **Body (JSON)**:

```json
{
  "email": "customer@example.com",
  "password": "StrongPassword123"
}
```

- **Success (200)**:

```json
{
  "accessToken": "jwt-access-token",
  "refreshToken": "refresh-token",
  "user": {
    "id": "supabase-user-id",
    "email": "customer@example.com"
  }
}
```

Store `accessToken` on the client (prefer HTTP‑only cookie) and send it as:

```http
Authorization: Bearer <accessToken>
```

for protected admin routes.

#### `GET /api/me`

- **Purpose**: Get current logged‑in user (used by “Buy Now” to check if account exists).
- **Headers**:
  - `Authorization: Bearer <accessToken>`
- **Success (200)**:

```json
{
  "user": {
    "id": "supabase-user-id",
    "email": "customer@example.com"
  },
  "profile": {
    "id": "supabase-user-id",
    "email": "customer@example.com",
    "name": "Customer Name",
    "role": "CUSTOMER",
    "createdAt": "..."
  }
}
```

- **Not logged in (401)**:

```json
{ "user": null }
```

**Frontend usage for Buy Now**:

1. Call `GET /api/me` with token (if present).
2. If `401`, show Sign In / Sign Up.
3. If `200`, prefill details from `profile` and show checkout.

---

### Category APIs

Categories can be saree types, collections, dress types, etc.

#### `GET /api/categories`

- **Purpose**: Public list of all categories.
- **Success (200)**:

```json
{
  "categories": [
    {
      "id": "uuid",
      "name": "Kanjivaram Silk Sarees",
      "slug": "kanjivaram-silk-sarees",
      "description": "Rich traditional Kanjivaram sarees",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

#### `POST /api/categories` (Admin only)

- **Headers**:
  - `Authorization: Bearer <accessToken>` (user must have `role = "ADMIN"`).
- **Body (JSON)**:

```json
{
  "name": "Kanjivaram Silk Sarees",
  "slug": "kanjivaram-silk-sarees",
  "description": "Rich traditional Kanjivaram sarees"
}
```

#### `GET /api/categories/:id`

- **Purpose**: Get a single category by `id`.

#### `PUT /api/categories/:id` (Admin only)

- **Headers**:
  - `Authorization: Bearer <accessToken>`
- **Body (JSON, all optional)**:

```json
{
  "name": "Updated name",
  "slug": "updated-slug",
  "description": "Updated description"
}
```

#### `DELETE /api/categories/:id` (Admin only)

- **Headers**:
  - `Authorization: Bearer <accessToken>`

---

### Product APIs

Products represent sarees, dresses, special collections, etc.

The `Product` model includes:

- `clothType`: enum (`SILK`, `KANJIVARAM`, `BANARASI`, `TUSSAR`, `ORGANZA`, `COTTON`, `LINEN`, `GEORGETTE`, `CHIFFON`, `OTHER`)
- `occasion`: enum (`WEDDING`, `FESTIVE`, `CASUAL`, `OFFICE`, `BRIDAL`, `PARTY`, `GIFTING`, `OTHER`)
- `isSpecial`: highlight special/featured sarees
- `mainImageUrl`, `thumbnailUrl` and `images[]`: URLs from Supabase Storage

#### `GET /api/products`

- **Purpose**: Public product list with filters.
- **Query params (all optional)**:
  - `category`: category slug, e.g. `kanjivaram-silk-sarees`
  - `clothType`: e.g. `SILK`, `KANJIVARAM`
  - `occasion`: e.g. `WEDDING`, `FESTIVE`
  - `special`: `"true"` to filter `isSpecial = true`
  - `search`: free‑text search on `name` and `description`
  - `limit`: page size (default `20`)
  - `offset`: pagination offset (default `0`)
- **Success (200)**:

```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Red Kanjivaram Silk Saree with Zari Border",
      "slug": "red-kanjivaram-zari-border",
      "priceInPaise": 159900,
      "inStock": true,
      "clothType": "KANJIVARAM",
      "occasion": "WEDDING",
      "isSpecial": true,
      "mainImageUrl": "https://...",
      "thumbnailUrl": "https://...",
      "color": "Red",
      "pattern": "Zari border",
      "blouseIncluded": true,
      "categoryId": "uuid",
      "category": { "...category..." },
      "images": [
        {
          "id": "uuid",
          "url": "https://...",
          "altText": "Front view",
          "position": 0,
          "createdAt": "..."
        }
      ],
      "createdAt": "...",
      "updatedAt": "..."
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 20,
    "offset": 0
  }
}
```

#### `POST /api/products` (Admin only)

- **Headers**:
  - `Authorization: Bearer <accessToken>`
- **Body (JSON)**:

```json
{
  "name": "Peacock Blue Soft Silk Saree",
  "slug": "peacock-blue-soft-silk-saree",
  "description": "Soft silk saree with rich zari pallu.",
  "priceInPaise": 89900,
  "inStock": true,
  "clothType": "SILK",
  "occasion": "FESTIVE",
  "isSpecial": true,
  "mainImageUrl": "https://YOUR_SUPABASE_STORAGE_URL/sarees/peacock-main.jpg",
  "thumbnailUrl": "https://YOUR_SUPABASE_STORAGE_URL/sarees/peacock-thumb.jpg",
  "color": "Peacock blue",
  "pattern": "Zari pallu",
  "blouseIncluded": true,
  "categoryId": "category-uuid",
  "images": [
    {
      "url": "https://YOUR_SUPABASE_STORAGE_URL/sarees/peacock-main.jpg",
      "altText": "Front view",
      "position": 0
    },
    {
      "url": "https://YOUR_SUPABASE_STORAGE_URL/sarees/peacock-pallu.jpg",
      "altText": "Pallu closeup",
      "position": 1
    }
  ]
}
```

#### `GET /api/products/:id`

- **Purpose**: Product detail by `id` (public).
- **Success (200)**:

```json
{
  "product": { "...full product with category and images..." }
}
```

#### `PUT /api/products/:id` (Admin only)

- **Headers**:
  - `Authorization: Bearer <accessToken>`
- **Body (JSON, all optional)**:

```json
{
  "name": "Updated name",
  "slug": "updated-slug",
  "description": "Updated description",
  "priceInPaise": 99900,
  "inStock": false,
  "clothType": "KANJIVARAM",
  "occasion": "WEDDING",
  "isSpecial": false,
  "mainImageUrl": "https://...",
  "thumbnailUrl": "https://...",
  "color": "Maroon",
  "pattern": "Temple border",
  "blouseIncluded": true,
  "categoryId": "another-category-uuid",
  "images": [
    {
      "url": "https://...",
      "altText": "New main view",
      "position": 0
    }
  ]
}
```

Sending `images` replaces existing images for that product.

#### `DELETE /api/products/:id` (Admin only)

- **Headers**:
  - `Authorization: Bearer <accessToken>`

---

### Supabase Storage (images)

- Bucket example: `saree-images`.
- Upload from frontend with Supabase JS client, then pass the resulting public URLs into the product APIs (`mainImageUrl`, `thumbnailUrl`, `images[].url`).

The frontend can now:

- Let **customers** browse categories and products (`GET /api/categories`, `GET /api/products`, `GET /api/products/:id`).
- Implement **Buy Now** using `GET /api/me` and the auth endpoints.
- Let **admins** manage categories/products using the protected POST/PUT/DELETE routes.
