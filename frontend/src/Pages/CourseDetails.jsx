import { useEffect, useMemo, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { MdOutlinePeopleAlt } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

import CourseAccordionBar from "../Component/Core/Course/CourseAccordionBar"
import CourseDetailsCard from "../Component/Core/Course/CourseDetailsCard"
import ConfirmationModal from "../Component/common/ConfirmationModal"
import RatingStars from "../Component/common/RatingStars"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import { formattedDate } from "../utils/dateFormatter"

const getFirstAvailable = (...values) => values.find((value) => value !== undefined && value !== null)

const normalizeCourseDetails = (raw) => {
  const source = Array.isArray(raw) ? raw[0] : raw
  if (!source) return null

  const normalizedCourseContent = (source.courseContent || []).map((section) => ({
    ...section,
    subSection: section?.subSection || section?.SubSection || [],
  }))

  const studentsEnrolled =
    getFirstAvailable(source.studentsEnrolled, source.studentsEnroled, source.studentEnrolled) || []
  const ratingAndReviews =
    getFirstAvailable(source.ratingAndReviews, source.ratingAndReviwes) || []
  const instructions = getFirstAvailable(source.instructions, source.instruction) || []

  return {
    ...source,
    studentsEnrolled,
    ratingAndReviews,
    instructions,
    courseContent: normalizedCourseContent,
    instructor: {
      ...source.instructor,
      firstName: source?.instructor?.firstName || source?.instructor?.firstname || "Instructor",
      lastName: source?.instructor?.lastName || source?.instructor?.lastname || "",
    },
    categoryName: source?.Category?.name || source?.category?.name || "General",
  }
}

const formatTotalDuration = (courseContent = []) => {
  const totalSeconds = courseContent.reduce((sum, section) => {
    const sectionSeconds = (section?.subSection || []).reduce((acc, lecture) => {
      const duration = Number(lecture?.timeDuration || 0)
      return acc + (Number.isNaN(duration) ? 0 : duration)
    }, 0)
    return sum + sectionSeconds
  }, 0)

  if (!totalSeconds) return "0m total length"

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  if (hours > 0) return `${hours}h ${minutes}m total length`
  return `${minutes}m total length`
}

const createFallbackCourseById = (courseId) => {
  if (!courseId || !courseId.includes("-fallback-")) return null

  const slug = courseId.split("-fallback-")[0]

  const templates = {
    webdev: {
      courseName: "Modern Web Development Bootcamp",
      courseDescription: "Build production-ready websites with modern frontend and backend workflows.",
      whatYouWillLearn: "HTML, CSS, JavaScript, React, Node.js, APIs, and deployment fundamentals.",
      price: 1999,
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
      categoryName: "Web Development",
    },
    python: {
      courseName: "Python Programming for Beginners",
      courseDescription: "Start from Python basics and build practical mini projects quickly.",
      whatYouWillLearn: "Core Python, data structures, file handling, and beginner automation projects.",
      price: 799,
      thumbnail:
        "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1200&auto=format&fit=crop",
      categoryName: "Python",
    },
    appdev: {
      courseName: "App Development Masterclass",
      courseDescription: "Learn to create performant mobile apps with clean architecture patterns.",
      whatYouWillLearn: "UI components, API integration, state management, and publishing flow.",
      price: 1799,
      thumbnail:
        "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=1200&auto=format&fit=crop",
      categoryName: "App Development",
    },
  }

  const template = templates[slug] || {
    courseName: "Course Details",
    courseDescription: "This is a temporary fallback course preview while live data is unavailable.",
    whatYouWillLearn: "Core concepts and practical implementation with guided examples.",
    price: 1499,
    thumbnail:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
    categoryName: "Catalog",
  }

  return {
    _id: courseId,
    ...template,
    studentsEnrolled: [],
    ratingAndReviews: [],
    instructions: [
      "8 hours on-demand video",
      "Full lifetime access",
      "Access on mobile and TV",
      "Certificate of completion",
    ],
    instructor: {
      firstName: "Study",
      lastName: "Notion",
      additionalDetails: {
        about: "Experienced instructor with practical, project-based teaching.",
      },
    },
    createdAt: new Date().toISOString(),
    courseContent: [
      {
        _id: `${courseId}-sec-1`,
        sectionName: "Introduction",
        subSection: [
          { _id: `${courseId}-lec-1`, title: "Welcome", timeDuration: "900" },
          { _id: `${courseId}-lec-2`, title: "Setup", timeDuration: "1200" },
        ],
      },
    ],
  }
}

const createFallbackCourseFromClickedData = (courseId, clickedCourse) => {
  if (!clickedCourse) return null

  return {
    _id: courseId,
    courseName: clickedCourse?.courseName || "Course Details",
    courseDescription:
      clickedCourse?.courseDescription ||
      "This is a temporary fallback course preview while live data is unavailable.",
    whatYouWillLearn:
      clickedCourse?.whatYouWillLearn ||
      "Core concepts and practical implementation with guided examples.",
    price: clickedCourse?.price || 0,
    thumbnail: clickedCourse?.thumbnail,
    categoryName: clickedCourse?.category?.name || "Catalog",
    studentsEnrolled: [],
    ratingAndReviews: clickedCourse?.ratingAndReviews || [],
    instructions: [
      "8 hours on-demand video",
      "Full lifetime access",
      "Access on mobile and TV",
      "Certificate of completion",
    ],
    instructor: {
      firstName:
        clickedCourse?.instructor?.firstName ||
        clickedCourse?.instructor?.firstname ||
        "Study",
      lastName:
        clickedCourse?.instructor?.lastName ||
        clickedCourse?.instructor?.lastname ||
        "Notion",
      additionalDetails: {
        about: "Experienced instructor with practical, project-based teaching.",
      },
    },
    createdAt: new Date().toISOString(),
    courseContent: [
      {
        _id: `${courseId}-sec-1`,
        sectionName: "Introduction",
        subSection: [
          { _id: `${courseId}-lec-1`, title: "Welcome", timeDuration: "900" },
          { _id: `${courseId}-lec-2`, title: "Setup", timeDuration: "1200" },
        ],
      },
    ],
  }
}

const CourseDetails = () => {
  const { courseId } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { user, loading } = useSelector((state) => state.profile)

  const [responseData, setResponseData] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isActive, setIsActive] = useState([])

  useEffect(() => {
    const getCourseFullDetails = async () => {
      const clickedCourse = location?.state?.clickedCourse

      if (courseId?.includes("-fallback-") && clickedCourse?._id === courseId) {
        setResponseData({
          success: true,
          data: createFallbackCourseFromClickedData(courseId, clickedCourse),
        })
      }

      const res = await fetchCourseDetails(courseId)
      if (res?.success) {
        setResponseData(res)
        return
      }

      const clickedFallback = createFallbackCourseFromClickedData(
        courseId,
        location?.state?.clickedCourse
      )
      if (clickedFallback) {
        setResponseData({ success: true, data: clickedFallback })
        return
      }

      const fallbackCourse = createFallbackCourseById(courseId)
      if (fallbackCourse) {
        setResponseData({ success: true, data: fallbackCourse })
      }
    }

    getCourseFullDetails()
  }, [courseId, location?.state])

  const courseData = useMemo(
    () => normalizeCourseDetails(responseData?.data),
    [responseData]
  )

  const totalLectures = useMemo(
    () =>
      (courseData?.courseContent || []).reduce(
        (acc, curr) => acc + (curr?.subSection?.length || 0),
        0
      ),
    [courseData]
  )

  const avgReviewCount = useMemo(
    () => GetAvgRating(courseData?.ratingAndReviews || []),
    [courseData]
  )

  const handleActive = (id) => {
    setIsActive((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    )
  }

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseData?._id], user, navigate, dispatch, [courseData])
      return
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to purchase this course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (loading || !courseData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  const createdOn = courseData?.createdAt ? formattedDate(courseData?.createdAt) : null

  return (
    <>
      <section className="bg-richblack-800 px-4 py-10 lg:py-14">
        <div className="mx-auto flex w-full max-w-maxContent flex-col gap-10 lg:flex-row">
          <div className="flex-1 space-y-5">
            <p className="text-sm text-richblack-300">
              <Link to="/" className="hover:text-richblack-100">
                Home
              </Link>{" "}
              /{" "}
              <span className="text-richblack-200">Catalog</span> /{" "}
              <span className="text-yellow-25">{courseData?.categoryName}</span>
            </p>

            <h1 className="text-3xl font-semibold text-richblack-5 sm:text-4xl">
              {courseData?.courseName}
            </h1>

            <p className="text-lg text-richblack-200">{courseData?.courseDescription}</p>

            <div className="flex flex-wrap items-center gap-3 text-richblack-200">
              <span className="text-2xl font-semibold text-yellow-25">{avgReviewCount}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span>({courseData?.ratingAndReviews?.length || 0} ratings)</span>
              <span>{courseData?.studentsEnrolled?.length || 0} students</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-richblack-100">
              <p>
                Created by{" "}
                <span className="font-semibold text-yellow-50">
                  {courseData?.instructor?.firstName} {courseData?.instructor?.lastName}
                </span>
              </p>
              <p className="flex items-center gap-1">
                <BiInfoCircle />
                Created {createdOn && createdOn !== "Invalid Date" ? createdOn : "recently"}
              </p>
              <p className="flex items-center gap-1">
                <HiOutlineGlobeAlt />
                English
              </p>
            </div>
          </div>

          <div className="w-full lg:max-w-[420px]">
            <CourseDetailsCard
              course={courseData}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-maxContent px-4 py-10">
        <div className="mb-10 rounded-md border border-richblack-600 bg-richblack-900 p-6">
          <h2 className="text-3xl font-semibold text-richblack-5">What you'll learn</h2>
          <p className="mt-5 text-lg text-richblack-50">{courseData?.whatYouWillLearn}</p>
        </div>

        <div className="mb-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-3xl font-semibold text-richblack-5">Course content</h2>
            <p className="text-richblack-200">
              {courseData?.courseContent?.length || 0} sections • {totalLectures} lectures •{" "}
              {formatTotalDuration(courseData?.courseContent)}
            </p>
          </div>

          <button
            className="mb-6 font-semibold text-yellow-50"
            onClick={() => setIsActive((courseData?.courseContent || []).map((sec) => sec._id))}
          >
            Collapse all sections
          </button>

          <div className="space-y-4">
            {(courseData?.courseContent || []).map((course) => (
              <CourseAccordionBar
                key={course._id}
                course={course}
                isActive={isActive}
                handleActive={handleActive}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-3xl font-semibold text-richblack-5">Author</h2>
          <div className="flex items-start gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-pink-200 text-3xl font-semibold text-white">
              <MdOutlinePeopleAlt />
            </div>
            <div>
              <p className="text-2xl font-semibold text-richblack-5">
                {courseData?.instructor?.firstName} {courseData?.instructor?.lastName}
              </p>
              <p className="mt-2 text-richblack-200">
                {courseData?.instructor?.additionalDetails?.about ||
                  "Experienced instructor with practical, project-based teaching."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CourseDetails
