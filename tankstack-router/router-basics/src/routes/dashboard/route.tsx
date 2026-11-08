import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar: always visible */}
      <aside style={{ width: 200, padding: 16, borderRight: '1px solid #ddd' }}>
        <h2 className='p-4 m-3'>Dashboard</h2>
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