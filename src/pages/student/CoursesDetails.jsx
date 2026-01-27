import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import Footer from '../../components/student/Footer';

const CoursesDetails = () => {
  const { allCourses, calculateRating, calculateChapterTime, calculateCourseDuration, navigate, setLoading, backendUrl, userData, authorizedGet, authorizedPost } = useContext(AppContext);
  const { id } = useParams();
  
  const [openSections, setOpenSections] = useState([]);
  const [chapterTimes, setChapterTimes] = useState({});
  const [courseData, setCourseData] = useState(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const fetchCourseData = async () => {
  try {
    setLoading(true);

    if (!id) {
      toast.error("Course not found");
      return;
    }

    const { data } = await authorizedGet(
      `${backendUrl}/api/course/${id}`
    );

    if (data?.success) {
      setCourseData(data.courseData);
    } else {
      toast.error("Unable to load course details");
      setCourseData(null);
    }
  } catch (error) {
    toast.error("Network error. Please check your connection.");
    setCourseData(null);
  } finally {
    setLoading(false);
  }
};

const enrollCourse = async () => {
  try {
  
    if (!userData) {
      toast.warn("Please log in to enroll");
      return;
    }

    
    if (isAlreadyEnrolled) {
      toast.info("You are already enrolled in this course");
      return;
    }

    setLoading(true);

    const { data } = await authorizedPost(
      `${backendUrl}/api/user/purchase`,
      { courseId: courseData._id }
    );

   
    if (data?.success && data.session_url) {
      window.location.href = data.session_url;
    } else {
      toast.error("Unable to process enrollment. Please try again.");
    }
  } catch (error) {
    toast.error("Network error. Please try again.");
  } 
  finally {
    setLoading(false);
  }
};



  const toggleSection = (index) => {
    setOpenSections((prev) => {
      const newSections = [...prev];
      newSections[index] = !newSections[index];
      return newSections;
    });
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses, id]);




  return !courseData ? (
    <div className="flex items-center justify-center h-screen">
      <p>Loading...</p>
    </div>
  ) : (
    <>
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 pt-20 text-left">
				<div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-linear-to-b from-yellow-100/70"></div>

				{/* left column */}
				<div className="max-w-xl z-10 text-gray-500">
					<h1 className="md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800">
						{courseData.courseTitle}
					</h1>
					<p
						className="pt-4 md:text-base text-sm"
						dangerouslySetInnerHTML={{
							__html: courseData.courseDescription?.slice(0, 200) || '',
						}}
					></p>
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
						<p>{calculateRating(courseData)}</p>
						<div className="flex">
							{[...Array(5)].map((_, i) => (
								<img
									className="w-3.5 h-3.5"
									key={i}
									src={
										i < Math.floor(calculateRating(courseData))
											? assets.star
											: assets.star_blank
									}
									alt="star"
								/>
							))}
						</div>
            <p className="text-yellow-600">
							({courseData.courseRatings?.length || 0}{" "}
							{(courseData.courseRatings?.length || 0) > 1 ? "ratings" : "rating"})
						</p>

						<p>
							{courseData.enrolledStudents?.length || 0}{" "}
							{(courseData.enrolledStudents?.length || 0) > 1 ? "students" : "student"}
						</p>
            </div>
            <p className="text-sm">
						Course by{" "}
						<span className="text-yellow-600 underline">
							{courseData.educator?.name ? `${courseData.educator.name.firstName} ${courseData.educator.name.lastName || ''}`.trim() : 'Unknown'}
						</span>
					</p>
          <div className="pt-8 text-gray-800">
						<h2 className="text-xl font-semibold">Course Structure</h2>
						<div className="pt-5">
							{courseData.courseContent && courseData.courseContent.length > 0 ? (
								courseData.courseContent.map((chapter, index) => (
									<div
										className="border border-gray-300 bg-white mb-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
										key={index}
									>
										<div
											className="flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-amber-50 transition-colors duration-200 rounded-t-lg"
											onClick={() => toggleSection(index)}
										>
											<div className="flex items-center gap-2">
												<img
													className={`transform transition-transform duration-300 ${
														openSections[index] ? "rotate-180" : ""
													}`}
													src={assets.down_arrow_icon}
													alt="down_arrow_icon"
												/>
												<p className="font-medium md:text-base text-sm text-gray-800">
													{chapter.chapterTitle || `Chapter ${index + 1}`}
												</p>
											</div>
											<p className="text-sm md:text-base text-gray-700 font-medium">
												{chapter.chapterContent?.length || 0} lectures - {chapterTimes[index] || '0 m'}
											</p>
										</div>
										<div
											className={`overflow-hidden transition-all duration-500 ease-in-out ${
												openSections[index] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
											}`}
										>
											{chapter.chapterContent && chapter.chapterContent.length > 0 && (
												<div className="px-4 pb-3 space-y-1 bg-amber-50/30">
													{chapter.chapterContent.map((lecture, lectureIndex) => (
														<div 
															key={lectureIndex} 
															className="flex items-center justify-between py-2.5 px-3 hover:bg-white hover:shadow-sm rounded-md cursor-pointer transition-all duration-200 transform hover:translate-x-1 group"
															style={{
																animation: openSections[index] ? `slideIn 0.3s ease-out ${lectureIndex * 0.1}s both` : 'none'
															}}
															onClick={() => navigate(`/player/${id}?chapter=${index}&lecture=${lectureIndex}`)}
														>
															<div className="flex items-center gap-3">
																<div className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 group-hover:bg-amber-200 transition-colors duration-200">
																	<img 
																		src={assets.play_icon} 
																		alt="play" 
																		className="w-3.5 h-3.5"
																	/>
																</div>
																<p className="text-sm text-gray-700 group-hover:text-amber-700 transition-colors duration-200">
																	{lecture.lectureTitle || `Lecture ${lectureIndex + 1}`}
																</p>
															</div>
															<p className="text-sm text-gray-500 font-medium">
																{lecture.lectureDuration} min
															</p>
														</div>
													))}
												</div>
											)}
										</div>
									</div>
								))
							) : (
								<div className="border border-gray-300 bg-white p-6 rounded-lg text-center shadow-sm">
									<p className="text-gray-600">Course content will be available soon.</p>
								</div>
							)}
						</div>
					</div>

					{/* Course Description Section */}
					<div className="pt-10 text-gray-800">
						<h2 className="text-xl font-semibold">Course Description</h2>
						<div 
							className="pt-4 text-gray-600 text-sm md:text-base leading-relaxed"
							dangerouslySetInnerHTML={{
								__html: courseData.courseDescription || 'No description available.',
							}}
						></div>
					</div>
				</div>

				{/* Right column - Price Card */}
				<div className="md:sticky md:top-24 z-10 w-full md:w-96 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
					{/* Course Image */}
					<img 
						src={courseData.courseThumbnail} 
						alt={courseData.courseTitle}
						className="w-full h-52 object-cover"
					/>

					<div className="p-6">
						{/* Time Left Message */}
						<div className="flex items-center gap-2 text-red-600 text-sm mb-3">
							<img src={assets.time_left_clock_icon} alt="clock" className="w-4 h-4" />
							<span className="font-medium">5 days left at this price!</span>
						</div>

						{/* Price Section */}
						<div className="mb-4">
							<div className="flex items-baseline gap-3 flex-wrap">
								<span className="text-4xl font-bold text-gray-900">
									${courseData.coursePrice?.toFixed(2) || '9.99'}
								</span>
								{courseData.discount > 0 && (
									<>
										<span className="text-lg text-gray-500 line-through">
											${(courseData.coursePrice / (1 - courseData.discount / 100)).toFixed(2)}
										</span>
										<span className="text-yellow-600 font-semibold">
											{courseData.discount}% off
										</span>
									</>
								)}
							</div>
						</div>

						{/* Course Stats */}
						<div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
							<div className="flex items-center gap-1">
								<img src={assets.star} alt="star" className="w-4 h-4" />
								<span className="font-semibold text-gray-900">{calculateRating(courseData)}</span>
							</div>
							<span className="text-gray-400">|</span>
							<div className="flex items-center gap-1">
								<img src={assets.time_clock_icon} alt="clock" className="w-4 h-4" />
								<span>{calculateCourseDuration(courseData)}</span>
							</div>
							<span className="text-gray-400">|</span>
							<div className="flex items-center gap-1">
								<img src={assets.lesson_icon} alt="lessons" className="w-4 h-4" />
								<span>{courseData.courseContent?.length || 0} lessons</span>
							</div>
						</div>

						{/* Enroll Button */}
						<button onClick={enrollCourse} className="w-full h-12 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-xl transition-colors duration-200 my-6 text-lg flex items-center justify-center">
  Enroll Now
</button>

						{/* What's in the course */}
						<div className="text-left">
							<h3 className="font-semibold text-gray-900 mb-4 text-base">What's in the course?</h3>
							<ul className="space-y-3 text-sm text-gray-700">
								<li className="flex items-start gap-2.5">
									<span className="text-gray-600 mt-0.5">•</span>
									<span>Lifetime access with free updates.</span>
								</li>
								<li className="flex items-start gap-2.5">
									<span className="text-gray-600 mt-0.5">•</span>
									<span>Step-by-step, hands-on project guidance.</span>
								</li>
								<li className="flex items-start gap-2.5">
									<span className="text-gray-600 mt-0.5">•</span>
									<span>Downloadable resources and source code.</span>
								</li>
								<li className="flex items-start gap-2.5">
									<span className="text-gray-600 mt-0.5">•</span>
									<span>Quizzes to test your knowledge.</span>
								</li>
								<li className="flex items-start gap-2.5">
									<span className="text-gray-600 mt-0.5">•</span>
									<span>Certificate of completion.</span>
								</li>
								<li className="flex items-start gap-2.5">
									<span className="text-gray-600 mt-0.5">•</span>
									<span>Quizzes to test your knowledge.</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default CoursesDetails