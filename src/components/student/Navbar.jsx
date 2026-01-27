import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { UserButton, useClerk, useUser } from '@clerk/clerk-react';
import SearchBar from './SearchBar';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import SmartAssistant from '../SmartAssistant';


const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user, isSignedIn } = useUser();
  const { navigate, isEducator, setIsEducator, setLoading, backendUrl, authorizedPost } = useContext(AppContext);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Show toast on sign in
  useEffect(() => {
    if (isSignedIn && user) {
      const hasShownWelcome = sessionStorage.getItem('welcomeShown');
      if (!hasShownWelcome) {
        toast.success(`Welcome back, ${user.firstName || 'User'}!`);
        sessionStorage.setItem('welcomeShown', 'true');
      }
    } else if (!isSignedIn) {
      // User signed out
      const wasSignedIn = sessionStorage.getItem('welcomeShown');
      if (wasSignedIn) {
        sessionStorage.removeItem('welcomeShown');
        toast.info('Signed out successfully');
      }
    }
  }, [isSignedIn, user]);

  const becomeEducator = async () => {
    try {
      if (isEducator) {
        navigate("/educator");
        return;
      }
      // Redirect to application form instead of directly updating role
      navigate("/become-educator");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36 border-b-2 border-yellow-400 py-4 bg-linear-to-r from-yellow-100 via-yellow-200 to-yellow-100 shadow-md">
        <div className="flex items-center gap-3">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img
              src={assets.logo}
              alt="Logo"
              className="w-12 h-12 lg:w-14 lg:h-14 cursor-pointer hover:scale-105 transition-transform"
            />
          </Link>
          {/* Animated Slogan */}
          <div className="hidden lg:block overflow-hidden w-64 ml-2">
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-700 inline-block">
                Turn Learning Into Skill 
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <SearchBar />
        </div>

        <div className="flex items-center gap-3 md:gap-5">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setShowMobileSearch(true)}
            className="md:hidden text-yellow-600 hover:text-yellow-700 transition-colors"
            title="Search"
          >
            <IoSearchOutline className="w-6 h-6" />
          </button>

          {/* Smart Assistant */}
          <div className="text-yellow-600 hover:text-yellow-700 transition-colors cursor-pointer" title="Smart Learning Assistant">
            <SmartAssistant role="student" />
          </div>

          {user && (
            <>
              <button
                onClick={becomeEducator}
                className="hidden sm:block text-sm font-medium text-gray-700 hover:text-yellow-700 transition-colors"
              >
                {isEducator ? "Educator DashBoard" : "Become Educator"}
              </button>
              <Link
                to="/my-enrollments"
                className="hidden sm:block text-sm font-medium text-gray-700 hover:text-yellow-700 transition-colors"
              >
                My Enrollments
              </Link>
              <Link
                to="/certificates"
                className="hidden sm:block text-sm font-medium text-gray-700 hover:text-yellow-700 transition-colors"
              >
                My Certificates
              </Link>
              <Link
                to="/skill-tracker-dashboard"
                className="hidden sm:block text-sm font-medium text-gray-700 hover:text-yellow-700 transition-colors"
              >
                Skill Tracker
              </Link>
            </>
          )}

          {user ? <UserButton afterSignOutUrl="/" /> :
            <button
              onClick={() => openSignIn()}
              className="bg-linear-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Sign In
            </button>}
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-white h-full w-full animate-slideDown">
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Search Courses</h2>
              <button
                onClick={() => setShowMobileSearch(false)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <IoCloseOutline className="w-7 h-7" />
              </button>
            </div>
            <div className="px-4 py-6">
              <SearchBar />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;