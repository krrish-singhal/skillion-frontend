import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const MyCourses = () => {
	const { currency, backendUrl, authorizedGet, getToken } = useContext(AppContext);
	const navigate = useNavigate();
	
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState(null);

	const fetchCourses = async () => {
		try {
			setLoading(true);
			const { data } = await authorizedGet(`${backendUrl}/api/educator/courses`);
			
			if (data?.success) {
				setCourses(data.courses || []);
			} else {
				toast.error("Unable to load courses");
			}
		} catch (error) {
			console.error("Error fetching courses:", error);
			toast.error("Network error. Please refresh the page.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

	const handleDeleteClick = (course) => {
		setSelectedCourse(course);
		setShowDeleteModal(true);
	};

	const handleEditClick = (course) => {
		setSelectedCourse(course);
		setShowEditModal(true);
	};

	const confirmDelete = async () => {
		try {
			const token = await getToken();
			const { data } = await axios.delete(
				`${backendUrl}/api/educator/course/${selectedCourse._id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			if (data?.success) {
				toast.success("Course deleted successfully");
				fetchCourses();
			} else {
				toast.error("Unable to delete course");
			}
		} catch (error) {
			console.error("Error deleting course:", error);
			toast.error("Unable to delete course");
		} finally {
			setShowDeleteModal(false);
			setSelectedCourse(null);
		}
	};

	const confirmEdit = () => {
		// Navigate to edit page with course data
		navigate(`/educator/edit-course/${selectedCourse._id}`);
		setShowEditModal(false);
		setSelectedCourse(null);
	};

	const togglePublish = async (courseId, currentStatus) => {
		try {
			const token = await getToken();
			const { data } = await axios.patch(
				`${backendUrl}/api/educator/course/${courseId}/publish`,
				{ isPublished: !currentStatus },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			if (data?.success) {
				toast.success(data.message);
				fetchCourses();
			} else {
				toast.error("Unable to update course status");
			}
		} catch (error) {
			console.error("Error toggling publish:", error);
			toast.error("Unable to update course status");
		}
	};

	return (
		<div className="p-8 bg-gray-50/30 min-h-screen">
			<h2 className="text-2xl font-semibold text-gray-800 mb-6">My Courses</h2>
			
			{loading ? (
				<div className="flex justify-center items-center h-64">
					<div className="text-gray-500">Loading courses...</div>
				</div>
			) : courses.length === 0 ? (
				<div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
					<p className="text-gray-500 mb-4">You haven't created any courses yet</p>
					<p className="text-sm text-gray-400">Click on "Add Course" to create your first course</p>
				</div>
			) : (
				<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50 border-b border-gray-200">
								<tr>
									<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
										Course
									</th>
									<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
										Status
									</th>
									<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
										Price
									</th>
									<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
										Earnings
									</th>
									<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
										Students
									</th>
									<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
										Date
									</th>
									<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{courses.map((course, index) => {
								const finalPrice = course.coursePrice - (course.discount * course.coursePrice) / 100;
								const earnings = (course.enrolledStudents.length * finalPrice).toFixed(2);
								
								return (
									<tr
										key={course._id}
										className="border-b border-gray-100 hover:bg-gray-50"
									>
										<td className="px-6 py-4">
											<div className="flex items-center gap-4">
												<img
													src={course.courseThumbnail}
													alt={course.courseTitle}
													className="w-20 h-12 object-cover rounded"
												/>
												<span className="text-sm font-medium text-gray-800">
													{course.courseTitle}
												</span>
											</div>
										</td>
										<td className="px-6 py-4">
											<span className={`px-3 py-1 rounded-full text-xs font-medium ${course.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
												{course.isPublished ? 'Published' : 'Unpublished'}
											</span>
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											{finalPrice === 0 ? "Free" : `${currency}${finalPrice.toFixed(2)}`}
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											{currency}{earnings}
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											{course.enrolledStudents.length}
										</td>
										<td className="px-6 py-4 text-sm text-gray-600">
											{new Date(course.createdAt).toLocaleDateString("en-US", {
												day: "numeric",
											month: "short",
											year: "numeric"
										})}
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-2">
											<button
												onClick={() => handleEditClick(course)}
												className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
												title="Edit course"
											>
												<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
												</svg>
											</button>
											<button
												onClick={() => handleDeleteClick(course)}
												className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
												title="Delete course"
											>
												<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
												</svg>
											</button>
										</div>
									</td>
									</tr>
								);
								})}
							</tbody>
						</table>
					</div>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{showDeleteModal && (
				<div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
						<h3 className="text-xl font-bold text-gray-800 mb-4">Delete Course</h3>
						<p className="text-gray-600 mb-6">Are you sure you want to delete?</p>
						
						<div className="flex gap-3">
							<button
								onClick={() => {
									setShowDeleteModal(false);
									setSelectedCourse(null);
								}}
								className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
							>
								Cancel
							</button>
							<button
								onClick={confirmDelete}
								className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
							>
								OK
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Edit Confirmation Modal */}
			{showEditModal && (
				<div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
						<h3 className="text-xl font-bold text-gray-800 mb-4">Edit Course</h3>
						<p className="text-gray-600 mb-2">Are you sure you want to edit this course?</p>
						<p className="text-sm font-semibold text-gray-800 mb-6">"{selectedCourse?.courseTitle}"</p>
						
						<div className="flex gap-3">
							<button
								onClick={() => {
									setShowEditModal(false);
									setSelectedCourse(null);
								}}
								className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={confirmEdit}
								className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
							>
								Edit
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MyCourses;