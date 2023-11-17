# A fullstack React application: Next.js 14 Server Actions, Prisma, TailwindCSS, Stripe, MySQL.

## Key Features

- [x] Auth
- [x] Organizations / Workspaces
- [x] Board creation
- [x] Unsplash API for random beautiful cover images
- [x] Activity log for entire organization
- [x] Board rename and delete
- [x] List creation
- [x] List rename, delete, drag & drop reorder and copy
- [x] Card creation
- [x] Card description, rename, delete, drag & drop reorder and copy
- [x] Card activity log
- [x] Board limit for every organization
- [x] Stripe subscription for each organization to unlock unlimited boards
- [x] Landing page
- [x] MySQL DB
- [x] Prisma ORM
- [x] shadcnUI & TailwindCSS

### Pre-requisites
Node version: 18.x.x

### Clone the repository
```bash
git clone https://github.com/aleksanderpalamar/taskflow.git
```

### Install dependencies
```bash
cd taskflow
npm install
```

### Setup .env
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=

DATABASE_URL=

NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=

STRIPE_API_KEY=

NEXT_PUBLIC_APP_URL=

STRIPE_WEBHOOK_SECRET=
```

### Setup Prisma
I used PlanetScale (MySQL database)

```bash
npx prisma generate
npx prisma push
```

### Run the app
```bash
npm run dev
```