import { Outlet } from "react-router-dom"
import Appbar from "./Appbar"



const AccountLayout = () => {

  return (
    <>
      <Appbar />
      <main>
        <div >
        <Outlet />
        </div>
      </main>
    </>
  )
}

export default AccountLayout;