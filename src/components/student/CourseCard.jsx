import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

const CourseCard = ({course}) => {
  const {currency, calculateRating} = useContext(AppContext)
  return (
    <Link to={'/course/' + course._id} onClick={()=>scrollTo(0,0)} 
    className='flex flex-col border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-white group h-full'>
      <div className='relative w-full overflow-hidden aspect-video bg-gray-100'>
        <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' src={course.courseThumbnail} alt="courseThumbnail" />
      </div>
      <div className='p-4 flex flex-col grow'>
        <h3 className='text-base font-semibold text-gray-900 mb-1 line-clamp-2 min-h-10'>{course.courseTitle}</h3>
        <p className='text-sm text-gray-600 mb-2'>
          {course.educator?.name ? `${course.educator.name.firstName} ${course.educator.name.lastName || ''}`.trim() : 'Unknown'}
        </p>
        
        <div className='flex items-center gap-2 mb-2'>
          <p className='text-sm font-bold text-gray-900'>{calculateRating(course)}</p>
          <div className='flex gap-0.5'>
            {[...Array(5)].map((_,i)=>(
              <img className='w-3.5 h-3.5' key={i} src={i<Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} alt='star' />
            ))}
          </div>
          <p className='text-sm text-gray-500'>({course.ratingCount || course.courseRatings?.length || 0})</p>
        </div>
        <p className='text-lg font-bold text-gray-900 mt-auto'>{currency}{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default CourseCard