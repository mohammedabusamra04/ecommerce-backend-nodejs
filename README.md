# 🛒 E-Commerce Backend API

A modular **E-Commerce Backend API** built with **Node.js**, **Express**, and **TypeScript**.

The project focuses on practicing backend development concepts such as authentication, user management, product catalogs, categories, variants, inventory management, and a shopping cart.

It was built for **learning, practice, and portfolio purposes**, with an emphasis on clean code, modular architecture, API design, and practical backend concepts.

---

## ✨ Features

### 👤 User & Authentication
- **Secure Authentication**: JWT-based access tokens with refresh-token rotation and bcrypt password hashing.
- **Session Lifecycle**: Register, login, refresh, and logout flows with hashed refresh tokens stored in MongoDB.
- **Role Support**: User roles (`customer`, `admin`) ready for permission expansion.
- **Profile Data**: Name, email, unique phone number, and structured address fields (city, street, country).

### 📦 Catalog Management
- **Categories**: Create and manage categories, each with optional dynamic attribute definitions (`text`, `number`, `select`) used to describe product variants (e.g. color, size).
- **Products**: Full CRUD for products linked to a category, addressable by unique `slug` or `sku`, with brand, description, and soft delete.
- **Variants**: Product variants with dynamic attributes (key/value map), independent price and stock, addressable by unique `sku`.
- **Inventory Isolation**: Purchasing one variant (e.g. white) decreases only that variant's stock — other variants stay untouched.

### 🛍️ Cart
- **Per-user Cart**: One cart per authenticated user, keyed by variant SKU.
- **Add or Update**: Adding an existing variant to the cart updates its quantity instead of duplicating the line item.

### 🛠️ Architecture Highlights
- **Modular Domain Layout**: `auth`, `users`, `categories`, `products`, `variants`, and `carts` separated into clear modules.
- **Layered Design**: Routes → Controllers → Services → Repositories → Models.
- **Dependency Container**: Central wiring for services and repositories (`config/container.ts`).
- **Consistent API Responses**: Unified success/error response format via middleware.
- **Request Validation**: `express-validator` schemas on critical endpoints.
- **Operational Errors**: Typed `AppError` helpers (`badRequest`, `unauthorized`, `forbidden`, `notFound`, `conflict`).

---

## 🛠️ Tech Stack

### Backend
| Layer | Technology |
|--------|------------|
| Runtime | Node.js (v20+) |
| Language | TypeScript |
| Framework | Express.js (v5) |
| ODM | Mongoose |
| Database | MongoDB |
| Auth | JSON Web Tokens (`jsonwebtoken`) |
| Security | bcrypt password hashing |
| Validation | express-validator |
| HTTP Status | http-status-codes |

---

## 📁 Project Structure

```text
ecommerce-backend-nodejs/
├── src/
│   ├── config/
│   │   ├── container.ts      # DI container (services & repositories)
│   │   ├── database.ts       # MongoDB connection
│   │   ├── env.ts            # Environment variable loading
│   │   └── jwt.ts            # Access / refresh token configuration
│   ├── middlewares/
│   │   ├── auth.middleware.ts       # JWT access-token verification
│   │   ├── error.middleware.ts      # Centralized error handler
│   │   ├── response.middleware.ts   # Unified res.success() formatter
│   │   └── validation.middleware.ts # express-validator runner
│   ├── modules/
│   │   ├── auth/              # Register, login, refresh, logout
│   │   ├── users/              # User CRUD & profile
│   │   ├── categories/         # Category CRUD + dynamic attributes
│   │   ├── products/           # Product CRUD (slug / sku based)
│   │   ├── variants/           # Variant CRUD + purchase (stock decrease)
│   │   └── carts/              # Per-user cart (add / update items)
│   ├── routes/
│   │   └── index.ts          # Central API router
│   ├── types/
│   │   └── express.d.ts      # Express Request/Response extensions
│   ├── utils/
│   │   ├── AppError.ts
│   │   ├── bcrypt.ts
│   │   └── jwt.ts
│   ├── app.ts                # Express app setup
│   └── server.ts             # Server bootstrap
├── .env.example
├── Ecommerce API.postman_collection.json  # Ready-to-import Postman collection
├── package.json
├── tsconfig.json
└── README.md
```

Each module follows the same internal layering:
`*.routes.ts` → `*.controller.ts` → `*.service.ts` → `*.repository.ts` → `*.model.ts`, plus `*.dto.ts` and `*.validation.ts`.

---

## 🚀 Getting Started

### 📋 Prerequisites
- Node.js **v20** or higher
- npm (bundled with Node.js)
- MongoDB running locally or a remote MongoDB URI

### 🔧 Installation

**1. Clone the repository**
```bash
git clone https://github.com/mohammedabusamra04/ecommerce-backend-nodejs.git
cd ecommerce-backend-nodejs
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure environment variables**
```bash
cp .env.example .env
```

Open `.env` and fill in your values:
```env
PORT=3000
NODE_ENV=development

MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=30d
```

---

## 💻 Running Locally

**Development mode** (hot reload with `tsx`):
```bash
npm run dev
```

**Type-check**:
```bash
npm run typecheck
```

**Build & start production**:
```bash
npm run build
npm start
```

API base URL: `http://localhost:3000/api`

A ready-to-import **Postman collection** (`Ecommerce API.postman_collection.json`) is included at the repo root to exercise all endpoints quickly.

---

## 🧪 API Overview

All requests and responses use **JSON**. Protected routes require:
```http
Authorization: Bearer <accessToken>
```

### 🔑 Authentication — `/api/auth`
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Create account & receive tokens |
| `POST` | `/login` | Login & receive tokens |
| `POST` | `/refresh` | Issue new access token from refresh token |
| `POST` | `/logout` | Revoke refresh token |

### 👥 Users — `/api/users`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | ❌ | Create user |
| `GET` | `/` | ✅ | List users |
| `GET` | `/:id` | ✅ | Get user by id |
| `PATCH` | `/:id` | ✅ | Update user |
| `DELETE` | `/:id` | ✅ | Delete user |

### 🏷️ Categories — `/api/categories`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | ✅ | Create category |
| `GET` | `/` | ❌ | List categories |
| `GET` | `/slug/:slug` | ❌ | Get category by slug |
| `PATCH` | `/slug/:slug` | ✅ | Update category by slug |
| `DELETE` | `/slug/:slug` | ✅ | Soft-delete category by slug |

### 📦 Products — `/api/products`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | ✅ | Create product |
| `GET` | `/` | ❌ | List products |
| `GET` | `/sku/:sku` | ❌ | Get product by SKU |
| `GET` | `/slug/:slug` | ❌ | Get product by slug |
| `PATCH` | `/sku/:sku` | ✅ | Update product by SKU |
| `PATCH` | `/slug/:slug` | ✅ | Update product by slug |
| `DELETE` | `/sku/:sku` | ✅ | Soft-delete product by SKU |
| `DELETE` | `/slug/:slug` | ✅ | Soft-delete product by slug |

### 🎨 Variants — nested under products & `/api/variants/sku`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/products/:slug/variants` | ✅ | Create a variant for a product |
| `GET` | `/api/products/:slug/variants` | ❌ | List variants of a product |
| `GET` | `/api/variants/sku/:sku` | ❌ | Get variant by SKU |
| `PATCH` | `/api/variants/sku/:sku` | ✅ | Update variant by SKU |
| `DELETE` | `/api/variants/sku/:sku` | ✅ | Soft-delete variant by SKU |
| `POST` | `/api/variants/sku/:sku/purchase` | ❌ | Decrease stock for that variant only |

### 🛍️ Cart — `/api/cart`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | ✅ | Add a variant (by SKU) to the current user's cart, or update its quantity if it's already present |

---

## 🧪 Quick Catalog Test Flow

Useful for verifying that inventory is isolated per variant:

1. `POST /api/auth/register` → save `accessToken`
2. `POST /api/categories` → create e.g. `Cars`
3. `POST /api/products` (with Bearer token) → create e.g. `Toyota Corolla 2024`
4. Create two variants under `/api/products/:slug/variants` (white stock `4`, black stock `10`)
5. `POST /api/variants/sku/<whiteVariantSku>/purchase` with `{ "quantity": 1 }`
6. Confirm: white → `3`, black → `10` (unchanged)

Example variant body:
```json
{
  "sku": "TOYCOR-WHT",
  "attributes": { "color": "white" },
  "price": 25000,
  "stock": 4
}
```

Example cart body:
```json
{
  "variantSku": "TOYCOR-WHT",
  "quantity": 1
}
```

---

## 🔒 Security Notes

- Passwords are hashed with **bcrypt** before storage and never returned in API responses.
- Access tokens are short-lived; refresh tokens are hashed and persisted for revocation.
- Expired or invalid JWTs return a clear `401` response via `authMiddleware`.
- Input validation is applied on auth, users, categories, products, variants, and cart endpoints.
- Soft deletes (`deletedAt`) keep catalog history for categories, products, and variants without hard-removing records.

---

## 🔮 Future Improvements

- **Orders Module**: Real checkout flow replacing the temporary purchase test route.
- **Cart Enhancements**: Remove/clear cart items, quantity validation against live stock.
- **Vendor / Seller Roles**: Multi-vendor ownership and product permissions.
- **Payments**: Stripe / PayPal integration for paid orders.
- **Media Uploads**: Product and variant image support.
- **Search & Filters**: Full-text search, brand filters, and attribute-based queries.
- **Rate Limiting & Helmet**: Hardening for public production deployments.
- **Automated Tests**: Integration tests for auth, catalog, and cart flows.

---

## 📄 License

This project was built for learning, practice, and portfolio purposes.
