import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { invoices, getTotal } from '../../data/invoices'

export const Route = createFileRoute('/invoices/ route')({
  component: InvoicesLayout,
})

function InvoicesLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-72 border-r bg-white p-4">
        <Link to="/invoices" className="mb-4 block text-xl font-bold text-gray-800">
          🧾 Invoices
        </Link>

        <nav className="flex flex-col gap-2">
          {invoices.map((inv) => (
            <Link
              key={inv.id}
              to="/invoices/$invoiceId"
              params={{ invoiceId: inv.id }}
              className="rounded-lg border p-3 transition hover:bg-gray-100"
              activeProps={{ className: 'bg-blue-50 border-blue-400' }}
            >
              <div className="flex justify-between font-medium">
                <span>#{inv.id}</span>
                <span>{getTotal(inv)} EGP</span>
              </div>
              <div className="text-sm text-gray-500">{inv.client}</div>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}