import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import SearchBar from "../student/SearchBar";
import { AppContext } from "../../context/AppContext";
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import SmartAssistant from '../SmartAssistant';

const Navbar = () => {
	const { openSignIn } = useClerk();
	const { user } = useUser();
	const { navigate, isEducator } = useContext(AppContext);
	const [showMobileSearch, setShowMobileSearch] = useState(false);

	return (
		<>
			<div className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36 border-b-2 border-purple-400 py-4 bg-linear-to-r from-purple-100 via-purple-200 to-purple-100 shadow-md">
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
						className="md:hidden text-purple-600 hover:text-purple-700 transition-colors"
						title="Search"
					>
						<IoSearchOutline className="w-6 h-6" />
					</button>

					{/* Smart Assistant for Educator */}
					<div className="text-purple-600 hover:text-purple-700 transition-colors cursor-pointer" title="Smart Teaching Assistant">
						<SmartAssistant role="educator" />
					</div>

					{user && (
						<>
							<button
								onClick={() => { navigate('/educator'); }}
								className="hidden sm:block text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors"
							>
								{isEducator ? "Educator DashBoard" : "Become Educator"}
							</button>
							<Link
								to="/educator/my-courses"
								className="hidden sm:block text-sm font-medium text-gray-700 hover:text-purple-700 transition-colors"
							>
								My Courses
							</Link>
						</>
					)}

					{user ? (
						<UserButton afterSignOutUrl="/" />
					) : (
						<button
							onClick={() => openSignIn()}
							className="bg-linear-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
						>
							Sign In
						</button>
					)}
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