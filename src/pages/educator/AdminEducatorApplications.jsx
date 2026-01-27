import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiLock, FiEye, FiCheckCircle, FiXCircle, FiClock, FiMail, FiUser, FiBriefcase, FiLink } from 'react-icons/fi';

const AdminEducatorApplications = () => {
  const { getToken } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const handlePasscodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/educator-application/verify-passcode`,
        { passcode }
      );

      if (response.data.success) {
        setIsAuthenticated(true);
        toast.success('Access granted!');
        fetchApplications(passcode);
      }
    } catch (error) {
      toast.error('Invalid passcode');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async (adminPasscode = passcode) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/educator-application/applications`,
        { passcode: adminPasscode }
      );

      if (response.data.success) {
        setApplications(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch applications');
    }
  };

  const handleStatusUpdate = async (applicationId, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus} this application?`)) {
      return;
    }

    setActionLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/educator-application/applications/${applicationId}/status`,
        {
          status: newStatus,
          passcode
        }
      );

      if (response.data.success) {
        toast.success(`Application ${newStatus} successfully!`);
        fetchApplications();
        setShowDetails(false);
        setSelectedApplication(null);
      }
    } catch (error) {
      toast.error('Failed to update application status');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: <FiClock /> },
      approved: { bg: 'bg-green-100', text: 'text-green-700', icon: <FiCheckCircle /> },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: <FiXCircle /> }
    };

    const style = styles[status];
    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${style.bg} ${style.text}`}>
        {style.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-start justify-center p-8 pt-32 pl-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border border-purple-300">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-purple-500 to-purple-600 rounded-full mb-4">
              <FiLock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600 text-sm">Enter Skillion admin passcode to continue</p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Admin Passcode</label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                className="w-full px-4 py-2.5 border-2 border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-linear-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? 'Verifying...' : 'Access Admin Panel'}
            </button>
          </form>

          <div className="mt-5 text-center text-xs text-gray-500">
            <p>🔒 Secure access for administrators only</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 md:p-8 max-w-6xl">
        <div className="mb-6 mt-10 ml-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Educator Applications</h1>
          <p className="text-gray-600">Review and manage educator applications</p>
        </div>

        <div className="grid gap-4">
            {applications.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="text-gray-400 text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Yet</h3>
                <p className="text-gray-500">New educator applications will appear here</p>
              </div>
            ) : (
              applications.map((app) => (
                <div key={app._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="flex flex-col xl:flex-row items-start gap-6">
                    <div className="flex-1 w-full min-w-0">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-linear-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0">
                          {app.fullName.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-bold text-gray-900 truncate">{app.fullName}</h3>
                          <p className="text-gray-600 text-sm truncate">{app.email}</p>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiBriefcase className="text-purple-500 shrink-0" />
                          <span className="truncate">{app.experienceLevel}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiClock className="text-purple-500 shrink-0" />
                          <span className="truncate">Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Domains:</p>
                        <div className="flex flex-wrap gap-2">
                          {app.domains.map((domain, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                              {domain}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-wrap">
                        {getStatusBadge(app.status)}
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setShowDetails(true);
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg font-medium transition-colors border border-purple-200"
                        >
                          <FiEye />
                          View Details
                        </button>
                      </div>
                    </div>

                    <div className="flex xl:flex-col flex-row gap-2.5 w-full xl:w-auto xl:min-w-37.5">
                      {app.status !== 'approved' && (
                        <button
                          onClick={() => handleStatusUpdate(app._id, 'approved')}
                          disabled={actionLoading}
                          className="flex-1 xl:w-full px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                        >
                          <FiCheckCircle className="text-lg" />
                          Approve
                        </button>
                      )}
                      {app.status !== 'rejected' && (
                        <button
                          onClick={() => handleStatusUpdate(app._id, 'rejected')}
                          disabled={actionLoading}
                          className="flex-1 xl:w-full px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                        >
                          <FiXCircle className="text-lg" />
                          Reject
                        </button>
                      )}
                      {app.status !== 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(app._id, 'pending')}
                          disabled={actionLoading}
                          className="flex-1 xl:w-full px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                        >
                          <FiClock className="text-lg" />
                          Pending
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-linear-to-r from-purple-500 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Application Details</h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FiUser className="text-purple-500" />
                  Personal Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><span className="font-semibold">Name:</span> {selectedApplication.fullName}</p>
                  <p><span className="font-semibold">Email:</span> {selectedApplication.email}</p>
                  <p><span className="font-semibold">Experience:</span> {selectedApplication.experienceLevel}</p>
                  <p><span className="font-semibold">Availability:</span> {selectedApplication.availability}</p>
                </div>
              </div>

              {/* Domains & Skills */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Teaching Domains & Skills</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-semibold mb-2">Domains:</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedApplication.domains.map((domain, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-medium">
                        {domain}
                      </span>
                    ))}
                  </div>
                  <p className="font-semibold mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.skills.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proof Links */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FiLink className="text-purple-500" />
                  Proof of Expertise
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {selectedApplication.proofLinks.github && (
                    <p>
                      <span className="font-semibold">GitHub:</span>{' '}
                      <a href={selectedApplication.proofLinks.github} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                        {selectedApplication.proofLinks.github}
                      </a>
                    </p>
                  )}
                  {selectedApplication.proofLinks.portfolio && (
                    <p>
                      <span className="font-semibold">Portfolio:</span>{' '}
                      <a href={selectedApplication.proofLinks.portfolio} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                        {selectedApplication.proofLinks.portfolio}
                      </a>
                    </p>
                  )}
                  {selectedApplication.proofLinks.linkedin && (
                    <p>
                      <span className="font-semibold">LinkedIn:</span>{' '}
                      <a href={selectedApplication.proofLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                        {selectedApplication.proofLinks.linkedin}
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {/* Motivation */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Why They Want to Teach</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedApplication.motivation}</p>
                </div>
              </div>

              {/* Target Audience */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Target Audience</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedApplication.targetAudience}</p>
                </div>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Application Status</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {getStatusBadge(selectedApplication.status)}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                {selectedApplication.status !== 'approved' && (
                  <button
                    onClick={() => handleStatusUpdate(selectedApplication._id, 'approved')}
                    disabled={actionLoading}
                    className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <FiCheckCircle />
                    Approve
                  </button>
                )}
                {selectedApplication.status !== 'rejected' && (
                  <button
                    onClick={() => handleStatusUpdate(selectedApplication._id, 'rejected')}
                    disabled={actionLoading}
                    className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <FiXCircle />
                    Reject
                  </button>
                )}
                {selectedApplication.status !== 'pending' && (
                  <button
                    onClick={() => handleStatusUpdate(selectedApplication._id, 'pending')}
                    disabled={actionLoading}
                    className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <FiClock />
                    Mark Pending
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminEducatorApplications;
