import { createFileRoute, Link } from '@tanstack/react-router'
import { getInvoice, getTotal } from '../../../data/invoices'

export const Route = createFileRoute('/invoices_/$invoiceId/print')({
  component: PrintInvoice,
})

function PrintInvoice() {
  const { invoiceId } = Route.useParams()
  const invoice = getInvoice(invoiceId)

  if (!invoice) return <p className="p-8 text-red-500">Invoice not found.</p>

  return (
    <div className="min-h-screen bg-gray-100 p-6 print:bg-white print:p-0">
      {/* Toolbar: hidden when printing */}
      <div className="mx-auto mb-4 flex max-w-3xl justify-between print:hidden">
        <Link
          to="/invoices/$invoiceId"
          params={{ invoiceId }}
          className="rounded-lg border bg-white px-4 py-2 hover:bg-gray-50"
        >
          ← Back
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          🖨️ Print / Save as PDF
        </button>
      </div>

      {/* The paper */}
      <div className="mx-auto max-w-3xl bg-white p-10 shadow print:shadow-none">
        <div className="flex justify-between border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold">INVOICE</h1>
            <p className="text-gray-500">#{invoice.id}</p>
          </div>
          <div className="text-right text-sm text-gray-600">
            <p>My Company</p>
            <p>Cairo, Egypt</p>
            <p>Date: {invoice.date}</p>
          </div>
        </div>

        <div className="py-6">
          <p className="text-sm text-gray-500">Bill to</p>
          <p className="text-lg font-semibold">{invoice.client}</p>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm text-gray-500">
              <th className="py-2">Item</th>
              <th className="py-2 text-right">Qty</th>
              <th className="py-2 text-right">Price</th>
              <th className="py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((it) => (
              <tr key={it.name} className="border-b">
                <td className="py-3">{it.name}</td>
                <td className="py-3 text-right">{it.qty}</td>
                <td className="py-3 text-right">{it.price}</td>
                <td className="py-3 text-right">{it.qty * it.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 flex justify-end">
          <div className="text-right">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-3xl font-bold">{getTotal(invoice)} EGP</p>
          </div>
        </div>
      </div>
    </div>
  )
}