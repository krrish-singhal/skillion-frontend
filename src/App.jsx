import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from "./pages/student/Home"
import CoursesList from './pages/student/CoursesList'
import CoursesDetails from './pages/student/CoursesDetails'
import Player from './pages/student/Player'
import MyEnrollments from './pages/student/MyEnrollments'
import Loading from './components/student/Loading'
import PaymentSuccess from './pages/student/PaymentSuccess'
import About from './pages/student/About'
import Contact from './pages/student/Contact'
import Privacy from './pages/student/Privacy'
import Terms from './pages/student/Terms'
import SkillTrackerForm from './pages/student/SkillTrackerForm'
import SkillTrackerDashboard from './pages/student/SkillTrackerDashboardNew'
import Badges from './pages/student/Badges'
import BecomeEducator from './pages/student/BecomeEducator'
import Certificate from './pages/student/Certificate'
import MyCertificates from './pages/student/MyCertificates'
import Educator from './pages/educator/Educator'
import AddCourse from './pages/educator/AddCourse'
import EditCourse from './pages/educator/EditCourse'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Dashboard from './pages/educator/Dashboard'
import AdminEducatorApplications from './pages/educator/AdminEducatorApplications'
import Navbar from './components/student/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const App = () => {
  const isEducatorRoute = useMatch('/educator/*');
  
  return (
    <div className='text-default min-h-screen bg-white overflow-x-hidden'>
    {!isEducatorRoute && <Navbar/>}
    <ToastContainer 
      position="top-right" 
      autoClose={3500} 
      hideProgressBar={false} 
      newestOnTop 
      closeOnClick 
      rtl={false} 
      pauseOnFocusLoss={false}
      draggable 
      pauseOnHover 
      theme="light"
      style={{ zIndex: 9999 }}
    />
    <Routes>

    //student routes

      <Route path='/' element={<Home/>}/>
      <Route path='/course-list' element={<CoursesList/>}/>
      <Route path='/course-list/:input' element={<CoursesList/>}/>
      <Route path='/course/:id' element={<CoursesDetails/>}/>
      <Route path='/player/:id' element={<Player/>}/>
      <Route path='/my-enrollments' element={<MyEnrollments/>}/>
      <Route path='/payment-success' element={<PaymentSuccess/>}/>
      <Route path='/loading/:path' element={<Loading/>}/>
      
      {/* Footer Pages */}
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/privacy' element={<Privacy/>}/>
      <Route path='/terms' element={<Terms/>}/>
      
      {/* Skill Tracker Routes */}
      <Route path='/skill-tracker-form' element={<SkillTrackerForm/>}/>
      <Route path='/skill-tracker-dashboard' element={<SkillTrackerDashboard/>}/>
      <Route path='/badges' element={<Badges/>}/>
      
      {/* Educator Application */}
      <Route path='/become-educator' element={<BecomeEducator/>}/>
      
      {/* Certificate Routes */}
      <Route path='/certificates' element={<MyCertificates/>}/>
      <Route path='/certificate/:certificateId' element={<Certificate/>}/>
      
      {/* Footer Learn Links - Redirect to courses */}
      <Route path='/courses' element={<CoursesList/>}/>
      <Route path='/tracks' element={<CoursesList/>}/>
      <Route path='/projects' element={<CoursesList/>}/>
      <Route path='/certification' element={<CoursesList/>}/>



    // educator routes


      <Route path='/educator' element={<Educator/>}>
        <Route index element={<Dashboard/>}/>
        <Route path ='dashboard' element={<Dashboard/>}/>
        <Route path ='add-course' element={<AddCourse/>}/>
        <Route path ='edit-course/:courseId' element={<EditCourse/>}/>
        <Route path ='my-courses' element={<MyCourses/>}/>
        <Route path ='students-enrolled' element ={<StudentsEnrolled/>}/>
        <Route path ='applications' element ={<AdminEducatorApplications/>}/>
      </Route>


      
    </Routes>
    
    </div>
  )
}

export default App