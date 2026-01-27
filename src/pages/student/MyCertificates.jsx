import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { FiAward, FiCalendar, FiExternalLink, FiClock } from 'react-icons/fi';
import Footer from '../../components/student/Footer';

const MyCertificates = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/certificate/my-certificates`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCertificates(response.data.data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    return `${hours}+ hours`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="text-center">
            <FiAward className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              My Certificates
            </h1>
            <p className="text-lg text-gray-600">
              Your achievements and completed courses
            </p>
          </div>
        </div>

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <FiAward className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Certificates Yet
            </h2>
            <p className="text-gray-600 mb-8">
              Complete courses to earn certificates and showcase your achievements!
            </p>
            <button
              onClick={() => navigate('/course-list')}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate) => (
              <div
                key={certificate._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-yellow-400"
                onClick={() => navigate(`/certificate/${certificate.certificateId}`)}
              >
                {/* Certificate Thumbnail with Logo */}
                <div className="relative h-48 bg-linear-to-br from-yellow-400 via-yellow-500 to-orange-400 flex items-center justify-center">
                  {certificate.courseThumbnail ? (
                    <div className="absolute top-4 left-4 w-16 h-16 rounded-full overflow-hidden bg-white p-1 shadow-lg">
                      <img
                        src={certificate.courseThumbnail}
                        alt="Course"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  ) : null}
                  <FiAward className="w-20 h-20 text-white/90" />
                </div>

                {/* Certificate Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {certificate.courseTitle}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      <span>Completed {formatDate(certificate.completionDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiClock className="w-4 h-4" />
                      <span>{formatDuration(certificate.totalDuration)} of learning</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">Certificate ID</p>
                    <p className="text-sm font-mono font-semibold text-gray-900 mb-4">
                      {certificate.certificateId}
                    </p>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors">
                      <FiExternalLink className="w-4 h-4" />
                      View Certificate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {certificates.length > 0 && (
          <div className="max-w-4xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Your Learning Journey
            </h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-yellow-600 mb-2">
                  {certificates.length}
                </p>
                <p className="text-gray-600">Certificates Earned</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-yellow-600 mb-2">
                  {certificates.reduce((sum, cert) => sum + cert.totalLectures, 0)}
                </p>
                <p className="text-gray-600">Lectures Completed</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-yellow-600 mb-2">
                  {Math.floor(certificates.reduce((sum, cert) => sum + cert.totalDuration, 0) / 60)}+
                </p>
                <p className="text-gray-600">Hours of Learning</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyCertificates;
