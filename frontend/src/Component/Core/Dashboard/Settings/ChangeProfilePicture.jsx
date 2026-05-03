import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const firstName = user?.firstName || user?.firstname || "user"

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])
  return (
    <>
      <div className="relative overflow-hidden rounded-[28px] border border-richblack-700 bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-800 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative mx-auto w-fit sm:mx-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-50 via-yellow-100 to-pink-400 blur-md opacity-25" />
              <img
                src={previewSource || user?.image}
                alt={`profile-${firstName}`}
                className="relative aspect-square h-24 w-24 rounded-full border-4 border-richblack-700 object-cover shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:h-28 sm:w-28"
              />
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-richblack-400">
                Profile picture
              </p>
              <h2 className="text-lg font-semibold text-richblack-5 sm:text-xl">
                Change your profile picture
              </h2>
              <p className="max-w-xl text-sm leading-6 text-richblack-300">
                Upload a clear photo so your profile feels more personal and easy
                to recognize across the dashboard.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:justify-start">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                type="button"
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-full border border-richblack-600 bg-richblack-700 px-5 py-2.5 text-sm font-semibold text-richblack-50 transition hover:border-yellow-50/40 hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Select
              </button>
              <IconBtn
                text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}
                customClasses="rounded-full"
              >
                {!loading && (
                  <FiUpload className="text-lg text-richblack-900" />
                )}
              </IconBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}