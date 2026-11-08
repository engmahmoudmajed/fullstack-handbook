import { createFileRoute, Link } from '@tanstack/react-router'
import { invoices, getTotal } from '../../data/invoices'

export const Route = createFileRoute('/invoices/')({
  component: InvoicesIndex,
})

function InvoicesIndex() {
  const totalAll = invoices.reduce((sum, inv) => sum + getTotal(inv), 0)
  const paidCount = invoices.filter((i) => i.status === 'paid').length

  return (
    <div>
      <h2 className="text-2xl font-bold">All Invoices</h2>

      {/* Summary cards */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Total invoices</p>
          <p className="text-2xl font-bold">{invoices.length}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Paid</p>
          <p className="text-2xl font-bold text-green-600">{paidCount}</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-sm text-gray-500">Total amount</p>
          <p className="text-2xl font-bold">{totalAll} EGP</p>
        </div>
      </div>

      {/* Invoice cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {invoices.map((inv) => (
          <div key={inv.id} className="rounded-xl bg-white p-5 shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-lg font-semibold">Invoice #{inv.id}</p>
                <p className="text-sm text-gray-500">{inv.client}</p>
                <p className="text-xs text-gray-400">{inv.date}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  inv.status === 'paid'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {inv.status}
              </span>
            </div>

            <p className="mt-3 text-xl font-bold">{getTotal(inv)} EGP</p>

            <div className="mt-4 flex gap-2">
              <Link
                to="/invoices/$invoiceId"
                params={{ invoiceId: inv.id }}
                className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
              >
                View
              </Link>
              <Link
                to="/invoices/$invoiceId/print"
                params={{ invoiceId: inv.id }}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
              >
                🖨️ Print
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}