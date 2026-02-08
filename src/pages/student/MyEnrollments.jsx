import React, { useContext, useMemo, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import Footer from "../../components/student/Footer";
import { toast } from "react-toastify";
import { FiAward } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const MyEnrollMents = () => {
	const { calculateCourseDuration, navigate, enrolledCourses, fetchUserEnrolledCourses, getCompletedLectureCount, setLoading, calculateNoOfLectures, backendUrl, authorizedGet,userData } = useContext(AppContext);
	const { getToken } = useAuth();
	const [progressArray , setProgressArray] = useState([]);
	const [isLoadingPage, setIsLoadingPage] = useState(true);
	const [certificates, setCertificates] = useState({});

	useEffect(() => {
		if (userData) {
			fetchUserEnrolledCourses();
			fetchCertificates();
		}
	}, [userData]);

	const fetchCertificates = async () => {
		try {
			const token = await getToken();
			const response = await axios.get(
				`${backendUrl}/api/certificate/my-certificates`,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			
			// Create a map of courseId -> certificateId for quick lookup
			const certMap = {};
			response.data.data.forEach(cert => {
				certMap[cert.courseId] = cert.certificateId;
			});
			setCertificates(certMap);
		} catch (error) {
			console.error('Error fetching certificates:', error);
		}
	};

	const getCourseProgress = async () => {
  try {
    if (enrolledCourses.length === 0) {
      setProgressArray([]);
      setIsLoadingPage(false);
      return;
    }

    const progressPromises = enrolledCourses.map(async (course) => {
      const { data } = await authorizedGet(
        `${backendUrl}/api/user/course-progress/${course._id}`
      );

      const totalLectures = calculateNoOfLectures(course);

      const lecturesCompleted = data?.progressData?.lecturesCompleted?.length || 0;

      return {
        courseId: course._id,
        totalLectures,
        lecturesCompleted,
        progressPercent: data?.progressData?.progressPercent || 0,
        completed: data?.progressData?.completed || false,
      };
    });

    const progressArray = await Promise.all(progressPromises);
    setProgressArray(progressArray);
  } catch (error) {
    toast.error("Unable to load progress. Please refresh the page.");
  } finally {
    setIsLoadingPage(false);
  }
};



useEffect(() => {
  if (enrolledCourses.length > 0) {
    getCourseProgress();
  } else {
    setProgressArray([]);
  }
}, [enrolledCourses]);





	// Process enrollment data with course information
	const enrollments = useMemo(() => {
		if (!enrolledCourses || enrolledCourses.length === 0) return [];
		
		return enrolledCourses.map(course => {
			if (!course) return null;

			// Calculate total lectures from course content
			let totalLectures = 0;
			if (course.courseContent && Array.isArray(course.courseContent)) {
				course.courseContent.forEach(chapter => {
					if (chapter.chapterContent && Array.isArray(chapter.chapterContent)) {
						totalLectures += chapter.chapterContent.length;
					}
				});
			}

			// Get actual completed lectures from context (not from dummy data)
			const completedLectures = getCompletedLectureCount(course._id);
			
			// Calculate status and progress
			let status = 'Not Started';
			let statusColor = 'bg-red-500';
			
			if (completedLectures === 0) {
				status = 'Not Started';
				statusColor = 'bg-red-500';
			} else if (completedLectures >= totalLectures) {
				status = 'Completed';
				statusColor = 'bg-green-500';
			} else {
				status = 'On Going';
				statusColor = 'bg-yellow-500';
			}

			return {
				course,
				completedLectures,
				totalLectures,
				status,
				statusColor
			};
		}).filter(Boolean);
	}, [enrolledCourses, getCompletedLectureCount]);

	const getProgressPercentage = (completed, total) => {
		if (total === 0) return 0;
		return Math.min((completed / total) * 100, 100);
	};

	if (isLoadingPage) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading your enrollments...</p>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="min-h-screen bg-gray-50 py-10 px-8 md:px-36">
				<div className="max-w-7xl mx-auto">
					<h1 className="text-3xl font-bold text-gray-900 mb-8">My Enrollments</h1>

					{/* Table */}
					<div className="bg-white rounded-lg shadow-sm overflow-hidden">
						{/* Table Header */}
						<div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700 text-sm">
							<div className="col-span-4">Course</div>
							<div className="col-span-2">Duration</div>
							<div className="col-span-3">Completed</div>
							<div className="col-span-2">Status</div>
							<div className="col-span-1">Certificate</div>
						</div>

						{/* Table Body */}
						<div className="divide-y divide-gray-200">
						{enrollments.length === 0 ? (
							<div className="px-6 py-12 text-center">
								<img src={assets.empty_cart_icon} alt="No enrollments" className="w-24 h-24 mx-auto mb-4 opacity-50" />
								<p className="text-gray-600 text-lg mb-2">No enrollments yet</p>
								<p className="text-gray-500 text-sm mb-4">Start learning by enrolling in a course!</p>
								<button 
									onClick={() => navigate('/course-list')}
									className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
								>
									Browse Courses
								</button>
							</div>
						) : enrollments.map((enrollment, index) => (
								<div 
									key={index} 
									className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors items-center"
								>
									{/* Course Column */}
									<div 
										className="col-span-4 flex items-center gap-4 cursor-pointer"
										onClick={() => navigate(`/player/${enrollment.course._id}`)}
									>
										<img 
											src={enrollment.course.courseThumbnail} 
											alt={enrollment.course.courseTitle}
											className="w-20 h-14 object-cover rounded"
										/>
										<div className="text-gray-900 font-medium hover:text-yellow-600 transition-colors line-clamp-2">
											{enrollment.course.courseTitle}
										</div>
									</div>

									{/* Duration Column */}
									<div className="col-span-2 text-gray-600 text-sm">
										{calculateCourseDuration(enrollment.course)}
									</div>

									{/* Completed Column with Progress Bar */}
									<div className="col-span-3">
										<div className="flex items-center gap-3">
											<span className="text-sm font-medium text-gray-700 whitespace-nowrap">
												{enrollment.completedLectures}/{enrollment.totalLectures} Lectures
											</span>
										</div>
										{/* Progress Bar */}
										<div className="w-full bg-gray-200 rounded-full h-2 mt-2">
											<div 
												className={`h-2 rounded-full transition-all duration-300 ${
													enrollment.status === 'Completed' ? 'bg-green-500' :
													enrollment.status === 'On Going' ? 'bg-yellow-500' :
													'bg-red-500'
												}`}
												style={{ width: `${getProgressPercentage(enrollment.completedLectures, enrollment.totalLectures)}%` }}
											></div>
										</div>
									</div>

									{/* Status Column with Badge */}
									<div className="col-span-2">
										   <div className="flex items-center gap-2">
											   <span className={`${enrollment.statusColor} text-white px-4 py-1.5 rounded-full text-xs font-semibold`}>
												   {enrollment.status}
											   </span>
										   </div>
									</div>

									{/* Certificate Column */}
									<div className="col-span-1">
										{certificates[enrollment.course._id] && enrollment.status === 'Completed' && (
											<button
												onClick={(e) => {
													e.stopPropagation();
													navigate(`/certificate/${certificates[enrollment.course._id]}`);
												}}
												className="flex items-center justify-center w-10 h-10 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 rounded-lg transition-colors"
												title="View Certificate"
											>
												<FiAward className="w-5 h-5" />
											</button>
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
};

export default MyEnrollMents;