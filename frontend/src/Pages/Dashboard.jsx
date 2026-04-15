import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../Component/Core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col items-stretch bg-richblack-900 text-richblack-5 lg:flex-row lg:items-start">
      <Sidebar />
      <div id="dashboard-content-scroll" className="min-h-[calc(100vh-3.5rem)] min-w-0 flex-1 overflow-auto scroll-smooth bg-richblack-900 px-4 sm:px-6 lg:h-[calc(100vh-3.5rem)] lg:px-8">
        <div className="mx-auto w-full max-w-[1000px] py-8 sm:py-10">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard