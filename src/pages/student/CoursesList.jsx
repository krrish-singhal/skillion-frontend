import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import CourseCard from '../../components/student/CourseCard'
import Loading from '../../components/student/Loading'
import Footer from '../../components/student/Footer'

const CoursesList = () => {
  const { allCourses, fetchAllCourses, loading } = useContext(AppContext);

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      <div className="py-16 md:px-40 px-8 flex-1">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">All Courses</h2>
        <p className="text-base text-gray-600 mb-8">
          Explore our complete collection of courses. Master new skills and advance your career.
        </p>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default CoursesList