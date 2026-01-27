import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const Badges = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/badges`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setBadges(response.data.data);
    } catch (error) {
      console.error('Error fetching badges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMissingBadges = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      
      // Use force-create endpoint which creates progress + badge for enrolled courses
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/force-create-badges`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      if (response.data.success) {
        const created = response.data.data.results.filter(r => r.status === 'badge_created').length;
        alert(`Success! Created ${created} badge(s) for your enrolled courses!`);
        fetchBadges(); // Refresh the badges list
      }
    } catch (error) {
      console.error('Error generating missing badges:', error);
      alert('Failed to generate badges: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your badges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Your Badges</h1>
            <div className="flex gap-3">
              {badges.length === 0 && (
                <button
                  onClick={handleGenerateMissingBadges}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  disabled={loading}
                >
                  🔄 Generate Badges
                </button>
              )}
              <button
                onClick={() => navigate('/skill-tracker-dashboard')}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← Back to Tracker
              </button>
            </div>
          </div>
          <p className="text-gray-600">
            {badges.length === 0 
              ? 'Complete courses to earn your first badge!' 
              : `You've earned ${badges.length} badge${badges.length !== 1 ? 's' : ''}! Keep learning to earn more.`
            }
          </p>
        </div>

        {/* Badges Grid */}
        {badges.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Badges Yet</h2>
            <p className="text-gray-600 mb-6">
              Complete courses with 100% progress to earn your first Skillion badge!
            </p>
            <button
              onClick={() => navigate('/my-enrollments')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              View My Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <div
                key={badge._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                {/* Badge Header with Color and Logo */}
                <div
                  className="h-40 flex items-center justify-center p-8 relative"
                  style={{ backgroundColor: badge.badgeColor }}
                >
                  {badge.badgeIcon.startsWith('http') ? (
                    <div className="relative">
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center p-6 shadow-2xl">
                        <img 
                          src={badge.badgeIcon} 
                          alt={badge.badgeName}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<div class="text-4xl font-bold text-gray-800">🏆</div>';
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-7xl">
                      {badge.badgeIcon}
                    </div>
                  )}
                </div>

                {/* Badge Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {badge.badgeName}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {badge.description || `Successfully completed ${badge.courseName} with 100% progress`}
                  </p>

                  <div className="space-y-3 text-sm border-t pt-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-gray-500 font-medium">Course:</span>
                      <span className="font-semibold text-gray-900 text-right flex-1">
                        {badge.courseName}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-medium">Earned:</span>
                      <span className="font-semibold text-gray-900">
                        {formatDate(badge.earnedAt)}
                      </span>
                    </div>
                    
                    <div className="pt-3 mt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">ID:</span>
                        <span className="text-xs text-gray-600 font-mono bg-gray-50 px-2 py-1 rounded">
                          {badge.verificationId}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge Footer */}
                <div className="px-6 py-4 bg-linear-to-r from-gray-50 to-gray-100 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="font-bold text-indigo-600">Skillion</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Verified Badge
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        {badges.length > 0 && (
          <div className="mt-8 bg-linear-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎓</span>
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">About Your Badges</h3>
                <ul className="text-indigo-800 text-sm space-y-1">
                  <li>• Each badge represents 100% completion of a course</li>
                  <li>• Badges are verified with unique IDs</li>
                  <li>• Share your achievements with potential employers</li>
                  <li>• Collect badges across different skill tracks</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Badges;
