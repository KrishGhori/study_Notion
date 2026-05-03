import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <div className="my-6 flex flex-col gap-5 rounded-[28px] border border-pink-700/60 bg-gradient-to-br from-pink-950 via-pink-900 to-pink-950 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:p-8 lg:flex-row lg:items-start">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700/90 shadow-[0_12px_30px_rgba(236,72,153,0.28)]">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-200/70">
              Danger zone
            </p>
            <h2 className="mt-2 text-lg font-semibold text-richblack-5 sm:text-xl">
              Delete Account
            </h2>
          </div>
          <div className="max-w-2xl space-y-2 text-sm leading-6 text-pink-100/85">
            <p>Would you like to delete your account?</p>
            <p>
              This action is permanent. It removes your account and all related
              data, including enrolled course progress and stored profile
              information.
            </p>
          </div>
          <button
            type="button"
            className="w-fit rounded-full border border-pink-500/40 bg-pink-500/10 px-4 py-2 text-sm font-semibold text-pink-100 transition hover:border-pink-300 hover:bg-pink-500/20"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  )
}