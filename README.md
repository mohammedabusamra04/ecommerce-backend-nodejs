# 🛒 E-Commerce Backend API

A modular **E-Commerce Backend API** built with **Node.js**, **Express**, and **TypeScript**.

The project focuses on practicing backend development concepts such as authentication, user management, product catalogs, categories, variants, and inventory management.

It was built for **learning, practice, and portfolio purposes**, with an emphasis on clean code, modular architecture, API design, and practical backend concepts.
---

## ✨ Features

### 👤 User & Authentication
- **Secure Authentication**: JWT-based access tokens with refresh-token rotation and bcrypt password hashing.
- **Session Lifecycle**: Register, login, refresh, and logout flows with hashed refresh tokens stored in MongoDB.
- **Role Support**: User roles (`customer`, `admin`) ready for permission expansion.
- **Profile Data**: Name, email, phone number, and structured address fields.

### 📦 Catalog Management
- **Categories**: Create and manage categories with optional dynamic attribute definitions (e.g. color, size).
- **Products**: Full CRUD for products linked to categories (brand, description, soft delete).
- **Variants**: Product variants with dynamic attributes, independent price, and stock.
- **Inventory Isolation**: Purchasing one variant (e.g. white) decreases only that variant’s stock — other variants stay untouched.

### 🛠️ Architecture Highlights
- **Modular Domain Layout**: Auth, users, and products separated into clear modules.
- **Layered Design**: Routes → Controllers → Services → Repositories → Models.
- **Dependency Container**: Central wiring for services and repositories.
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
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── response.middleware.ts
│   │   └── validation.middleware.ts
│   ├── modules/
│   │   ├── auth/             # Register, login, refresh, logout
│   │   ├── users/            # User CRUD & profile
│   │   └── products/
│   │       ├── category/     # Category CRUD + dynamic attributes
│   │       ├── product/      # Product CRUD
│   │       └── variant/      # Variant CRUD + stock decrease (test purchase)
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
├── package.json
├── tsconfig.json
└── README.md
```

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
| `POST` | `/refresh` | Issue new access token |
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
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/` | Create category |
| `GET` | `/` | List categories |
| `GET` | `/:id` | Get category by id |
| `PATCH` | `/:id` | Update category |
| `DELETE` | `/:id` | Soft-delete category |

### 📦 Products — `/api/products`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | ✅ | Create product |
| `GET` | `/` | ❌ | List products |
| `GET` | `/:id` | ❌ | Get product by id |
| `PATCH` | `/:id` | ✅ | Update product |
| `DELETE` | `/:id` | ✅ | Soft-delete product |

### 🎨 Variants — `/api/products/:productId/variants` & `/api/variants`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/products/:productId/variants` | ✅ | Create variant for a product |
| `GET` | `/api/products/:productId/variants` | ❌ | List variants of a product |
| `GET` | `/api/variants/:id` | ❌ | Get variant by id |
| `PATCH` | `/api/variants/:id` | ✅ | Update variant |
| `DELETE` | `/api/variants/:id` | ✅ | Soft-delete variant |
| `POST` | `/api/variants/:id/purchase` | ❌ | **Temp test route** — decrease stock for that variant only |

---

## 🧪 Quick Catalog Test Flow

Useful for verifying that inventory is isolated per variant:

1. `POST /api/auth/register` → save `accessToken`
2. `POST /api/categories` → create e.g. `Cars`
3. `POST /api/products` (with Bearer token) → create e.g. `Toyota Corolla 2024`
4. Create two variants (white stock `4`, black stock `10`)
5. `POST /api/variants/<whiteVariantId>/purchase` with `{ "quantity": 1 }`
6. Confirm: white → `3`, black → `10` (unchanged)

Example variant body:
```json
{
  "attributes": { "color": "white" },
  "price": 25000,
  "stock": 4
}
```

---

## 🔒 Security Notes

- Passwords are hashed with **bcrypt** before storage.
- Access tokens are short-lived; refresh tokens are hashed and persisted for revocation.
- Expired or invalid JWTs return a clear `401` response.
- Input validation is applied on auth, users, products, categories, and variants.
- Soft deletes keep catalog history without hard-removing records.

---

## 🔮 Future Improvements

- **Orders Module**: Real checkout flow replacing the temporary purchase test route.
- **Vendor / Seller Roles**: Multi-vendor ownership and product permissions.
- **Payments**: Stripe / PayPal integration for paid orders.
- **Media Uploads**: Product and variant image support.
- **Search & Filters**: Full-text search, brand filters, and attribute-based queries.
- **Rate Limiting & Helmet**: Hardening for public production deployments.
- **Automated Tests**: Integration tests for auth and inventory flows.

---

## 📄 License

This project was built for learning, practice, and portfolio purposes.
