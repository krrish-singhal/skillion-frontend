import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import uniqid from 'uniqid'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { backendUrl, getToken, authorizedGet } = useContext(AppContext);

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [chapters, setChapters] = useState([]);
  const [isPublished, setIsPublished] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [showChapterPopup, setShowChapterPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const [chapterTitle, setChapterTitle] = useState("");

  // Fetch existing course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const { data } = await authorizedGet(`${backendUrl}/api/educator/course/${courseId}`);
        
        if (data?.success) {
          const course = data.course;
          setCourseTitle(course.courseTitle);
          setCoursePrice(course.coursePrice);
          setDiscount(course.discount);
          setExistingThumbnail(course.courseThumbnail);
          setChapters(course.courseContent || []);
          setIsPublished(course.isPublished || false);
          
          // Set the description in Quill editor
          if (quillRef.current && course.courseDescription) {
            quillRef.current.root.innerHTML = course.courseDescription;
          }
        } else {
          toast.error("Failed to load course");
          navigate('/educator/my-courses');
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Failed to load course");
        navigate('/educator/my-courses');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link'],
            ['clean']
          ],
        },
      });
    }
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseTitle.trim()) {
      toast.error("Course title is required");
      return;
    }

    if (!chapters.length) {
      toast.error("At least one chapter is required");
      return;
    }

    try {
      const courseData = {
        courseTitle,
        courseDescription: quillRef.current.root.innerHTML,
        coursePrice: Number(coursePrice),
        discount: Number(discount),
        courseContent: chapters,
        isPublished,
      };

      const formData = new FormData();
      formData.append("courseData", JSON.stringify(courseData));
      
      if (image) {
        formData.append("image", image);
      }

      const token = await getToken();

      const { data } = await axios.put(
        `${backendUrl}/api/educator/course/${courseId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data?.success) {
        toast.success("Course updated successfully");
        navigate('/educator/my-courses');
      } else {
        toast.error("Unable to update course");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  const handleChapter = (action, chapterId = null) => {
    if (action === "add") {
      setShowChapterPopup(true);
    }

    if (action === "remove") {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    }
  };

  const addChapter = () => {
    if (!chapterTitle.trim()) {
      toast.error("Chapter name is required");
      return;
    }

    const newChapter = {
      chapterId: uniqid(),
      chapterTitle: chapterTitle,
      chapterOrder: chapters.length + 1,
      chapterContent: [],
    };

    setChapters([...chapters, newChapter]);
    setChapterTitle("");
    setShowChapterPopup(false);
    toast.success("Chapter added");
  };

  const handleLecture = (action, chapterId = null, lectureId = null) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    }

    if (action === "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            return {
              ...chapter,
              chapterContent: chapter.chapterContent.filter((lecture) => lecture.lectureId !== lectureId),
            };
          }
          return chapter;
        })
      );
    }
  };

  const addLecture = () => {
    if (!lectureDetails.lectureTitle.trim()) {
      toast.error("Lecture title is required");
      return;
    }

    if (!lectureDetails.lectureDuration) {
      toast.error("Lecture duration is required");
      return;
    }

    if (!lectureDetails.lectureUrl.trim()) {
      toast.error("Lecture URL is required");
      return;
    }

    const currentChapter = chapters.find(ch => ch.chapterId === currentChapterId);
    const currentLectureCount = currentChapter?.chapterContent?.length || 0;

    const newLecture = {
      lectureId: uniqid(),
      lectureTitle: lectureDetails.lectureTitle,
      lectureDuration: Number(lectureDetails.lectureDuration),
      lectureUrl: lectureDetails.lectureUrl,
      isPreviewFree: lectureDetails.isPreviewFree,
      lectureOrder: currentLectureCount + 1,
    };

    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          return {
            ...chapter,
            chapterContent: [...(chapter.chapterContent || []), newLecture],
          };
        }
        return chapter;
      })
    );

    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
    setShowPopup(false);
    toast.success("Lecture added");
  };

  if (loading) {
    return (
      <div className='p-8 bg-gray-50/30 min-h-screen flex items-center justify-center'>
        <div className='text-gray-500'>Loading course data...</div>
      </div>
    );
  }

  return (
    <div className='p-8 bg-gray-50/30 min-h-screen'>
      <form onSubmit={handleSubmit} className='max-w-4xl mx-auto'>
        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-3xl font-bold text-gray-800'>Edit Course</h2>
          <button
            type='button'
            onClick={() => navigate('/educator/my-courses')}
            className='px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors'
          >
            Cancel
          </button>
        </div>

        {/* Course Basic Info */}
        <div className='bg-white rounded-lg p-6 mb-6 shadow-sm'>
          <h3 className='text-xl font-semibold text-gray-800 mb-4'>Course Information</h3>
          
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Course Title</label>
              <input
                type="text"
                className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none'
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder='Enter course title'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Course Description</label>
              <div ref={editorRef} className='bg-white border border-gray-300 rounded' style={{ minHeight: '200px' }}></div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Price ($)</label>
                <input
                  type="number"
                  className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none'
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                  min="0"
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Discount (%)</label>
                <input
                  type="number"
                  className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none'
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Course Thumbnail</label>
              <div className='flex items-center gap-4'>
                {(existingThumbnail && !image) && (
                  <img src={existingThumbnail} alt="Current thumbnail" className='w-32 h-20 object-cover rounded' />
                )}
                {image && (
                  <img src={URL.createObjectURL(image)} alt="New thumbnail" className='w-32 h-20 object-cover rounded' />
                )}
                <label className='cursor-pointer'>
                  <div className='px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors'>
                    {image ? 'Change Image' : 'Upload New Image'}
                  </div>
                  <input
                    type="file"
                    className='hidden'
                    accept='image/*'
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className='bg-white rounded-lg p-6 mb-6 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-xl font-semibold text-gray-800'>Course Content</h3>
            <button
              type='button'
              onClick={() => handleChapter("add")}
              className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors'
            >
              + Add Chapter
            </button>
          </div>

          {chapters.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
              No chapters yet. Click "Add Chapter" to get started.
            </div>
          ) : (
            <div className='space-y-4'>
              {chapters.map((chapter, index) => (
                <div key={chapter.chapterId} className='border border-gray-200 rounded-lg p-4'>
                  <div className='flex items-center justify-between mb-3'>
                    <h4 className='font-semibold text-gray-800'>
                      Chapter {index + 1}: {chapter.chapterTitle}
                    </h4>
                    <button
                      type='button'
                      onClick={() => handleChapter("remove", chapter.chapterId)}
                      className='text-red-500 hover:text-red-700 text-sm'
                    >
                      Remove Chapter
                    </button>
                  </div>

                  {/* Lectures */}
                  <div className='mb-3'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-sm font-medium text-gray-700'>Lectures ({chapter.chapterContent?.length || 0})</span>
                      <button
                        type='button'
                        onClick={() => handleLecture("add", chapter.chapterId)}
                        className='text-sm text-blue-500 hover:text-blue-700'
                      >
                        + Add Lecture
                      </button>
                    </div>
                    {chapter.chapterContent?.length > 0 && (
                      <div className='space-y-1 ml-4'>
                        {chapter.chapterContent.map((lecture) => (
                          <div key={lecture.lectureId} className='flex items-center justify-between text-sm text-gray-600'>
                            <span>{lecture.lectureTitle} ({lecture.lectureDuration} min)</span>
                            <button
                              type='button'
                              onClick={() => handleLecture("remove", chapter.chapterId, lecture.lectureId)}
                              className='text-red-500 hover:text-red-700 text-xs'
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Publish Option */}
        <div className='bg-white rounded-lg p-6 mb-6 shadow-sm'>
          <div className='flex items-center gap-3'>
            <input
              type="checkbox"
              id="publishCheckbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className='w-5 h-5 text-yellow-500 border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 cursor-pointer'
            />
            <label htmlFor="publishCheckbox" className='text-sm font-medium text-gray-700 cursor-pointer'>
              Publish this course (make it visible to students)
            </label>
          </div>
          <p className='text-xs text-gray-500 mt-2 ml-8'>
            {isPublished ? 'This course is currently visible to students.' : 'This course is currently hidden from students (draft mode).'}
          </p>
        </div>

        {/* Submit Button */}
        <div className='flex gap-4'>
          <button
            type='submit'
            className='flex-1 bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors'
          >
            Update Course
          </button>
          <button
            type='button'
            onClick={() => navigate('/educator/my-courses')}
            className='px-8 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Add Lecture Popup */}
      {showPopup && (
        <div className='fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md relative'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>Add Lecture</h3>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Lecture Title</label>
                <input
                  type="text"
                  className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none'
                  value={lectureDetails.lectureTitle}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
                  placeholder='Enter lecture title'
                  autoFocus
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Duration (minutes)</label>
                <input
                  type="number"
                  className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none'
                  value={lectureDetails.lectureDuration}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
                  placeholder='e.g., 30'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Lecture URL</label>
                <input
                  type="url"
                  className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none'
                  value={lectureDetails.lectureUrl}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
                  placeholder='https://youtube.com/...'
                />
              </div>

              <div className='flex items-center gap-2'>
                <input
                  type="checkbox"
                  id='isPreviewFree'
                  className='w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500'
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
                />
                <label htmlFor='isPreviewFree' className='text-sm font-medium text-gray-700'>
                  Free Preview
                </label>
              </div>
            </div>

            <div className='flex gap-3 mt-6'>
              <button
                type='button'
                className='flex-1 bg-yellow-500 text-white px-4 py-2 rounded font-medium hover:bg-yellow-600 transition-colors'
                onClick={addLecture}
              >
                Add Lecture
              </button>
              <button
                type='button'
                className='px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors'
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>

            <img
              onClick={() => setShowPopup(false)}
              className='absolute top-4 right-4 w-4 cursor-pointer opacity-50 hover:opacity-100'
              src={assets.cross_icon}
              alt="close"
            />
          </div>
        </div>
      )}

      {/* Add Chapter Popup */}
      {showChapterPopup && (
        <div className='fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md relative'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>Add Chapter</h3>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Chapter Name</label>
              <input
                type="text"
                className='w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none'
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder='Enter chapter name'
                autoFocus
              />
            </div>

            <div className='flex gap-3 mt-6'>
              <button
                type='button'
                className='flex-1 bg-yellow-500 text-white px-4 py-2 rounded font-medium hover:bg-yellow-600 transition-colors'
                onClick={addChapter}
              >
                Add Chapter
              </button>
              <button
                type='button'
                className='px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors'
                onClick={() => {
                  setShowChapterPopup(false);
                  setChapterTitle('');
                }}
              >
                Cancel
              </button>
            </div>

            <img
              onClick={() => {
                setShowChapterPopup(false);
                setChapterTitle('');
              }}
              className='absolute top-4 right-4 w-4 cursor-pointer opacity-50 hover:opacity-100'
              src={assets.cross_icon}
              alt="close"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCourse
