import React from 'react'
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {
  const menuItems = [
    {name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    {name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    {name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    {name: 'Student Enrolled ', path: '/educator/students-enrolled', icon: assets.person_tick_icon },
    {name: 'Applications', path: '/educator/applications', icon: assets.person_tick_icon },
  ]
  

  return (
    <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col bg-white shadow-sm">
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === '/educator'}
          className={({ isActive }) =>
            `flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 transition-colors duration-200 ${
              isActive
                ? 'bg-purple-100 border-r-[6px] border-purple-500/90 text-purple-700 font-semibold'
                : 'hover:bg-purple-50 border-r-[6px] border-white hover:border-purple-200 text-gray-700'
            }`
          }
        >
          <img src={item.icon} alt="" className="w-6 h-6" />
          <p className="md:block hidden text-center">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar