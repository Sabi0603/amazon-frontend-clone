import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'

function AppLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="w-full flex-1">
        <Outlet />
      </main>
      <footer aria-label="Site footer placeholder" />
    </div>
  )
}

export default AppLayout
