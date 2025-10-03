import { Outlet } from "react-router"


const AdminLayout = () => {
  return (
    <div>
        <h1>AdminLayout</h1>
        <Outlet />
    </div>
  )
}

export default AdminLayout