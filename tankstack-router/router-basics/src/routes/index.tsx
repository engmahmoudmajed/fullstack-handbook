import { createFileRoute, Link } from '@tanstack/react-router'
import { invoices } from '../data/invoices'

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
        <h2>example for index and dynamic route</h2>
        <Link to="/todos" className="text-red-500 underline">
          Link for Todos
        </Link>
        {/* example for layout*/}
        <h2> example for layout </h2>
        <Link to="/dashboard" className="text-red-500 underline">
          Link for Dashboard
        </Link>
        {/* example for pathless route*/}
        <h2> example for pathless route </h2>
        <Link to="/about" className="text-red-500 underline">
          Link for Dashboard
        </Link>
      </div>

      {/* example for Optional Path Parameters# */}
      <div className="flex flex-col gap-2.5 mt-12">
        <h2>example for Optional Path Parameters#</h2>
        {/* With a category */}
        <Link
          to="/posts/{-$category}"
          params={{ category: 'tech' }}
          className="text-red-500 underline"
        >
          Tech posts
        </Link>

        {/* Without a category */}
        <Link
          to="/posts/{-$category}"
          params={{ category: undefined }}
          className="text-red-500 underline"
        >
          All posts
        </Link>
      </div>

      {/* example for Optional Non-Nested Routes */}
      
      <div className="mt-2 pt-8">
      {/* ... your other examples stay the same ... */}
      <h2>example for Optional Non-Nested Routes Non-Nested Routes</h2>
      {/* Invoices examples */}
      <div className="mt-12 flex flex-col gap-2.5">
        <h2 className="text-xl font-bold">
          Example: layout + index + dynamic + non-nested routes
        </h2>

        {/* Index route inside the layout */}
        <Link to="/invoices" className="text-red-500 underline">
          All invoices (index route)
        </Link>

        {/* Dynamic routes, one link per invoice */}
        {invoices.map((inv) => (
          <div key={inv.id} className="flex gap-4">
            <Link
              to="/invoices/$invoiceId"
              params={{ invoiceId: inv.id }}
              className="text-red-500 underline"
            >
              Invoice #{inv.id} (inside layout)
            </Link>

            {/* Non-nested route, no sidebar */}
            <Link
              to="/invoices/$invoiceId/print"
              params={{ invoiceId: inv.id }}
              className="text-blue-500 underline"
            >
              Print #{inv.id} (no sidebar)
            </Link>
          </div>
        ))}
      </div>
    </div>

    </div>
  )
}
