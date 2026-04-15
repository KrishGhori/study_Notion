import React, { useEffect, useState } from 'react'
import Footer from '../Component/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../Component/Core/Catalog/Course_Card';
import CourseSlider from '../Component/Core/Catalog/CourseSlider';
import ReviewSlider from '../Component/common/ReviewSlider';
import { useSelector } from "react-redux"
import Error from "./Error"

const fallbackTemplates = {
  "web-development": {
    name: "Web Development",
    description:
      "Build modern, production-ready websites and web apps with frontend and backend technologies.",
    courses: [
      {
        _id: "webdev-fallback-1",
        thumbnail:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
        courseName: "Modern Web Development Bootcamp",
        instructor: { firstName: "Study", lastName: "Notion" },
        ratingAndReviews: [],
        price: 1999,
      },
      {
        _id: "webdev-fallback-2",
        thumbnail:
          "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop",
        courseName: "React, Node.js and MongoDB Masterclass",
        instructor: { firstName: "Code", lastName: "Mentor" },
        ratingAndReviews: [],
        price: 2499,
      },
      {
        _id: "webdev-fallback-3",
        thumbnail:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        courseName: "Frontend System Design for Developers",
        instructor: { firstName: "UI", lastName: "Architect" },
        ratingAndReviews: [],
        price: 1799,
      },
    ],
  },
  "data-science": {
    name: "Data Science",
    description:
      "Learn to analyze data, build predictive models, and turn raw numbers into decisions.",
    courses: [
      {
        _id: "datasci-fallback-1",
        thumbnail:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        courseName: "Data Science Foundations",
        instructor: { firstName: "Data", lastName: "Mentor" },
        ratingAndReviews: [],
        price: 2299,
      },
      {
        _id: "datasci-fallback-2",
        thumbnail:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        courseName: "Python for Analytics",
        instructor: { firstName: "Python", lastName: "Guide" },
        ratingAndReviews: [],
        price: 1899,
      },
      {
        _id: "datasci-fallback-3",
        thumbnail:
          "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=1200&auto=format&fit=crop",
        courseName: "Machine Learning Essentials",
        instructor: { firstName: "ML", lastName: "Coach" },
        ratingAndReviews: [],
        price: 2999,
      },
    ],
  },
  design: {
    name: "Design",
    description:
      "Develop a sharp eye for visual systems, interfaces, and user experience design.",
    courses: [
      {
        _id: "design-fallback-1",
        thumbnail:
          "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
        courseName: "UI Design Fundamentals",
        instructor: { firstName: "Design", lastName: "Studio" },
        ratingAndReviews: [],
        price: 1599,
      },
      {
        _id: "design-fallback-2",
        thumbnail:
          "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
        courseName: "Figma for Product Teams",
        instructor: { firstName: "Figma", lastName: "Pro" },
        ratingAndReviews: [],
        price: 1799,
      },
      {
        _id: "design-fallback-3",
        thumbnail:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
        courseName: "Branding and Visual Identity",
        instructor: { firstName: "Brand", lastName: "Lab" },
        ratingAndReviews: [],
        price: 1499,
      },
    ],
  },
  business: {
    name: "Business",
    description:
      "Build the skills to launch products, grow teams, and make better business decisions.",
    courses: [
      {
        _id: "business-fallback-1",
        thumbnail:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
        courseName: "Startup Strategy Basics",
        instructor: { firstName: "Biz", lastName: "Coach" },
        ratingAndReviews: [],
        price: 2099,
      },
      {
        _id: "business-fallback-2",
        thumbnail:
          "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
        courseName: "Marketing Fundamentals",
        instructor: { firstName: "Growth", lastName: "Lead" },
        ratingAndReviews: [],
        price: 1699,
      },
      {
        _id: "business-fallback-3",
        thumbnail:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
        courseName: "Product Management Essentials",
        instructor: { firstName: "PM", lastName: "Mentor" },
        ratingAndReviews: [],
        price: 2799,
      },
    ],
  },
}

const humanizeCatalogName = (catalogSlug) => {
  if (!catalogSlug) return "Catalog"
  return catalogSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const createFallbackCatalogData = (catalogSlug) => {
  const template = fallbackTemplates[catalogSlug] || {
    name: humanizeCatalogName(catalogSlug),
    description:
      "Explore curated courses in this category while the live catalog is unavailable.",
    courses: [
      {
        _id: `${catalogSlug || "catalog"}-fallback-1`,
        thumbnail:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
        courseName: `${humanizeCatalogName(catalogSlug)} Fundamentals`,
        instructor: { firstName: "Study", lastName: "Notion" },
        ratingAndReviews: [],
        price: 1499,
      },
      {
        _id: `${catalogSlug || "catalog"}-fallback-2`,
        thumbnail:
          "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
        courseName: `${humanizeCatalogName(catalogSlug)} Essentials`,
        instructor: { firstName: "Course", lastName: "Guide" },
        ratingAndReviews: [],
        price: 1799,
      },
      {
        _id: `${catalogSlug || "catalog"}-fallback-3`,
        thumbnail:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
        courseName: `${humanizeCatalogName(catalogSlug)} Practical Projects`,
        instructor: { firstName: "Learning", lastName: "Lab" },
        ratingAndReviews: [],
        price: 2199,
      },
    ],
  }

  return {
    success: true,
    data: {
      selectedCategory: {
        name: template.name,
        description: template.description,
        courses: template.courses,
      },
      differentCategory: {
        name: "Popular Categories",
        courses: template.courses,
      },
      mostSellingCourses: template.courses,
    },
  }
}

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [categoryResolved, setCategoryResolved] = useState(false);

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            try {
              const res = await apiConnector("GET", categories.CATEGORIES_API);
              const matchedCategory = res?.data?.data?.find(
                (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
              );
              setCategoryId(matchedCategory?._id || "");
            } catch (error) {
              console.log("CATEGORY LIST API ERROR....", error)
              setCategoryId("");
            } finally {
              setCategoryResolved(true);
            }
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
              setCatalogPageData({ success: false })
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    const resolvedCatalogData = catalogPageData?.success
      ? catalogPageData
      : createFallbackCatalogData(catalogName)

    if (loading || !categoryResolved || (categoryId && !resolvedCatalogData)) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!resolvedCatalogData?.success) {
        return <Error />
      }
    
      return (
        <>
          {/* Hero Section */}
          <div className="box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[220px] max-w-maxContentTab flex-col justify-center gap-4 py-10 lg:min-h-[260px] lg:max-w-maxContent lg:py-16 ">
              <p className="text-xs text-richblack-300 sm:text-sm">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {resolvedCatalogData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-2xl font-semibold text-richblack-5 sm:text-3xl lg:text-4xl">
                {resolvedCatalogData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-sm text-richblack-200 sm:text-base">
                {resolvedCatalogData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-10 lg:max-w-maxContent lg:py-12">
            <div className="section_heading text-2xl sm:text-3xl">Courses to get you started</div>
            <div className="my-4 flex gap-2 overflow-x-auto border-b border-b-richblack-600 text-sm sm:gap-0">
              <p
                className={`whitespace-nowrap px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`whitespace-nowrap px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={resolvedCatalogData?.data?.selectedCategory?.courses}
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-10 lg:max-w-maxContent lg:py-12">
            <div className="section_heading text-2xl sm:text-3xl">
              Top courses in {resolvedCatalogData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={resolvedCatalogData?.data?.differentCategory?.courses}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-10 lg:max-w-maxContent lg:py-12">
            <div className="section_heading text-2xl sm:text-3xl">Reviews from other learners</div>
            <div className="py-8">
              <ReviewSlider />
            </div>
          </div>
    
          <Footer />
        </>
      )
    }
    
    export default Catalog