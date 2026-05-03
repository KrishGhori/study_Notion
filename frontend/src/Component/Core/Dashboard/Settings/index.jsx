import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-[28px] border border-richblack-700 bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-800 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-richblack-400">
            Settings
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-richblack-5 sm:text-4xl">
            Edit your profile and preferences
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-richblack-300 sm:text-base">
            Update your avatar, personal details, password, and account status
            from one focused workspace.
          </p>
        </div>
      </div>

      <div className="space-y-6 rounded-[28px] border border-richblack-700 bg-richblack-900/30 p-4 sm:p-6">
        <ChangeProfilePicture />
        <EditProfile />
        <UpdatePassword />
        <DeleteAccount />
      </div>
    </div>
  )
}