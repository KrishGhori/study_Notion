const express = require("express");
const router = express.Router();

// Controllers
const { createCourse, getCourseDetails, showAllCourse, editCourse } = require("../controllers/Course");
const { showAllCategorys, createCategory, CategoryPageDetails } = require("../controllers/Category");
const { createSection, deleteSection, updateSection } = require("../controllers/Section");
const { createSubSection, deleteSubSection, updateSubSection } = require("../controllers/SubSection");
const { createrating: createRating, getAllRating, getAverageRating, getReviews } = require("../controllers/RatingAndReview");

// Middleware
const { auth, isInstructor, isStudent, isAdmin } = require("../middelwares/auth");

// Course Routes
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/editCourse", auth, isInstructor, editCourse);
router.post("/getCourseDetails", getCourseDetails);
router.get("/getCourseDetails", getCourseDetails);
router.get("/getAllCourses", showAllCourse);

// Category Routes
router.post("/categories", auth, isAdmin, createCategory);
router.get("/getAllCategories", showAllCategorys);
router.get("/showAllCategories", showAllCategorys);
router.get("/categoryPageDetails", CategoryPageDetails);
router.get("/getCategoryPageDetails", CategoryPageDetails);

// Section Routes
router.post("/addSection", auth, isInstructor, createSection);
router.post("/addSections", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.put("/updateSections", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.delete("/deleteSections", auth, isInstructor, deleteSection);

// SubSection Routes
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.put("/updateSubsections", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.delete("/deleteSubsections", auth, isInstructor, deleteSubSection);

// Rating Routes
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAllRating", getAllRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getReviews);

module.exports = router;