import { RiEditBoxLine } from "react-icons/ri"
import {
  RiCalendar2Line,
  RiInformationLine,
  RiMailLine,
  RiPhoneLine,
  RiShieldStarLine,
  RiUser3Line,
} from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"

const InfoTile = ({ icon, label, value, muted = false }) => {
  const TileIcon = icon

  return (
    <div className="rounded-2xl border border-richblack-700 bg-richblack-900/60 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2 text-richblack-400">
        <TileIcon className="text-lg text-yellow-50" />
        <p className="text-xs font-semibold uppercase tracking-[0.24em]">{label}</p>
      </div>
      <p
        className={`min-w-0 break-words text-sm font-medium ${
          muted ? "text-richblack-400" : "text-richblack-5"
        }`}
      >
        {value}
      </p>
    </div>
  )
}

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  const firstName = user?.firstName || user?.firstname || ""
  const lastName = user?.lastName || user?.lastname || ""
  const fullName = `${firstName || "Your"} ${lastName || "Profile"}`
  const accountType = user?.accountType || "Learner"
  const aboutText = user?.additionalDetails?.about
  const displayDate = formattedDate(user?.additionalDetails?.dateOfBirth)

  return (
    <>
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-richblack-5 sm:text-4xl">
          My Profile
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-richblack-300 sm:text-base">
          Review and update your public identity, contact details, and bio from
          one place.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[28px] border border-richblack-700 bg-gradient-to-br from-richblack-800 via-richblack-900 to-richblack-800 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative mx-auto w-fit sm:mx-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-50 via-yellow-100 to-pink-400 blur-md opacity-30" />
              <img
                src={user?.image}
                alt={`profile-${firstName}`}
                className="relative aspect-square h-28 w-28 rounded-full border-4 border-richblack-700 object-cover shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:h-32 sm:w-32"
              />
            </div>

            <div className="text-center sm:text-left">
              <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-1 rounded-full border border-yellow-100/20 bg-yellow-50/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-50">
                  <RiShieldStarLine className="text-sm" />
                  {accountType}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-richblack-700 bg-richblack-900 px-3 py-1 text-xs font-medium text-richblack-300">
                  <RiUser3Line className="text-sm" />
                  Profile overview
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-richblack-5 sm:text-3xl">
                {fullName}
              </h2>
              <div className="mt-3 flex flex-col gap-2 text-sm text-richblack-300 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
                <span className="inline-flex min-w-0 items-center gap-2 break-all">
                  <RiMailLine className="text-yellow-50" />
                  {user?.email}
                </span>
                <span className="inline-flex min-w-0 items-center gap-2 break-words">
                  <RiPhoneLine className="text-yellow-50" />
                  {user?.additionalDetails?.contactNumber ?? "Add contact number"}
                </span>
              </div>
            </div>
          </div>

          <IconBtn
            text="Edit Profile"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
            customClasses="self-start lg:self-center"
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>

        <div className="relative mt-6 grid gap-4 md:grid-cols-3">
          <InfoTile
            icon={RiShieldStarLine}
            label="Account Type"
            value={accountType}
          />
          <InfoTile
            icon={RiPhoneLine}
            label="Contact"
            value={user?.additionalDetails?.contactNumber ?? "Add contact number"}
            muted={!user?.additionalDetails?.contactNumber}
          />
          <InfoTile
            icon={RiCalendar2Line}
            label="Date of Birth"
            value={displayDate || "Add date of birth"}
            muted={!user?.additionalDetails?.dateOfBirth}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[28px] border border-richblack-700 bg-richblack-800 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-richblack-400">
                About
              </p>
              <h3 className="mt-2 text-lg font-semibold text-richblack-5">
                Tell people a bit about you
              </h3>
            </div>
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings")
              }}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>

          <div className="rounded-2xl border border-richblack-700 bg-richblack-900/70 p-5 text-sm leading-7 text-richblack-300">
            <div className="mb-3 flex items-center gap-2 text-richblack-400">
              <RiInformationLine className="text-lg text-yellow-50" />
              <p className="text-xs font-semibold uppercase tracking-[0.24em]">
                Bio
              </p>
            </div>
            <p className={`${aboutText ? "text-richblack-5" : "text-richblack-400"}`}>
              {aboutText ?? "Write something about yourself to personalize your profile."}
            </p>
          </div>
        </section>

        <section className="rounded-[28px] border border-richblack-700 bg-richblack-800 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)] sm:p-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-richblack-400">
                Personal Details
              </p>
              <h3 className="mt-2 text-lg font-semibold text-richblack-5">
                Your account information
              </h3>
            </div>
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings")
              }}
            >
              <RiEditBoxLine />
            </IconBtn>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoTile icon={RiUser3Line} label="First Name" value={firstName || "Add first name"} muted={!firstName} />
            <InfoTile icon={RiUser3Line} label="Last Name" value={lastName || "Add last name"} muted={!lastName} />
            <InfoTile icon={RiMailLine} label="Email" value={user?.email ?? "Add email"} muted={!user?.email} />
            <InfoTile icon={RiPhoneLine} label="Phone Number" value={user?.additionalDetails?.contactNumber ?? "Add contact number"} muted={!user?.additionalDetails?.contactNumber} />
            <InfoTile icon={RiShieldStarLine} label="Gender" value={user?.additionalDetails?.gender ?? "Add gender"} muted={!user?.additionalDetails?.gender} />
            <InfoTile icon={RiCalendar2Line} label="Date Of Birth" value={displayDate || "Add date of birth"} muted={!user?.additionalDetails?.dateOfBirth} />
          </div>
        </section>
      </div>
    </>
  )
}