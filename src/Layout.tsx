import Header from './components/Header';
import { Outlet } from "react-router-dom"
const Layout = () => {

  return (
    <>
      <Header />
      <main>
        {/* We want route specific content to show up in this position */}
        <Outlet />
      </main>
    </>
  )
}
export default Layout;