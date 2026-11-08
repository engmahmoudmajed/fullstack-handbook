# Tankstack Router with example 
**you will find example in folder /tankstack-handbook/tankstack-router**
/tankstack-handbook/tankstack-router
[Examples folder]()

## setup
**after install there is diffrent way to setup best and easy way is 1**
1. Tankstack start

## 

### The job of each file

Think of your app as a **restaurant**:

| File | Job | Restaurant analogy |
|---|---|---|
| `routes/__root.tsx` | The outer frame of every page (`<html>`, `<body>`, navbar, CSS, title). Your pages appear inside it. | The **building**: walls, roof, lights. Always there. |
| `routes/index.tsx` | The home page, shown at `/`. | The **entrance hall**: what people see first. |
| `router.tsx` | Creates the router and sets its options (scroll restore, preload, context). | The **manager**: runs the whole system. |
| `routeTree.gen.ts` | A generated list of all your routes. Gives the router the URL map and gives TypeScript the valid paths for `<Link>`. | The **floor plan / menu**: which room is where. |

---

#### Each file in one sentence

**`__root.tsx`**
Wraps every page. Put things here that must appear on **all** pages.

**`index.tsx`**
The page for the URL `/`.

**`router.tsx`**
Takes the route map and builds the router that handles navigation.

**`routeTree.gen.ts`**
Auto-written map of your files → URLs. **You never edit it.** It updates by itself when you add or rename route files.

---

### What each one does when you open `/`

```
router.tsx           → starts the router
routeTree.gen.ts     → tells it: "/" = index.tsx
__root.tsx           → draws the HTML shell
index.tsx            → draws the home page inside the shell
```

---

### Which files do you edit?

| File | Edit it? |
|---|---|
| `__root.tsx` | ✅ Yes (navbar, title, global stuff) |
| `index.tsx` | ✅ Yes (your home page content) |
| `router.tsx` | Rarely (only to change router options) |
| `routeTree.gen.ts` | ❌ Never |



## How to start create routes (Basic or index) route
**in todos folder**

1. Run The Project with your packge npm bun pnpm etc.... run dev script
2. go to routes folder 
3. create folder with name of route and create index.tsx file its automaticly add next code for it 
```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/todos/"!</div>
}
``` 
4. this create route for your app based on folder as you see on const Route 
5. How To make user go this route we use `<Link>` component in any page  we direct him to our route for example in home page index.tsx 
```tsx
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
        <h1 className="text-4xl font-bold">hello and welcome to tankstack</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
      <Link to='/todos' className='text-red-500 underline'>Link for Todos</Link>
    </div>
  )
}
```
6. congrat Now you have first Route for your App 

---
## How to create dybamic route 
**in todos folder**

1. we create file start with $ 
2. example $todoid.tsx - todoid  -> this call param
3. th file we create automaticly have next code 
A $ in the file name means “this part of the URL can be anything”. The router saves it in params.
```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/$todoid')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/todos/$todoid"!</div>
}

```
**code after simple edit**

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/todos/$todoid')({
  component: RouteComponent,
})

function RouteComponent() {
  // we use useparam method to get param todoid 
  const { todoid } = Route.useParams()
  return <div>
    <h1>Page id : {todoid}</h1>
    Hello "/todos/$todoid"!
  </div>
}

```
4.if you go now to for example http://localhost:3000/todos/4
**the page wil render based on param**



---
## Splat / Catch-All Routes
in files folder 
try next in browser after write code
1. http://localhost:3000/files
2. http://localhost:3000/files/h
2. http://localhost:3000/files/anything

The idea in one sentence
A splat route uses $ alone as its name, and it captures everything left in the URL, no matter how many parts there are.

**for example 404 page**
```tsx
// in folder files
// index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/files/$')({
  component: RouteComponent,
})

function RouteComponent() {
  const { _splat } = Route.useParams()

  return <div>Any route you will go under this Route
    will render same page
    <p>{_splat}</p>
  </div>
}


```

```tsx
// in folder files
// $.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/files/$')({
  component: RouteComponent,
})

function RouteComponent() {
  const { _splat } = Route.useParams()

  return <div>Any route you will go under this Route
    will render same page
    <p>{_splat}</p>
  </div>
}

```
---
## Optional Path Parameters
its like mix between splat and dynamic route
Optional Path Parameters
The idea in one sentence
An optional parameter is a URL part that may or may not be there, and the same route handles both cases.

Example: a posts page with an optional category filter

We want one page to handle:
```
/posts          → show ALL posts
/posts/tech     → show only "tech" posts
/posts/design   → show only "design" posts
```
Without an optional param you would need two routes (posts.index.tsx and posts.$category.tsx). Now you need one.

Step 1: Create the file (folder style)
```
src/routes/
├── __root.tsx
├── index.tsx
└── posts/
    └── {-$category}.tsx     → /posts and /posts/tech
```
The flat style from the docs is posts.{-$category}.tsx. It works the same.


**in folder posts**
```tsx
// index.tsx in the root folder
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">hello and welcome to tankstack</h1>
      <p className="mt-4 text-lg">
        Edit <code>src/routes/index.tsx</code> to get started.
      </p>
     {/* example for index and dynamic route*/}
      <div className="flex flex-col gap-2.5 mt-30">
        <Link to="/todos" className="text-red-500 underline">
          Link for Todos
        </Link>
      {/* example for layout*/}
        <Link to="/dashboard" className="text-red-500 underline">
          Link for Dashboard
        </Link>
      </div>
      {/* example for Optional Path Parameters# */}
      <div className="">
        {/* With a category */}
        <Link to="/posts/{-$category}" params={{ category: 'tech' }}>
          Tech posts
        </Link>

        {/* Without a category */}
        <Link to="/posts/{-$category}" params={{ category: undefined }}>
          All posts
        </Link>
      </div>
    </div>
  )
}


```
```tsx
// inside posts folder {-$category}.tsx
// src/routes/posts/{-$category}.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/{-$category}')({
  component: PostsComponent,
})

function PostsComponent() {
  const { category } = Route.useParams()

  return (
    <div>
      <h1>{category ? `Posts in ${category}` : 'All Posts'}</h1>
    </div>
  )
}

```


---
## Layout 

### first way filebased routing for example

**Tree of folders and files in src folder**
```bash
 .
├──  router.tsx
├──  routes
│   ├──  __root.tsx
│   ├──  dashboard
│   │   ├──  index.tsx
│   │   ├──  profile.tsx
│   │   ├──  route.tsx
│   │   └──  settings.tsx
│   ├──  index.tsx
│   └──  todos
│       ├──  $todoid.tsx
│       └──  index.tsx
├──  routeTree.gen.ts
└──  styles.css
```

1. we create normal route with create folder with route name for example **dashboard**
2. and create route.tsx this is layout its render in ever page under it
3. example in dasboard folder 
4. inside route.tsx file we add next code 
5. the index.tsx is default load with page

```tsx
// route.tsx 
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar: always visible */}
      <aside style={{ width: 200, padding: 16, borderRight: '1px solid #ddd' }}>
        <h2>Dashboard</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link to="/dashboard">Overview</Link>
          <Link to="/dashboard/profile">Profile</Link>
          <Link to="/dashboard/settings">Settings</Link>
        </nav>
      </aside>

      {/* Main area: the child page appears here */}
      <main style={{ flex: 1, padding: 16 }}>
        <Outlet />
      </main>
    </div>
  )
}

```

```tsx
// index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/"!</div>
}
```

**others come under /dashboard route.tsx**

```tsx
// dashboard/settings
// settings.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><h3>⚙️ Settings page</h3></div>
}

```

```tsx
// dashboard/profile
// profile.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div> Profile </div>
}
```

---
## Pathless Layout Routes
Pathless Layout Routes
The idea in one sentence
A pathless layout wraps pages in a shared layout (header, footer, sidebar),
**but adds nothing to the URL.**

**we can make it in two way**
**if you now go after make it to http://localhost:3000/about or http://localhost:3000/about  or you find components with same layout**

### 1. folder style
```bash
src/routes/
├── __root.tsx
├── index.tsx                  → /
└── _marketing/
    ├── route.tsx              ← pathless LAYOUT
    ├── about.tsx              → /about
    └── pricing.tsx            → /pricing
```
**Example for code inside _marketing/ folder**

```tsx
// route.tsx file
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketing')({
  component: MarketingLayout,
})

function MarketingLayout() {
  return (
    <div>
      <header style={{ padding: 16, background: '#eef' }}>
        <Link to="/about">About</Link> | <Link to="/pricing">Pricing</Link>
      </header>

      <Outlet />

      <footer style={{ padding: 16, background: '#eee' }}>
        © 2026 My Company
      </footer>
    </div>
  )
}
```
```tsx
// pricing.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketing/pricing')({
  component: () => <h1>Pricing</h1>,
})

```
```tsx
// about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketing/about')({
  component: () => <h1>About us</h1>,
})
```



### 2.file style
```bash
src/routes/
├── __root.tsx
├── index.tsx                  → /
├── _marketing.tsx             ← pathless LAYOUT
├── _marketing.about.tsx       → /about
└── _marketing.pricing.tsx     → /pricing
```

```tsx
**we create 3 files for example**
├── _marketing.tsx             ← pathless LAYOUT
├── _marketing.about.tsx       → /about come under layout
└── _marketing.pricing.tsx     → /pricing ome under layout

//in file _marketing.tsx
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketing')({
  component: MarketingLayout,
})

function MarketingLayout() {
  return (
    <div>
      <header style={{ padding: 16, background: '#eef' }}>
        <Link to="/about">About</Link> | <Link to="/pricing">Pricing</Link>
      </header>

      <Outlet />   {/* about / pricing appears here */}

      <footer style={{ padding: 16, background: '#eee' }}>
        © 2026 My Company
      </footer>
    </div>
  )
}
```
```tsx
// _marketing.about.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketing/about')({
  component: () => <h1>About us</h1>,
})
```
```tsx
//_marketing.pricing.tsx 
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_marketing/pricing')({
  component: () => <h1>Pricing</h1>,
})

```
---
## Non-Nested Routes

The idea in one sentence

Normally a route that starts with posts is rendered inside the posts layout. A trailing underscore (posts_) says: “keep the URL, but don’t render me inside the parent layout.”

The problem it solves

Say your /posts page has a layout with a posts list on the left:

┌──────────────┬─────────────────────┐
│ Posts list   │  Post details       │
│ - Post 1     │  (child page here)  │
│ - Post 2     │                     │
└──────────────┴─────────────────────┘
/posts/123 should show the details inside that layout. ✅ normal nesting.
/posts/123/edit should be a full-screen editor, without the list. ❌ normal nesting would put it inside the layout too.

Non-nested routes fix the second case.



Real use case: an Invoices app
The situation

You’re building a small invoice system. It has three screens:

Screen	URL	What the user needs
Invoice list + details	/invoices, /invoices/42	Sidebar with all invoices, details on the right
Print / PDF view	/invoices/42/print	A clean page: just the invoice, no sidebar, no buttons

The print page’s URL starts with /invoices/42, so by default the router would put it inside the sidebar layout. If the user hits “Print”, the sidebar would be printed on paper too. We don’t want that.

### Example 
Main idea of Non-Nested Routes

Normally, the URL decides the nesting. A page whose URL starts with /invoices goes inside the invoices layout (the sidebar).

A non-nested route breaks that link between the URL and the layout:

Keep the URL, but don’t put the page inside the parent layout.

You do that by adding an underscore after the folder name: invoices_.

Folder	URL	Wrapped by the sidebar?
invoices/$invoiceId.tsx	/invoices/41	✅ yes
invoices_/$invoiceId/print.tsx	/invoices/41/print	❌ no


```bash
src/routes/
├── __root.tsx
├── invoices/
│   ├── route.tsx            ← layout: sidebar with invoice list
│   ├── index.tsx            → /invoices
│   └── $invoiceId.tsx       → /invoices/42
└── invoices_/
    └── $invoiceId/
        └── print.tsx        → /invoices/42/print  (no sidebar)
```
### Example explain
How the Invoices system works
What we are building

An app with 4 screens:

Screen	URL	Purpose
Home	/	Links to try everything
Invoices list	/invoices	Overview: summary + all invoices
Invoice details	/invoices/41	One invoice, next to the sidebar
Print page	/invoices/41/print	Clean paper view, no sidebar
The files and the job of each one
```bash
src/
├── data/
│   └── invoices.ts                      ← the data (not a route)
└── routes/
    ├── __root.tsx                       ← wraps everything
    ├── index.tsx                        ← home page
    ├── invoices/
    │   ├── route.tsx                    ← sidebar layout
    │   ├── index.tsx                    ← overview page
    │   └── $invoiceId.tsx               ← one invoice's details
    └── invoices_/
        └── $invoiceId/
            └── print.tsx                ← print page

```
File	Job
data/invoices.ts	Holds the invoices array and the helpers getInvoice(id) and getTotal(inv). It is not a page. It is outside routes/, so the router ignores it.
__root.tsx	The outermost wrapper. It is always rendered.
index.tsx	Home page. Only has links so you can test the other pages.
invoices/route.tsx	The sidebar. Lists all invoices and has an <Outlet /> on the right side.
invoices/index.tsx	What fills the right side at /invoices: summary cards and invoice cards.
invoices/$invoiceId.tsx	What fills the right side at /invoices/41: the details of invoice 41.
invoices_/$invoiceId/print.tsx	The printable page. It escapes the sidebar.
The key idea: the sidebar is a “frame”

invoices/route.tsx is a frame with a hole in it:
```bash
┌──────────────┬───────────────────────────┐
│  SIDEBAR     │   <Outlet />              │
│  #41 Ahmed   │   ← the hole              │
│  #42 Sara    │   index.tsx OR            │
│              │   $invoiceId.tsx          │
└──────────────┴───────────────────────────┘
```

The sidebar never changes. Only what’s inside the hole changes. That is why clicking between invoices feels instant and the sidebar doesn’t flicker.

What the browser shows for each URL
1. /invoices
```bash
Root
└── invoices/route.tsx          (sidebar)
    └── invoices/index.tsx      (summary + cards)
┌──────────────┬───────────────────────────┐
│  SIDEBAR     │  All Invoices             │
│  #41 Ahmed   │  [Total] [Paid] [Amount]  │
│  #42 Sara    │  [card #41] [card #42]    │
└──────────────┴───────────────────────────┘
```

2. /invoices/41

```bash
Root
└── invoices/route.tsx          (sidebar)
    └── $invoiceId.tsx          (details, invoiceId = "41")
┌──────────────┬───────────────────────────┐
│  SIDEBAR     │  Invoice #41              │
│  #41 ← active│  Ahmed Ali   [paid]       │
│  #42 Sara    │  3500 EGP                 │
│              │  [🖨️ Open print view]     │
└──────────────┴───────────────────────────┘
```
3. /invoices/41/print
```bash
Root
└── invoices_/$invoiceId/print.tsx     (no sidebar!)
┌────────────────────────────────────────┐
│  [← Back]              [🖨️ Print]      │
│  ┌──────────────────────────────────┐  │
│  │ INVOICE #41                      │  │
│  │ items table ... Total 3500 EGP   │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```
Why does the print page have no sidebar?

Look at the folder name: invoices_ with an underscore after it.

invoices/ → pages inside are wrapped by the sidebar.
invoices_/ → same URL start (/invoices/...), but the router treats it as not sharing the invoices layout.

So /invoices/41 and /invoices/41/print look related in the URL, but they live in different branches of the route tree:
```bash
Root
├── invoices (sidebar)
│   ├── index
│   └── $invoiceId
└── print        ← separate branch, no sidebar
```
How the invoice id travels
Follow invoice 42 from click to screen:

In the sidebar:
tsx
   <Link to="/invoices/$invoiceId" params={{ invoiceId: inv.id }}>

Here inv.id is "42", so the URL becomes /invoices/42.

The router matches $invoiceId.tsx and saves { invoiceId: "42" }.
In that page:
tsx
   const { invoiceId } = Route.useParams()   // "42"
   const invoice = getInvoice(invoiceId)      // finds invoice 42 in data
The page shows invoice 42’s client, status, and total.

Same flow for the print page. It reads invoiceId from the URL and calls getInvoice.

What each Link in the app does
Where	Link	Goes to	Why it works
Home	to="/invoices"	overview	Matches the layout + index
Sidebar item	to="/invoices/$invoiceId"	details	Dynamic route with a param
Overview card “View”	to="/invoices/$invoiceId"	details	Same
Overview card “Print”	to="/invoices/$invoiceId/print"	print page	Non-nested route
Details page button	to="/invoices/$invoiceId/print"	print page	Same
Print page “Back”	to="/invoices/$invoiceId"	details	Returns to the sidebar layout

Notice the pattern: to is the pattern with $invoiceId, and the real id goes in params.

What the Print button does
tsx
<button onClick={() => window.print()}>Print</button>
window.print() is plain browser code, not TanStack. It opens the browser’s print dialog.
The Tailwind print:hidden class hides the Back and Print buttons on paper, so only the invoice is printed.
Summary: each concept maps to a real file
Concept you learned	Where it appears in the invoices app
Root route	__root.tsx
Layout route + <Outlet />	invoices/route.tsx (the sidebar)
Index route	invoices/index.tsx (the overview)
Dynamic route ($)	invoices/$invoiceId.tsx
Non-nested route (_ after)	invoices_/$invoiceId/print.tsx

If one specific part is still unclear, tell me which one (for example “how Outlet works” or “why invoices_”), and I’ll go deeper on just that part.

---
## Excluding Files and Folders from Routes

### The idea in one sentence

Every file inside `src/routes/` is treated as a route. If a file or folder name starts with a **dash `-`**, the router **ignores it**, so you can keep helper code right next to the route that uses it.

---

### The problem it solves

You build the invoices page, and it needs a table component, a header, and some helper functions. Where do you put them?

- **In `routes/` without the dash:** the router tries to treat them as pages. That can create routes you didn't want, or warnings.
- **In a far-away folder** (like `src/components/`): it works, but the code is separated from the page that uses it.

With the `-` prefix you can keep them **next to the route** and the router skips them.

---

### Example: invoices with its own components

#### Step 1: Structure

```
src/routes/invoices/
├── route.tsx                    ← layout (route)
├── index.tsx                    ← /invoices (route)
├── $invoiceId.tsx               ← /invoices/41 (route)
├── -data.ts                     ← ignored (helper file)
└── -components/                 ← ignored (whole folder)
    ├── InvoiceCard.tsx
    └── StatusBadge.tsx
```

| Name | Router treats it as |
|---|---|
| `route.tsx`, `index.tsx`, `$invoiceId.tsx` | Routes |
| `-data.ts` | Ignored |
| `-components/` | Ignored, **and everything inside it too** |

#### Step 2: A helper component (`-components/StatusBadge.tsx`)

```tsx
export function StatusBadge({ status }: { status: 'paid' | 'pending' }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        status === 'paid'
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      {status}
    </span>
  )
}
```

This file has no `Route` export. It is a normal React component.

#### Step 3: Another one (`-components/InvoiceCard.tsx`)

```tsx
import { Link } from '@tanstack/react-router'
import { StatusBadge } from './StatusBadge'
import { getTotal, type Invoice } from '../-data'

export function InvoiceCard({ inv }: { inv: Invoice }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <div className="flex justify-between">
        <div>
          <p className="text-lg font-semibold">Invoice #{inv.id}</p>
          <p className="text-sm text-gray-500">{inv.client}</p>
        </div>
        <StatusBadge status={inv.status} />
      </div>

      <p className="mt-3 text-xl font-bold">{getTotal(inv)} EGP</p>

      <Link
        to="/invoices/$invoiceId"
        params={{ invoiceId: inv.id }}
        className="mt-3 inline-block rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        View
      </Link>
    </div>
  )
}
```

#### Step 4: The data file (`-data.ts`)

Move your data here. It is the same content as `src/data/invoices.ts`:

```ts
export type Invoice = {
  id: string
  client: string
  date: string
  status: 'paid' | 'pending'
  items: { name: string; qty: number; price: number }[]
}

export const invoices: Invoice[] = [
  // ... your invoices
]

export const getInvoice = (id: string) => invoices.find((i) => i.id === id)

export const getTotal = (inv: Invoice) =>
  inv.items.reduce((sum, it) => sum + it.qty * it.price, 0)
```

#### Step 5: Import them in a route (`index.tsx`)

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { invoices } from './-data'
import { InvoiceCard } from './-components/InvoiceCard'

export const Route = createFileRoute('/invoices/')({
  component: InvoicesIndex,
})

function InvoicesIndex() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {invoices.map((inv) => (
        <InvoiceCard key={inv.id} inv={inv} />
      ))}
    </div>
  )
}
```

Importing works as normal, and you must **include the dash in the import path**: `'./-data'` and `'./-components/InvoiceCard'`.

---

### What happens in `routeTree.gen.ts`

The ignored files do **not** appear in it. Open the file and search for `InvoiceCard` or `-data`. You won't find them, and that is the proof they are excluded.

---

### Important rules

- **The dash goes at the start of the file or folder name:** `-data.ts`, `-components/`.
- **A dashed folder ignores everything inside it,** even files that don't start with a dash. So `-components/StatusBadge.tsx` is ignored because its folder is.
- **Imports must use the real name with the dash.**
- **Excluded files can't become pages.** Even if you put `createFileRoute` inside one, the router won't register it.

---

### Is the dash required?

No. Keeping helpers outside `routes/` (for example `src/data/` and `src/components/`) also works, and many projects do that. The dash is for when you want the code **colocated** next to the route. Both are valid. Choose one style and stay consistent.

---

### Compare all the special markers you have learned

| Marker | Example | Effect |
|---|---|---|
| `_name` (before) | `_marketing/` | Layout, **invisible in the URL** |
| `name_` (after) | `invoices_/` | Page **escapes** the parent layout |
| `$name` | `$invoiceId` | Dynamic URL part |
| `-name` | `-components/` | **Ignored** by the router |
| `(name)` | `(auth)/` | Folder just for organizing (our next topic) |

---

## Pathless Route Group Directories

### The idea in one sentence

A folder named in **parentheses**, like `(auth)/`, is only for **organizing your files**. It doesn't change the URL, and it doesn't add any layout.

---

### The problem it solves

As your app grows, `routes/` becomes a long, messy list:

```
routes/
├── index.tsx
├── login.tsx
├── register.tsx
├── forgot-password.tsx
├── dashboard.tsx
├── settings.tsx
├── users.tsx
├── about.tsx
└── ...
```

You can't tell which files belong together. With groups, you put related files in a folder, **without changing any URL**.

---

### Example: group the auth pages and the app pages

#### Step 1: Structure

```
src/routes/
├── __root.tsx
├── index.tsx                → /
├── (auth)/
│   ├── login.tsx            → /login
│   └── register.tsx         → /register
└── (app)/
    ├── dashboard.tsx        → /dashboard
    ├── settings.tsx         → /settings
    └── users.tsx            → /users
```

#### Step 2: Write a route inside a group (`(auth)/login.tsx`)

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: () => <h1>Login page</h1>,
})
```

The path is `'/login'`, **not** `'/(auth)/login'`. The group name is not part of the route. If you're unsure, leave the string empty (`createFileRoute('')`) and the dev server fills in the right value.

#### Step 3: Another one (`(auth)/register.tsx`)

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/register')({
  component: () => <h1>Register page</h1>,
})
```

#### Step 4: Link to them normally

```tsx
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
<Link to="/dashboard">Dashboard</Link>
```

No group name in `to`. It behaves as if the folders weren't there.

---

### What renders

| URL | File | Component tree |
|---|---|---|
| `/` | `index.tsx` | Root → Index |
| `/login` | `(auth)/login.tsx` | Root → Login |
| `/register` | `(auth)/register.tsx` | Root → Register |
| `/dashboard` | `(app)/dashboard.tsx` | Root → Dashboard |
| `/settings` | `(app)/settings.tsx` | Root → Settings |
| `/users` | `(app)/users.tsx` | Root → Users |

The `(auth)` and `(app)` folders appear nowhere: not in the URL, and not as a wrapper component.

---

### Group vs pathless layout (the confusing pair)

Both hide the folder name from the URL, but they do different jobs:

| | `(auth)/` group | `_auth/` pathless layout |
|---|---|---|
| Hidden from URL? | ✅ | ✅ |
| Adds a wrapper component? | ❌ **no** | ✅ **yes** (needs `route.tsx` with `<Outlet />`) |
| Purpose | Organizing files | Sharing layout/logic |
| Affects the route tree? | ❌ | ✅ |

Rule of thumb:

> **Parentheses** `(name)` = "just a folder for me".
> **Underscore** `_name` = "an invisible layout the router uses".

---

### Combine both when you need both

You can group files **and** give them a shared layout:

```
src/routes/
├── (auth)/
│   ├── route.tsx            ← ❌ NOT a layout (groups don't have one)
```

Instead, put a pathless layout **inside** the group:

```
src/routes/
└── (marketing)/
    └── _site/
        ├── route.tsx        ← pathless layout (header + footer)
        ├── about.tsx        → /about
        └── pricing.tsx      → /pricing
```

The group `(marketing)` keeps your folders tidy, and `_site/` provides the shared header and footer.

---

### Important rules

- **No URL change, no component change.** Moving a file into or out of a group doesn't affect how the app behaves.
- **URLs must still be unique.** `(auth)/login.tsx` and `(app)/login.tsx` would both claim `/login`, which is a conflict.
- **Don't expect a layout.** A `route.tsx` placed directly in a `(group)/` folder is not a wrapper for the group.
- **Run the dev server** so `routeTree.gen.ts` updates, and restart the TS server if you see red `Link` errors.

---

### Quick summary of everything you've learned

| Name pattern | Effect |
|---|---|
| `route.tsx` in folder | Layout for that folder |
| `index.tsx` | Default page of the folder |
| `$name` | One dynamic URL part |
| `$` alone | Everything left in the URL |
| `{-$name}` | One optional URL part |
| `_name/` | Invisible layout (pathless layout) |
| `name_/` | Escape the parent's layout |
| `-name` | Ignored by the router |
| `(name)/` | Organizing folder only |

---

---

