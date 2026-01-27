import { createContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import humanizeDuration from 'humanize-duration';
import axios from "axios";
import { toast} from 'react-toastify';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl=import.meta.env.VITE_BACKEND_URL;
  const currency =import.meta.env.VITE_CURRENCY || '₹' ;

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { user } = useUser();

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  
  // Initialize completed lectures from localStorage
  const initializeCompletedLectures = () => {
    const saved = localStorage.getItem('completedLectures');
    return saved ? JSON.parse(saved) : {};
  };
  
  const [completedLectures, setCompletedLectures] = useState(initializeCompletedLectures);

  // Authorized API call helpers
  const authorizedGet = async (url) => {
    const token = await getToken();
    if (!token) throw new Error("Authentication failed");

    return axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const authorizedPost = async (url, body) => {
    const token = await getToken();
    if (!token) throw new Error("Authentication failed");

    return axios.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  

  // Get and log the token when user is available
  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        try {
          const token = await getToken();
          console.log(token);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      }
    };
    fetchToken();
  }, [user, getToken]);



const fetchAllCourses = async () => {
  try {
    setLoading(true);

    const response = await axios.get(
      `${backendUrl}/api/course/all`,
      {
        params: {
          page: 1,
          limit: 20,
        },
      }
    );

    if (response.data?.success) {
      setAllCourses(response.data.courses);
    } else {
      // Silent fail - courses will show as empty
    }
  } catch (error) {
    // Silent fail - courses will show as empty

  } 
    finally {
      setLoading(false);
  }
};


const fetchUserData = async () => {
  try {
    setLoading(true);

    const token = await getToken();

    if (!token) {
      // Silent fail - user not authenticated
      return;
    }

    const { data } = await axios.get(
      `${backendUrl}/api/user/data`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data?.success) {
      setUserData(data.user);

      // Role should ideally come from backend
      if (data.user?.role === "educator") {
        setIsEducator(true);
      }
    } else {
      // Silent fail
    }
  } catch (error) {
    // Silent fail
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchAllCourses();

}, []);

useEffect(() => {
  if(user){
    fetchUserData();
    fetchUserEnrolledCourses();
  }
}, [user])





  const toggleLectureCompletion = (courseId, chapterIndex, lectureIndex) => {
    setCompletedLectures((prev) => {
      const key = `${courseId}_${chapterIndex}_${lectureIndex}`;
      const newState = { ...prev };
      
      if (newState[key]) {
        delete newState[key];
      } else {
        newState[key] = true;
      }
      
      // Save to localStorage
      localStorage.setItem('completedLectures', JSON.stringify(newState));
      return newState;
    });
  };

  // Check if a lecture is completed
  const isLectureCompleted = (courseId, chapterIndex, lectureIndex) => {
    const key = `${courseId}_${chapterIndex}_${lectureIndex}`;
    return !!completedLectures[key];
  };

  // Get completed lecture count for a course
  const getCompletedLectureCount = (courseId) => {
    let count = 0;
    Object.keys(completedLectures).forEach((key) => {
      if (key.startsWith(`${courseId}_`)) {
        count++;
      }
    });
    return count;
  };

  // Function to calculate average rating of course
  const calculateRating = (course) => {
    // Use averageRating from backend if available
    if (course.averageRating && course.averageRating > 0) {
      return course.averageRating;
    }
    // Fallback to calculating from courseRatings array
    if (!course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating || rating;
    });
    return (totalRating / course.courseRatings.length).toFixed(1);
  };

  const calculateNoOfLectures=(course)=>{
      let totalLectures=0;
      course.courseContent.forEach(chapter=>{
        if(Array.isArray(chapter.chapterContent)){
          totalLectures+=chapter.chapterContent.length;
        }
      })
      return totalLectures;
  }


  const calculateChapterTime =  (chapter) => {
    let time = 0;
    chapter.chapterContent.forEach((lecture) => {
      time += lecture.lectureDuration;
    });
    return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
  };

  const calculateCourseDuration =  (course) => {
    let time = 0;
    if (course.courseContent) {
      course.courseContent.forEach((chapter) => {
        chapter.chapterContent.forEach((lecture) => {
          time += lecture.lectureDuration;
        });
      });
    }
    return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
  };

  const fetchUserEnrolledCourses = async () => {
  try {
    setLoading(true);

    const token = await getToken();
    if (!token) {
      // Silent fail - user not authenticated
      return;
    }

    const { data } = await axios.get(
      `${backendUrl}/api/user/enrolled-courses`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data?.success) {
      const courses = Array.isArray(data.enrolledCourses) ? [...data.enrolledCourses].reverse()  : [];
      setEnrolledCourses(courses);

    } else {
      // Silent fail
    }
  } catch (error) {
    // Silent fail
  }
   finally {
    setLoading(false);
  }
};


 
  useEffect(() => {
    if (user && user.publicMetadata.role === "educator") {
      setIsEducator(true);
    }
  }, [user]);

  const value = {
    currency,
    allCourses,
    setAllCourses,
    navigate,
    isEducator,
    setIsEducator,
    calculateRating,
    getToken,
    user,
    userData,
    setUserData,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    fetchUserEnrolledCourses,
    enrolledCourses,
    completedLectures,
    toggleLectureCompletion,
    isLectureCompleted,
    getCompletedLectureCount,
    fetchAllCourses,
    loading,
    fetchUserData,
    setLoading,
    backendUrl,
    authorizedGet,
    authorizedPost
    
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
