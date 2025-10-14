import { Sidebar } from "lucide-react"
import { Outlet } from "react-router-dom"
import Header from "./Header"

const AppLayout = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* <Sidebar/> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Header/> */}
        <div className="flex-1 bg-gray-100 overflow-auto">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AppLayout