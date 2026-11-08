export type Invoice = {
  id: string
  client: string
  date: string
  status: 'paid' | 'pending'
  items: { name: string; qty: number; price: number }[]
}

export const invoices: Invoice[] = [
  {
    id: '41',
    client: 'Ahmed Ali',
    date: '2026-10-01',
    status: 'paid',
    items: [
      { name: 'Website design', qty: 1, price: 3000 },
      { name: 'Logo', qty: 1, price: 500 },
    ],
  },
  {
    id: '42',
    client: 'Sara Hassan',
    date: '2026-10-12',
    status: 'pending',
    items: [
      { name: 'Mobile app', qty: 1, price: 8000 },
      { name: 'Hosting (months)', qty: 6, price: 100 },
    ],
  },
]

export const getInvoice = (id: string) => invoices.find((i) => i.id === id)

export const getTotal = (inv: Invoice) =>
  inv.items.reduce((sum, it) => sum + it.qty * it.price, 0)