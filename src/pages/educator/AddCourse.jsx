import React, { useContext, useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'

const AddCourse = () => {
  const { backendUrl, getToken, authorizedGet, authorizedPost } = useContext(AppContext);

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isPublished, setIsPublished] = useState(true);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseTitle.trim()) {
      toast.error("Course title is required");
      return;
    }

    if (!image) {
      toast.error("Course thumbnail is required");
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
      formData.append("image", image);

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/educator/add-course`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data?.success) {
        toast.success("Course added successfully");

        setCourseTitle("");
        setCoursePrice(0);
        setDiscount(0);
        setImage(null);
        setChapters([]);
        setIsPublished(true);
        quillRef.current.root.innerHTML = "";
      } else {
        toast.error("Unable to add course. Please try again.");
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
      setChapters((prev) =>
        prev.filter((chapter) => chapter.chapterId !== chapterId)
      );
    }

    if (action === "toggle") {
      setChapters((prev) =>
        prev.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = (action, chapterId, lectureIndex = null) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    }

    if (action === "remove") {
      setChapters((prev) =>
        prev.map((chapter) => {
          if (chapter.chapterId !== chapterId) return chapter;

          return {
            ...chapter,
            chapterContent: chapter.chapterContent.filter(
              (_, index) => index !== lectureIndex
            ),
          };
        })
      );
    }
  };

  const addLecture = () => {
    if (!lectureDetails.lectureTitle || !lectureDetails.lectureUrl) {
      toast.error("Lecture title and URL are required");
      return;
    }

    setChapters((prev) =>
      prev.map((chapter) => {
        if (chapter.chapterId !== currentChapterId) return chapter;

        const newLecture = {
          ...lectureDetails,
          lectureId: uniqid(),
          lectureOrder: chapter.chapterContent.length + 1,
          lectureDuration: Number(lectureDetails.lectureDuration),
        };

        return {
          ...chapter,
          chapterContent: [...chapter.chapterContent, newLecture],
        };
      })
    );

    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const addChapter = () => {
    if (!chapterTitle.trim()) {
      toast.error("Please enter chapter name");
      return;
    }
    const newChapter = {
      chapterId: uniqid(),
      chapterTitle: chapterTitle,
      chapterContent: [],
      collapsed: false,
      chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
    };
    setChapters([...chapters, newChapter]);
    setShowChapterPopup(false);
    setChapterTitle('');
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write course description here...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'header': [1, 2, 3, false] }],
            ['link'],
            ['clean']
          ]
        }
      })
    }
  }, [])

  return (
    <div className='p-8 bg-gray-50/30 min-h-screen overflow-auto'>
      <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Add New Course</h2>
      
      <form onSubmit={handleSubmit} className='bg-white rounded-lg border border-gray-200 p-8 max-w-4xl'>
        
        {/* Course Title */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>Course Title</label>
          <input
            onChange={e => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder='Enter course title'
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none'
            required
          />
        </div>

        {/* Course Description */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>Course Description</label>
          <div ref={editorRef} className='bg-white border border-gray-300 rounded-lg min-h-50'></div>
        </div>

        {/* Price and Discount */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Course Price ($)</label>
            <input
              onChange={e => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder='0'
              min="0"
              step="0.01"
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-semibold text-gray-700 mb-2'>Discount (%)</label>
            <input
              onChange={e => setDiscount(e.target.value)}
              value={discount}
              type="number"
              placeholder='0'
              min={0}
              max={100}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none'
              required
            />
          </div>
        </div>

        {/* Course Thumbnail */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700 mb-2'>Course Thumbnail</label>
          <label htmlFor="thumbnailImage" className='flex items-center gap-4 cursor-pointer'>
            <div className='flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 transition-colors'>
              {image ? (
                <img src={URL.createObjectURL(image)} alt="thumbnail" className='w-full h-full object-cover rounded-lg' />
              ) : (
                <div className='text-center'>
                  <img src={assets.file_upload_icon} alt="upload" className='w-12 h-12 mx-auto mb-2 opacity-50' />
                  <span className='text-xs text-gray-500'>Upload Image</span>
                </div>
              )}
            </div>
            <input
              type="file"
              id='thumbnailImage'
              onChange={e => setImage(e.target.files[0])}
              accept="image/*"
              hidden
            />
          </label>
        </div>

        {/* Chapters Section */}
        <div className='mb-6'>
          <label className='block text-sm font-semibold text-gray-700 mb-4'>Course Content</label>
          
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className='bg-gray-50 border border-gray-200 rounded-lg mb-4'>
              <div className='flex justify-between items-center p-4 border-b border-gray-200'>
                <div className='flex items-center gap-3'>
                  <img
                    onClick={() => handleChapter('toggle', chapter.chapterId)}
                    width={14}
                    className={`cursor-pointer transition-transform ${chapter.collapsed && "-rotate-90"}`}
                    src={assets.dropdown_icon}
                    alt="toggle"
                  />
                  <span className='font-semibold text-gray-800'>
                    Chapter {chapterIndex + 1}: {chapter.chapterTitle}
                  </span>
                  <span className='text-sm text-gray-500'>({chapter.chapterContent.length} lectures)</span>
                </div>
                <img
                  onClick={() => handleChapter('remove', chapter.chapterId)}
                  className='cursor-pointer w-4 h-4 opacity-50 hover:opacity-100'
                  src={assets.cross_icon}
                  alt="remove"
                />
              </div>

              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.length === 0 ? (
                    <p className='text-sm text-gray-500 mb-3'>No lectures added yet</p>
                  ) : (
                    <div className='space-y-2 mb-3'>
                      {chapter.chapterContent.map((lecture, lectureIndex) => (
                        <div key={lectureIndex} className='flex justify-between items-center bg-white p-3 rounded border border-gray-200'>
                          <div className='flex-1'>
                            <span className='text-sm text-gray-800'>
                              {lectureIndex + 1}. {lecture.lectureTitle}
                            </span>
                            <div className='flex gap-4 mt-1'>
                              <span className='text-xs text-gray-500'>{lecture.lectureDuration} mins</span>
                              <a href={lecture.lectureUrl} target='_blank' rel='noreferrer' className='text-xs text-blue-500 hover:underline'>
                                View Link
                              </a>
                              {lecture.isPreviewFree && (
                                <span className='text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded'>Free Preview</span>
                              )}
                            </div>
                          </div>
                          <img
                            onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}
                            src={assets.cross_icon}
                            alt="remove"
                            className='cursor-pointer w-4 h-4 opacity-50 hover:opacity-100'
                          />
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    type='button'
                    onClick={() => handleLecture('add', chapter.chapterId)}
                    className='text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition-colors'
                  >
                    + Add Lecture
                  </button>
                </div>
              )}
            </div>
          ))}

          <button
            type='button'
            className='w-full bg-yellow-50 text-yellow-700 py-3 rounded-lg font-medium hover:bg-yellow-100 transition-colors border border-yellow-200'
            onClick={() => handleChapter('add')}
          >
            + Add Chapter
          </button>
        </div>

        {/* Publish Option */}
        <div className='mb-6 bg-white rounded-lg p-6 shadow-sm'>
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
            {isPublished ? 'This course will be visible to students after creation.' : 'This course will be saved as draft and hidden from students.'}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors'
        >
          Create Course
        </button>
      </form>

      {/* Add Lecture Popup */}
      {showPopup && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4'>
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
        <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4'>
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

export default AddCourse