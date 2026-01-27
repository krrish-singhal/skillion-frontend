import React, { useState, useEffect, useRef, useContext } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { IoSearchOutline } from "react-icons/io5";

const SearchBar = ({ data }) => {
	const navigate = useNavigate();
	const { allCourses } = useContext(AppContext);
	const [input, setInput] = useState(data ? data : '');
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const searchRef = useRef(null);

	// Close suggestions when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setShowSuggestions(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Generate suggestions based on input
	useEffect(() => {
		if (input.length >= 3) {
			const searchTerm = input.toLowerCase();
			const matches = [];

			allCourses.forEach(course => {
				// Search in course title
				if (course.courseTitle?.toLowerCase().includes(searchTerm)) {
					matches.push({
						type: 'course',
						title: course.courseTitle,
						subtitle: `by ${course.educator?.name?.firstName || 'Unknown'} ${course.educator?.name?.lastName || ''}`,
						id: course._id,
						thumbnail: course.courseThumbnail
					});
				}

				// Search in educator name
				const educatorName = `${course.educator?.name?.firstName || ''} ${course.educator?.name?.lastName || ''}`.toLowerCase();
				if (educatorName.includes(searchTerm) && !matches.find(m => m.id === course._id)) {
					matches.push({
						type: 'educator',
						title: course.courseTitle,
						subtitle: `by ${course.educator?.name?.firstName || ''} ${course.educator?.name?.lastName || ''}`,
						id: course._id,
						thumbnail: course.courseThumbnail
					});
				}

				// Search in chapters and lectures
				course.courseContent?.forEach(chapter => {
					if (chapter.chapterTitle?.toLowerCase().includes(searchTerm)) {
						matches.push({
							type: 'chapter',
							title: chapter.chapterTitle,
							subtitle: `in ${course.courseTitle}`,
							id: course._id,
							thumbnail: course.courseThumbnail
						});
					}

					chapter.chapterContent?.forEach(lecture => {
						if (lecture.lectureTitle?.toLowerCase().includes(searchTerm)) {
							matches.push({
								type: 'lecture',
								title: lecture.lectureTitle,
								subtitle: `${chapter.chapterTitle} - ${course.courseTitle}`,
								id: course._id,
								thumbnail: course.courseThumbnail
							});
						}
					});
				});
			});

			// Limit to 5 suggestions
			setSuggestions(matches.slice(0, 5));
			setShowSuggestions(true);
		} else {
			setSuggestions([]);
			setShowSuggestions(false);
		}
	}, [input, allCourses]);

	const onSearchHandler = (e) => {
		e.preventDefault();
		if (input.trim()) {
			navigate('/course-list/' + input);
			setShowSuggestions(false);
		}
	};

	const handleSuggestionClick = (suggestion) => {
		navigate(`/course/${suggestion.id}`);
		setShowSuggestions(false);
		setInput('');
	};

	return (
		<div ref={searchRef} className="relative w-full">
			<form onSubmit={onSearchHandler} className="flex items-center bg-white border border-gray-300 rounded-full h-10 shadow-sm hover:shadow-md transition-shadow">
				<input
					onChange={e => setInput(e.target.value)}
					value={input}
					type="text"
					placeholder="Search courses, educators, lectures..."
					className="w-full h-full outline-none text-gray-700 px-4 bg-transparent rounded-l-full text-sm"
				/>
				<button
					type="submit"
					className="bg-yellow-400 hover:bg-yellow-500 rounded-full p-2 mr-1 flex items-center justify-center transition-colors"
				>
					<IoSearchOutline className="w-5 h-5 text-gray-700" />
				</button>
			</form>

			{/* Suggestions Dropdown */}
			{showSuggestions && suggestions.length > 0 && (
				<div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
					{suggestions.map((suggestion, index) => (
						<div
							key={index}
							onClick={() => handleSuggestionClick(suggestion)}
							className="flex items-center gap-3 p-3 hover:bg-yellow-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
						>
							{suggestion.thumbnail && (
								<img
									src={suggestion.thumbnail}
									alt={suggestion.title}
									className="w-12 h-12 rounded object-cover"
								/>
							)}
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-gray-800 truncate">
									{suggestion.title}
								</p>
								<p className="text-xs text-gray-500 truncate">
									{suggestion.subtitle}
								</p>
								<span className="inline-block mt-1 text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
									{suggestion.type}
								</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchBar;