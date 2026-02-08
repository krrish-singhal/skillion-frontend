import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { currency, backendUrl, getToken, isEducator } = useContext(AppContext);

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const token = await getToken();
      if (!token) {
        toast.error("Authentication failed");
        return;
      }

      const { data } = await axios.get(
        `${backendUrl}/api/educator/dashboard`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data?.success) {
        setDashboardData(data.dashboardData);
      } else {
        // Set empty dashboard data instead of null
        setDashboardData({
          totalCourses: 0,
          totalEarnings: 0,
          enrolledStudentsData: []
        });
      }
    } catch (error) {
      console.error("Dashboard error:", error);
      // Set empty dashboard data on error
      setDashboardData({
        totalCourses: 0,
        totalEarnings: 0,
        enrolledStudentsData: []
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEducator) {
      fetchDashboardData();
    }
  }, [isEducator]);

	if (loading) {
		return (
			<div className="p-8 bg-gray-50/30 min-h-screen flex items-center justify-center">
				<div className="text-gray-500">Loading dashboard...</div>
			</div>
		);
	}

	if (!isEducator) {
		return (
			<div className="p-8 bg-gray-50/30 min-h-screen flex items-center justify-center">
				<div className="text-center">
					<p className="text-gray-500 mb-4">You need educator access to view this dashboard.</p>
					<button
						onClick={() => window.location.href = '/become-educator'}
						className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg"
					>
						Become an Educator
					</button>
				</div>
			</div>
		);
	}

	if (!dashboardData) {
		return (
			<div className="p-8 bg-gray-50/30 min-h-screen flex items-center justify-center">
				<div className="text-gray-500">Loading your dashboard data...</div>
			</div>
		);
	}

	return (
		<div className="p-8 bg-gray-50/30 min-h-screen">
			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
				{/* Total Enrollments */}
				<div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-4">
					<div className="bg-blue-50 p-3 rounded-lg">
						<img src={assets.patients_icon} alt="enrollments" className="w-8 h-8" />
					</div>
					<div>
						<p className="text-3xl font-semibold text-gray-800">
							{dashboardData?.enrolledStudentsData?.length || 0}
						</p>
						<p className="text-sm text-gray-500">Total Enrollments</p>
					</div>
				</div>

				{/* Total Courses */}
				<div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-4">
					<div className="bg-blue-50 p-3 rounded-lg">
						<img src={assets.appointments_icon} alt="courses" className="w-8 h-8" />
					</div>
					<div>
						<p className="text-3xl font-semibold text-gray-800">
							{dashboardData?.totalCourses || 0}
						</p>
						<p className="text-sm text-gray-500">Total Courses</p>
					</div>
				</div>

				{/* Total Earnings */}
				<div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center gap-4">
					<div className="bg-blue-50 p-3 rounded-lg">
						<img src={assets.earning_icon} alt="earnings" className="w-8 h-8" />
					</div>
					<div>
						<p className="text-3xl font-semibold text-gray-800">
							{currency}{dashboardData?.totalEarnings || 0}
						</p>
						<p className="text-sm text-gray-500">Total Earnings</p>
					</div>
				</div>
			</div>

			{/* Latest Enrollments Table */}
			<div className="bg-white rounded-lg border border-gray-200">
				<h2 className="text-lg font-semibold text-gray-800 p-6 border-b border-gray-200">
					Latest Enrollments
				</h2>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50 border-b border-gray-200">
							<tr>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 w-16">
									#
								</th>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
									Student Name
								</th>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
									Course Title
								</th>
								<th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
									Date
								</th>
							</tr>
						</thead>
						<tbody>
							{dashboardData?.enrolledStudentsData?.length > 0 ? (
								dashboardData.enrolledStudentsData.map((item, index) => (
								<tr
									key={index}
									className={`border-b border-gray-100 hover:bg-gray-50 ${
										index === 3 ? "bg-blue-50" : ""
									}`}
								>
									<td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
									<td className="px-6 py-4">
										<div className="flex items-center gap-3">
											<img
												src={item.student.imageUrl}
												alt={item.student.name ? `${item.student.name.firstName} ${item.student.name.lastName || ''}`.trim() : 'Student'}
												className="w-10 h-10 rounded-full object-cover"
											/>
											<span className="text-sm text-gray-800 font-medium">
												{item.student.name ? `${item.student.name.firstName} ${item.student.name.lastName || ''}`.trim() : 'Unknown Student'}
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
								))
							) : (
								<tr>
									<td colSpan="4" className="px-6 py-8 text-center text-gray-500">
										No enrollments yet
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;