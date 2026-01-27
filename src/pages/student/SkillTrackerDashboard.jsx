import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const SkillTrackerDashboard = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tracker, setTracker] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchTrackerData();
  }, []);

  const fetchTrackerData = async () => {
    try {
      const token = await getToken();
      
      const [trackerRes, statsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/tracker`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/dashboard-stats`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setTracker(trackerRes.data.data);
      setStats(statsRes.data.data);
    } catch (error) {
      console.error('Error fetching tracker:', error);
      if (error.response?.status === 404) {
        navigate('/skill-tracker-form');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'unlocked':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'unlocked':
        return '🔓';
      case 'in-progress':
        return '🚧';
      default:
        return '🔒';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your skill tracker...</p>
        </div>
      </div>
    );
  }

  if (!tracker) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No skill tracker found</p>
          <button
            onClick={() => navigate('/skill-tracker-form')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Create Skill Tracker
          </button>
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
            <h1 className="text-3xl font-bold text-gray-900">Skill Tracker</h1>
            <button
              onClick={() => navigate('/badges')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <span>🏆</span>
              <span>View Badges ({stats?.badges || 0})</span>
            </button>
          </div>
          <p className="text-gray-600">Track your progress towards becoming a {tracker.careerGoalLabel}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Overall Progress</span>
              <span className="text-2xl">📊</span>
            </div>
            <div className="text-3xl font-bold text-indigo-600">{stats?.overallProgress || 0}%</div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{ width: `${stats?.overallProgress || 0}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Skills Completed</span>
              <span className="text-2xl">✅</span>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {stats?.completedSkills || 0}/{stats?.totalSkills || 0}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Badges Earned</span>
              <span className="text-2xl">🏆</span>
            </div>
            <div className="text-3xl font-bold text-yellow-600">{stats?.badges || 0}</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Enrolled Courses</span>
              <span className="text-2xl">📚</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">{stats?.enrolledCourses || 0}</div>
          </div>
        </div>

        {/* Completion Card */}
        {tracker.isCompleted && (
          <div className="bg-linear-to-r from-green-400 to-blue-500 rounded-lg shadow-lg p-8 mb-8 text-white">
            <div className="flex items-center gap-4">
              <div className="text-6xl">🎉</div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Congratulations! Track Completed!</h2>
                <p className="text-green-50 mb-2">
                  You've successfully completed your {tracker.careerGoalLabel} learning track!
                </p>
                <p className="text-sm font-mono bg-white/20 inline-block px-3 py-1 rounded">
                  Verification ID: {tracker.verificationId}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Roadmap */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {tracker.careerGoalLabel} Roadmap
          </h2>

          <div className="space-y-4">
            {tracker.roadmap && tracker.roadmap.map((skill, index) => (
              <div
                key={index}
                className={`border-2 rounded-lg p-6 transition-all ${getStatusColor(skill.status)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getStatusIcon(skill.status)}</span>
                      <h3 className="text-lg font-bold">
                        {index + 1}. {skill.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                        skill.status === 'completed' ? 'bg-green-200 text-green-800' :
                        skill.status === 'unlocked' ? 'bg-blue-200 text-blue-800' :
                        skill.status === 'in-progress' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {skill.status}
                      </span>
                    </div>

                    {skill.skills && skill.skills.length > 0 && (
                      <div className="ml-11 mb-3">
                        <div className="flex flex-wrap gap-2">
                          {skill.skills.map((subSkill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-white/50 rounded-full text-xs font-medium"
                            >
                              {subSkill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {skill.status !== 'locked' && (
                      <div className="ml-11">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-white/50 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-full transition-all rounded-full ${
                                skill.status === 'completed' ? 'bg-green-600' :
                                skill.status === 'in-progress' ? 'bg-yellow-600' :
                                'bg-blue-600'
                              }`}
                              style={{ width: `${skill.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold min-w-12">
                            {skill.progress || 0}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-blue-900 mb-2">How to Progress</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Complete courses related to each skill to unlock progress</li>
                <li>• Earn badges by completing courses with 100% progress</li>
                <li>• Skills unlock sequentially as you complete the previous one</li>
                <li>• Projects and assessments are mandatory for skill completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTrackerDashboard;
