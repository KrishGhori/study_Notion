import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home"
import Navbar from "./Component/common/Nav"
import OpenRoute from "./Component/Core/Auth/OpenRoute"

import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import ForgotPassword from "./Pages/ForgotPassword";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyProfile from "./Component/Core/Dashboard/MyProfile";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./Component/Core/Auth/PrivateRoute";
import Error from "./Pages/Error"
import Settings from "./Component/Core/Dashboard/Settings";
import { useSelector } from "react-redux";
import EnrolledCourses from "./Component/Core/Dashboard/EnrolledCourses";
import Cart from "./Component/Core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./Component/Core/Dashboard/AddCourse";
import MyCourses from "./Component/Core/Dashboard/MyCourses";
import EditCourse from "./Component/Core/Dashboard/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./Component/Core/ViewCourse/VideoDetails";
import Instructor from "./Component/Core/Dashboard/InstructorDashboard/Instructor";

function App() {
  const { user } = useSelector((state) => state.profile)


  return (
  <div className="min-h-screen w-full overflow-x-hidden bg-richblack-900 flex flex-col pt-14 font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="catalog/:catalogName" element={<Catalog/>} />
      <Route path="courses/:courseId" element={<CourseDetails/>} />
      
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  

    <Route
          path="/about"
          element={
            
              <About />
            
          }
        />
    <Route path="/contact" element={<Contact />} />

    <Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route
        path="dashboard"
        element={
          <Navigate
            to={
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
                ? "/dashboard/instructor"
                : "/dashboard/my-profile"
            }
            replace
          />
        }
      />
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      
      <Route path="dashboard/settings" element={<Settings />} />

      <Route path="dashboard/cart" element={<Cart />} />
      <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />

      <Route path="dashboard/instructor" element={<Instructor />} />
      <Route path="dashboard/add-course" element={<AddCourse />} />
      <Route path="dashboard/my-courses" element={<MyCourses />} />
      <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />


    </Route>

    
      <Route element={
        <PrivateRoute>
          <ViewCourse />
        </PrivateRoute>
      }>

      {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>



    <Route path="*" element={<Error />} />


    </Routes>

   </div>
  );
}

export default App;
