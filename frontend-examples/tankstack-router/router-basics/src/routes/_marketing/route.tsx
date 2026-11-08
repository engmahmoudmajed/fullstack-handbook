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