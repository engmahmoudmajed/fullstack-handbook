import { createFileRoute, Link } from '@tanstack/react-router'
import { getInvoice, getTotal } from '../../data/invoices'

export const Route = createFileRoute('/invoices/$invoiceId')({
  component: InvoiceDetails,
})

function InvoiceDetails() {
  const { invoiceId } = Route.useParams()
  const invoice = getInvoice(invoiceId)

  if (!invoice) {
    return <p className="text-red-500">Invoice #{invoiceId} not found.</p>
  }

  return (
    <div className="max-w-2xl rounded-xl bg-white p-6 shadow">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">Invoice #{invoice.id}</h2>
          <p className="text-gray-500">{invoice.client}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            invoice.status === 'paid'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {invoice.status}
        </span>
      </div>

      <p className="mt-4 text-2xl font-semibold">{getTotal(invoice)} EGP</p>

      <Link
        to="/invoices/$invoiceId/print"
        params={{ invoiceId: invoice.id }}
        className="mt-6 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        🖨️ Open print view
      </Link>
    </div>
  )
}