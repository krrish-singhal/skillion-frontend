import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { FiAward, FiCalendar, FiClock, FiCheck, FiDownload } from 'react-icons/fi';
import Footer from '../../components/student/Footer';

const Certificate = () => {
  const { certificateId } = useParams();
  const { getToken } = useAuth();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificate();
  }, [certificateId]);

  const fetchCertificate = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/certificate/${certificateId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCertificate(response.data.data);
    } catch (error) {
      console.error('Error fetching certificate:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    return `${hours}+ hours`;
  };

  const handleDownload = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Certificate Not Found</h2>
          <p className="text-gray-600">This certificate does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        {/* Action Buttons */}
        <div className="max-w-5xl mx-auto mb-8 flex justify-end gap-4 print:hidden">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors shadow-lg"
          >
            <FiDownload className="w-5 h-5" />
            Download Certificate
          </button>
        </div>

        {/* Certificate Container */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-yellow-400">
          {/* Header with Logo Background */}
          <div className="relative bg-linear-to-br from-yellow-400 via-yellow-500 to-orange-400 p-12 text-center">
            {/* Course Logo/Thumbnail */}
            {certificate.courseThumbnail && (
              <div className="absolute top-6 left-6 w-24 h-24 rounded-full overflow-hidden bg-white p-2 shadow-lg">
                <img 
                  src={certificate.courseThumbnail} 
                  alt="Course" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}
            
            <div className="text-white">
              <FiAward className="w-20 h-20 mx-auto mb-4" />
              <h1 className="text-5xl font-bold mb-2">Certificate of Completion</h1>
              <p className="text-xl font-medium">Skillion Learning Platform</p>
            </div>
          </div>

          {/* Certificate Content */}
          <div className="p-12">
            {/* Recipient Name */}
            <div className="text-center mb-8">
              <p className="text-gray-600 text-lg mb-2">This is to certify that</p>
              <h2 className="text-5xl font-bold text-gray-900 mb-2 font-serif">
                {certificate.userName}
              </h2>
              <p className="text-gray-600 text-lg">has successfully completed</p>
            </div>

            {/* Course Title */}
            <div className="text-center mb-12 bg-linear-to-r from-yellow-50 to-orange-50 p-8 rounded-xl border-2 border-yellow-200">
              <h3 className="text-3xl font-bold text-gray-900">
                {certificate.courseTitle}
              </h3>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <FiCheck className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-gray-600 text-sm mb-1">Lectures Completed</p>
                <p className="text-2xl font-bold text-gray-900">{certificate.totalLectures}</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <FiClock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-gray-600 text-sm mb-1">Learning Time</p>
                <p className="text-2xl font-bold text-gray-900">{formatDuration(certificate.totalDuration)}</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <FiCalendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="text-gray-600 text-sm mb-1">Completion Date</p>
                <p className="text-2xl font-bold text-gray-900">{formatDate(certificate.completionDate)}</p>
              </div>
            </div>

            {/* Certificate ID & Signature */}
            <div className="flex justify-between items-end border-t-2 border-gray-200 pt-8">
              <div>
                <p className="text-sm text-gray-600 mb-1">Certificate ID</p>
                <p className="text-lg font-mono font-bold text-gray-900">{certificate.certificateId}</p>
                <p className="text-xs text-gray-500 mt-2">Verify at: skillion.com/verify/{certificate.certificateId}</p>
              </div>
              <div className="text-right">
                <div className="w-48 border-t-2 border-gray-900 mb-2"></div>
                <p className="text-sm font-semibold text-gray-900">Skillion Team</p>
                <p className="text-xs text-gray-600">Learning Platform Administrator</p>
              </div>
            </div>
          </div>

          {/* Footer Badge */}
          <div className="bg-linear-to-r from-yellow-400 to-orange-400 py-4 text-center">
            <p className="text-white font-semibold">
              🏆 Congratulations on your achievement!
            </p>
          </div>
        </div>

        {/* Verification Notice */}
        <div className="max-w-5xl mx-auto mt-8 text-center text-gray-600 print:hidden">
          <p className="text-sm">
            This certificate can be verified online at any time using the certificate ID.
          </p>
          <p className="text-xs mt-2">
            © 2026 Skillion Learning Platform. All rights reserved.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Certificate;
