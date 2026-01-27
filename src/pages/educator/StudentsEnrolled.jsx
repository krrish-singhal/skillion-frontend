import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";


const StudentsEnrolled = () => {
  const { backendUrl, getToken, isEducator } = useContext(AppContext);

  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEnrolledStudents = async () => {
    try {
      setLoading(true);

      const token = await getToken();
      if (!token) {
        toast.error("Authentication failed");
        return;
      }

      const { data } = await axios.get(
        `${backendUrl}/api/educator/enrolled-students`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data?.success) {
        const students = Array.isArray(data.enrolledStudents)
          ? [...data.enrolledStudents].reverse()
          : [];

        setEnrolledStudents(students);
      } else {
        toast.error("Unable to load enrolled students");
      }
    } catch (error) {
      toast.error("Network error. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchEnrolledStudents();
    } else {
      setEnrolledStudents([]);
    }
  }, [isEducator]);


	return (
		<div className="p-8 bg-gray-50/30 min-h-screen">
			<h2 className="text-2xl font-semibold text-gray-800 mb-6">Students Enrolled</h2>
			<div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50 border-b border-gray-200">
							<tr>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 w-16">
									#
								</th>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
									Student Name
								</th>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
									Course Title
								</th>
								<th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
									Date
								</th>
							</tr>
						</thead>
						<tbody>
							{enrolledStudents.map((item, index) => (
								<tr
									key={index}
									className="border-b border-gray-100 hover:bg-gray-50"
								>
									<td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-3">
											<img
												src={item?.student?.imageUrl}
												alt={item?.student?.name ? `${item.student.name.firstName} ${item.student.name.lastName || ''}`.trim() : 'Student'}
												className="w-10 h-10 rounded-full object-cover"
											/>
											<span className="text-sm text-gray-800 font-medium">
												{item?.student?.name ? `${item.student.name.firstName} ${item.student.name.lastName || ''}`.trim() : 'Unknown Student'}
											</span>
										</div>
									</td>
									<td className="px-6 py-4 text-sm text-blue-600">
										{item.courseTitle}
									</td>
									<td className="px-6 py-4 text-sm text-gray-600">
										{new Date(item.purchaseDate).toLocaleDateString("en-US", {
											day: "numeric",
											month: "short",
											year: "numeric",
										})}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default StudentsEnrolled;