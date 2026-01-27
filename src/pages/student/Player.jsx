import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams, useSearchParams } from 'react-router-dom';
import { assets } from '../../assets/assets';
import YouTube from 'react-youtube';
import Rating from '../../components/student/Rating';
import { toast } from 'react-toastify';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import Footer from '../../components/student/Footer';

const Player = () => {
  const { calculateRating, calculateChapterTime, toggleLectureCompletion, isLectureCompleted, enrolledCourses, backendUrl, userData, fetchUserEnrolledCourses, authorizedGet, authorizedPost, setLoading, loading, calculateNoOfLectures } = useContext(AppContext);
  const { user } = useUser();

  const { id: courseId } = useParams();
  const [searchParams] = useSearchParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);



const getCourseData = async () => {
  console.log('getCourseData called:', {
    courseId,
    hasUser: !!user?.id,
    enrolledCoursesCount: enrolledCourses?.length || 0
  });

  if (!courseId) {
    setError("Invalid course ID");
    setIsLoadingPage(false);
    return;
  }

  // Check if user is enrolled
  const enrolledCourse = enrolledCourses?.find(
    (course) => course._id === courseId
  );

  if (enrolledCourse) {
    // User is enrolled - show full content
    console.log('User is enrolled - showing full content');
    setCourseData(enrolledCourse);
    setIsEnrolled(true);

    const userRating = enrolledCourse.courseRatings?.find(
      (rating) => rating.userId === user?.id
    );

    setInitialRating(userRating ? userRating.rating : 0);
    setIsLoadingPage(false);
    setError(null);
  } else {
    // User is NOT enrolled - fetch preview content from public API
    console.log('User not enrolled - fetching preview content');
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/${courseId}`);
      
      if (data?.success) {
        setCourseData(data.courseData);
        setIsEnrolled(false);
        setIsLoadingPage(false);
        setError(null);
      } else {
        setError(data?.message || "Course not found");
        setIsLoadingPage(false);
      }
    } catch (error) {
      console.error('Error fetching course:', error);
      setError("Failed to load course. Please try again.");
      setIsLoadingPage(false);
    }
  }
};

const fetchCourseProgress = async () => {
  if (!courseId) return;

  try {
    const { data } = await authorizedGet(
      `${backendUrl}/api/user/course-progress/${courseId}`
    );

    if (data?.success) {
      setProgressData(data.progressData);
    } else {
      // Silent fail for progress loading
    }
  } catch (error) {
    // Silent fail for progress loading
  }
};

const markLectureAsCompleted = async (lectureId) => {
  if (!lectureId || !courseId) return;

  try {
    setLoading(true);

    const { data } = await authorizedPost(
      `${backendUrl}/api/user/course-progress`,
      { courseId, lectureId }
    );

    if (data?.success) {
      toast.success("Lecture completed!");
      await fetchCourseProgress();
    } else {
      toast.error("Unable to save progress");
    }
  } catch (error) {
    toast.error("Unable to save progress");
  } finally {
    setLoading(false);
  }
};

const handleRate = async (rating) => {
  if (!rating || rating < 1 || rating > 5) return;

  try {
    setLoading(true);

    const { data } = await authorizedPost(
      `${backendUrl}/api/user/add-rating`,
      { courseId, rating }
    );

    if (data?.success) {
      toast.success("Thank you for your rating!");
      await fetchUserEnrolledCourses();
      setInitialRating(rating);
    } else {
      toast.error("Unable to submit rating. Please try again.");
    }
  } catch (error) {
    toast.error("Unable to submit rating. Please try again.");
  } finally {
    setLoading(false);
  }
};

const getFirstLecture = () => {
  if (!courseData?.courseContent?.length) return null;

  for (let i = 0; i < courseData.courseContent.length; i++) {
    const lectures = courseData.courseContent[i].chapterContent;
    if (lectures?.length) {
      return {
        ...lectures[0],
        chapter: i + 1,
        lecture: 1,
      };
    }
  }
  return null;
};

const handleThumbnailClick = () => {
  const firstLecture = getFirstLecture();
  if (!firstLecture) {
    toast.info("No lectures available");
    return;
  }
  setCurrentVideo({
    ...firstLecture,
    chapterIndex: 0,
    lectureIndex: 0
  });
};

useEffect(() => {
  setIsLoadingVideo(Boolean(currentVideo));
  setIsPlaying(false);
}, [currentVideo]);

const onPlayerReady = (event) => {
  try {
    event.target.playVideo();
  } catch {}
};

const onPlayerStateChange = (event) => {
  const state = event.data;

  if (state === 1) {
    setIsPlaying(true);
    setIsLoadingVideo(false);
  } else if (state === 3) {
    setIsLoadingVideo(true);
  } else {
    setIsPlaying(false);
    setIsLoadingVideo(false);
  }
};

const youtubeOpts = {
  width: "100%",
  playerVars: {
    autoplay: 1,
  },
};

// Fetch enrolled courses on mount if not already loaded
useEffect(() => {
  if (user && enrolledCourses.length === 0) {
    fetchUserEnrolledCourses();
  }
}, [user]);

useEffect(() => {
  if (courseId) {
    getCourseData();
  }
}, [enrolledCourses, courseId, user]);

useEffect(() => {
  if (courseData) {
    fetchCourseProgress();
  }
}, [courseData]);

  const toggleSection = (index) => {
    setOpenSections((prev) => {
      const newSections = [...prev];
      newSections[index] = !newSections[index];
      return newSections;
    });
  };

  const playVideo = (chapterIndex, lectureIndex, lecture) => {
    // Check if user is enrolled or if lecture is free
    if (!isEnrolled && !lecture.isPreviewFree) {
      toast.warning("This lecture is locked. Please enroll to access.", {
        position: "top-center",
        autoClose: 3000
      });
      return;
    }

    setCurrentVideo({
      ...lecture,
      chapterIndex,
      lectureIndex
    });
    // Update URL without page reload
    window.history.pushState(null, '', `?chapter=${chapterIndex}&lecture=${lectureIndex}`);
    
    // Scroll to video player
    const videoPlayer = document.getElementById('video-player');
    if (videoPlayer) {
      videoPlayer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0
    },
  };

  if (isLoadingPage) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !courseData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "You are not enrolled in this course or it doesn't exist."}</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 pt-20 pb-10 min-h-screen">
      <div className="absolute top-0 left-0 w-full h-64 -z-1 bg-linear-to-b from-yellow-100/70"></div>

      {/* Left Side - Course Content */}
      <div className="max-w-xl z-10 w-full md:w-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {courseData.courseTitle}
          </h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  className="w-3 h-3"
                  key={i}
                  src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank}
                  alt="star"
                />
              ))}
            </div>
            <p className="text-yellow-600">
              ({courseData.courseRatings?.length || 0} ratings)
            </p>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            By <span className="text-yellow-600">
              {courseData.educator?.name ? `${courseData.educator.name.firstName} ${courseData.educator.name.lastName || ''}`.trim() : 'Unknown'}
            </span>
          </p>
        </div>

        {/* Course Structure */}
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold mb-4">Course Content</h2>
          <div className="space-y-2">
            {courseData.courseContent && courseData.courseContent.length > 0 ? (
              courseData.courseContent.map((chapter, chapterIndex) => (
                <div
                  className="border border-gray-300 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  key={chapterIndex}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none hover:bg-amber-50 transition-colors rounded-t-lg"
                    onClick={() => toggleSection(chapterIndex)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform duration-300 ${
                          openSections[chapterIndex] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow"
                      />
                      <p className="font-medium md:text-base text-sm text-gray-800">
                        {chapter.chapterTitle || `Chapter ${chapterIndex + 1}`}
                      </p>
                    </div>
                    <p className="text-sm md:text-base text-gray-700 font-medium">
                      {chapter.chapterContent?.length || 0} lectures
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openSections[chapterIndex] ? "max-h-250 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {chapter.chapterContent && chapter.chapterContent.length > 0 && (
                      <div className="px-4 pb-3 space-y-2 bg-amber-50/30">
                        {chapter.chapterContent.map((lecture, lectureIndex) => {
                          const isLocked = !isEnrolled && !lecture.isPreviewFree;
                          const isAssignment = lecture.isAssignment;
                          const isProject = lecture.isProject;
                          
                          return (
                          <div 
                            key={lectureIndex} 
                            className={`flex items-center justify-between py-2.5 px-3 rounded-md transition-all duration-200 ${
                              isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                            } ${
                              currentVideo?.chapterIndex === chapterIndex && currentVideo?.lectureIndex === lectureIndex
                                ? 'bg-yellow-100 border border-yellow-300'
                                : 'hover:bg-white hover:shadow-sm transform hover:translate-x-1'
                            }`}
                            onClick={() => playVideo(chapterIndex, lectureIndex, lecture)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-7 h-7 flex items-center justify-center rounded-full ${
                                currentVideo?.chapterIndex === chapterIndex && currentVideo?.lectureIndex === lectureIndex
                                  ? 'bg-yellow-500'
                                  : isAssignment ? 'bg-blue-100' : isProject ? 'bg-purple-100' : 'bg-amber-100 group-hover:bg-amber-200'
                              } transition-colors duration-200`}>
                                {isLocked ? (
                                  <span className="text-xs">🔒</span>
                                ) : isAssignment ? (
                                  <span className="text-xs">📝</span>
                                ) : isProject ? (
                                  <span className="text-xs">🚀</span>
                                ) : (
                                  <img 
                                    src={assets.play_icon} 
                                    alt="play" 
                                    className="w-3 h-3"
                                  />
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <p className={`text-sm ${
                                  currentVideo?.chapterIndex === chapterIndex && currentVideo?.lectureIndex === lectureIndex
                                    ? 'text-yellow-800 font-medium'
                                    : 'text-gray-700'
                                }`}>
                                  {lecture.lectureTitle || `Lecture ${lectureIndex + 1}`}
                                </p>
                                {lecture.isPreviewFree && !isEnrolled && (
                                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full font-semibold">FREE</span>
                                )}
                                {isAssignment && (
                                  <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full font-semibold">ASSIGNMENT</span>
                                )}
                                {isProject && (
                                  <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded-full font-semibold">PROJECT</span>
                                )}
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">
                              {isAssignment || isProject ? '—' : `${lecture.lectureDuration} min`}
                            </p>
                          </div>
                        )})}
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
      </div>

      {/* Right Side - Video Player Box */}
      <div id="video-player" className="md:sticky md:top-24 z-10 w-full md:w-150 lg:w-175 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
        {currentVideo ? (
          <>
            {/* Assignment Content */}
            {currentVideo.isAssignment ? (
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div>
                    <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full font-semibold">ASSIGNMENT</span>
                    <h2 className="text-xl font-bold text-gray-800 mt-1">
                      {currentVideo.lectureTitle}
                    </h2>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">📋 Assignment Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {currentVideo.assignmentDescription || 'Complete this assignment to test your understanding of the concepts covered in this section.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <img src={assets.lesson_icon} alt="chapter" className="w-4 h-4" />
                  <span>Chapter {currentVideo.chapterIndex + 1}, Assignment {currentVideo.lectureIndex + 1}</span>
                </div>

                {!isEnrolled && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-center">
                    <p className="text-gray-700 font-semibold mb-2">🔒 This assignment is locked</p>
                    <p className="text-sm text-gray-600">Enroll in this course to access assignments and submit your work</p>
                  </div>
                )}

                {isEnrolled && (
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">✅ Submission Instructions</h4>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Complete all tasks outlined in the assignment</li>
                        <li>Test your solution thoroughly</li>
                        <li>Submit your work using the form below</li>
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 rounded-lg px-4 py-3 flex items-center gap-3 border-2 border-amber-200">
                      <label className="flex items-center gap-3 cursor-pointer select-none w-full">
                        <input
                          type="checkbox"
                          checked={isLectureCompleted(courseId, currentVideo.chapterIndex, currentVideo.lectureIndex)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleLectureCompletion(courseId, currentVideo.chapterIndex, currentVideo.lectureIndex);
                          }}
                          className="w-5 h-5 text-yellow-600 bg-white border-gray-300 rounded focus:ring-yellow-500 focus:ring-2 cursor-pointer"
                        />
                        <span className="text-sm font-semibold text-gray-800 flex-1">Mark as Complete</span>
                        {isLectureCompleted(courseId, currentVideo.chapterIndex, currentVideo.lectureIndex) && (
                          <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full font-bold">✓ Completed</span>
                        )}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )
            /* Project Content */
            : currentVideo.isProject ? (
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <span className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full font-semibold">PROJECT</span>
                    <h2 className="text-xl font-bold text-gray-800 mt-1">
                      {currentVideo.lectureTitle}
                    </h2>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">🎯 Project Description</h3>
                  <p className="text-gray-700 whitespace-pre-line">
                    {currentVideo.projectDescription || 'Build a comprehensive project to apply everything you have learned in this course.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <img src={assets.lesson_icon} alt="chapter" className="w-4 h-4" />
                  <span>Chapter {currentVideo.chapterIndex + 1}, Project {currentVideo.lectureIndex + 1}</span>
                </div>

                {!isEnrolled && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 text-center">
                    <p className="text-gray-700 font-semibold mb-2">🔒 This project is locked</p>
                    <p className="text-sm text-gray-600">Enroll in this course to access projects and showcase your skills</p>
                  </div>
                )}

                {isEnrolled && (
                  <div className="space-y-3">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">💡 Project Guidelines</h4>
                      <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Plan your project structure before coding</li>
                        <li>Follow best practices and clean code principles</li>
                        <li>Document your code and add README</li>
                        <li>Test all features before submission</li>
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 rounded-lg px-4 py-3 flex items-center gap-3 border-2 border-amber-200">
                      <label className="flex items-center gap-3 cursor-pointer select-none w-full">
                        <input
                          type="checkbox"
                          checked={isLectureCompleted(courseId, currentVideo.chapterIndex, currentVideo.lectureIndex)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleLectureCompletion(courseId, currentVideo.chapterIndex, currentVideo.lectureIndex);
                          }}
                          className="w-5 h-5 text-yellow-600 bg-white border-gray-300 rounded focus:ring-yellow-500 focus:ring-2 cursor-pointer"
                        />
                        <span className="text-sm font-semibold text-gray-800 flex-1">Mark as Complete</span>
                        {isLectureCompleted(courseId, currentVideo.chapterIndex, currentVideo.lectureIndex) && (
                          <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full font-bold">✓ Completed</span>
                        )}
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )
            /* Regular Video Lecture */
            : currentVideo.videoId ? (
              <>
                {/* Video Player Container */}
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <div className="absolute inset-0">
                    <YouTube
                      videoId={currentVideo.videoId}
                      opts={opts}
                      className="w-full h-full"
                    />
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {currentVideo.lectureTitle}
                  </h2>
                  <div className="flex flex-col gap-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <img src={assets.time_clock_icon} alt="duration" className="w-4 h-4" />
                      <span>Duration: {currentVideo.lectureDuration} minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={assets.lesson_icon} alt="chapter" className="w-4 h-4" />
                      <span>Chapter {currentVideo.chapterIndex + 1}, Lecture {currentVideo.lectureIndex + 1}</span>
                    </div>
                  </div>
                  
                  {/* Mark as Complete Checkbox */}
                  <div className="bg-amber-50 rounded-lg px-4 py-3 flex items-center gap-3 border-2 border-amber-200 hover:border-yellow-400 transition-all">
                    <label className="flex items-center gap-3 cursor-pointer select-none w-full">
                      <input
                        type="checkbox"
                        checked={isLectureCompleted(courseId, currentVideo.chapterIndex, currentVideo.lectureIndex)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleLectureCompletion(courseId, currentVideo.chapterIndex, currentVideo.lectureIndex);
                        }}
                        className="w-5 h-5 text-yellow-600 bg-white border-gray-300 rounded focus:ring-yellow-500 focus:ring-2 cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-gray-800 flex-1">Mark as Complete</span>
                      {isLectureCompleted(courseId, currentVideo.chapterIndex, currentVideo.lectureIndex) && (
                        <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full font-bold">✓ Completed</span>
                      )}
                    </label>
                  </div>

                  {/* Rate This Course Section */}
                  {isEnrolled && (
                    <div className="mt-4 bg-linear-to-br from-yellow-50 to-amber-50 rounded-lg px-5 py-4 border-2 border-yellow-200 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                          <img src={assets.star} alt="star" className="w-5 h-5" />
                          Rate This Course
                        </h3>
                        {initialRating > 0 && (
                          <span className="text-xs bg-yellow-500 text-white px-2 py-1 rounded-full font-semibold">Rated</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Rating 
                          initialRating={initialRating} 
                          onRate={handleRate}
                        />
                        {initialRating > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-700">{initialRating}.0</span>
                            <span className="text-xs text-gray-500">/ 5.0</span>
                          </div>
                        )}
                      </div>
                      
                      {initialRating > 0 && (
                        <p className="text-xs text-gray-600 mt-3 flex items-center gap-1">
                          <span className="text-green-600 font-semibold">✓</span>
                          Thank you for rating this course!
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            {/* Course Thumbnail */}
            {courseData?.courseThumbnail && (
              <img 
                src={courseData.courseThumbnail} 
                alt={courseData.courseTitle}
                className="w-full h-auto object-cover mb-6"
              />
            )}
            <div className="p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <img src={assets.play_icon} alt="play" className="w-8 h-8 opacity-40" />
              </div>
              <p className="text-lg font-semibold text-gray-800 mb-2">No content selected</p>
              <p className="text-sm text-gray-600">Select a lecture, assignment, or project from the left to start</p>
            </div>
          </div>
          
        )}
        
      </div>
    </div>    <Footer />
    </>  );
}

export default Player