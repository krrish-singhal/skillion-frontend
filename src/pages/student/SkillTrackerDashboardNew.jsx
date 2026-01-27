import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import BadgePopup from '../../components/student/BadgePopup';

const SkillTrackerDashboardNew = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tracker, setTracker] = useState(null);
  const [stats, setStats] = useState(null);
  const [showBadgePopup, setShowBadgePopup] = useState(false);
  const [newBadge, setNewBadge] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // First refresh to unlock and complete skills
        console.log('[Load] Starting refresh...');
        const refreshResult = await refreshTrackerData();
        
        console.log('[Load] Refresh result:', refreshResult);
        
        if (refreshResult?.success && refreshResult?.data?.tracker) {
          console.log('[Load] Refresh successful, using returned data');
          console.log('[Load] Tracker roadmap:', refreshResult.data.tracker.roadmap?.map(s => ({ name: s.name, status: s.status, progress: s.progress })));
          
          const trackerData = refreshResult.data.tracker;
          
          // Use the tracker data returned from refresh
          setTracker(trackerData);
          
          // Calculate stats from the tracker data instead of fetching from DB
          const completedSkillsCount = trackerData.roadmap?.filter(s => s.status === 'completed').length || 0;
          
          // Fetch only badges and enrollment count from server
          const token = await getToken();
          const [badgesRes, enrollmentsRes] = await Promise.all([
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/badges`, {
              headers: { Authorization: `Bearer ${token}` }
            }),
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/check-enrollment`, {
              headers: { Authorization: `Bearer ${token}` }
            })
          ]);
          
          console.log('[Load] Calculated stats - Completed:', completedSkillsCount, '/', trackerData.roadmap?.length);
          
          setStats({
            overallProgress: trackerData.overallProgress || 0,
            completedSkills: completedSkillsCount,
            totalSkills: trackerData.roadmap?.length || 0,
            badges: badgesRes.data.data?.length || 0,
            enrolledCourses: enrollmentsRes.data.enrollmentCount || 0,
            careerGoal: trackerData.careerGoalLabel || 'Not set',
            isCompleted: trackerData.isCompleted || false,
            verificationId: trackerData.verificationId || null
          });
        } else {
          console.log('[Load] Refresh failed or no tracker data, using fallback');
          // Fallback to normal fetch if refresh fails
          await fetchTrackerData();
        }
      } catch (error) {
        console.error('[Load] Error:', error);
        await fetchTrackerData();
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const refreshTrackerData = async () => {
    try {
      console.log('[Refresh] Starting tracker refresh...');
      const token = await getToken();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/refresh-tracker`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('[Refresh] Tracker refreshed successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('[Refresh] Error:', error);
      return null;
    }
  };

  useEffect(() => {
    // Show welcome animation on first visit
    const hasSeenWelcome = sessionStorage.getItem('skillTrackerWelcomeShown');
    if (!hasSeenWelcome && tracker) {
      setShowWelcome(true);
      sessionStorage.setItem('skillTrackerWelcomeShown', 'true');
      
      setTimeout(() => {
        setShowWelcome(false);
      }, 4000);
    }
  }, [tracker]);

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
      
      // Debug log
      console.log('Enrolled Courses Count:', statsRes.data.data.enrolledCourses);
    } catch (error) {
      console.error('Error fetching tracker:', error);
      if (error.response?.status === 404) {
        navigate('/skill-tracker-form');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetTracker = async () => {
    if (!window.confirm('This will delete your current tracker and you\'ll need to fill the form again. Continue?')) {
      return;
    }
    
    try {
      const token = await getToken();
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/reset`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Tracker reset successfully! Redirecting to form...');
      navigate('/skill-tracker-form');
    } catch (error) {
      console.error('Error resetting tracker:', error);
      alert('Failed to reset tracker');
    }
  };

  const handleSyncBadges = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      
      console.log('[Sync] Starting badge sync...');
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/sync-badges`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      console.log('[Sync] Response:', response.data);
      
      alert(`Success! Synced ${response.data.data.skillsCompleted} skills from your ${response.data.data.totalBadges} badge(s)`);
      
      // Refresh tracker data
      await fetchTrackerData();
    } catch (error) {
      console.error('Error syncing badges:', error);
      alert('Failed to sync badges: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' };
      case 'unlocked':
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' };
      default:
        return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-500' };
    }
  };

  const CircularProgress = ({ percentage, size = 120 }) => {
    const radius = (size - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    
    // Use yellow/gold color for 100%, indigo for others
    const strokeColor = percentage === 100 ? '#EAB308' : '#6366f1';

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${percentage === 100 ? 'text-yellow-600' : 'text-gray-900'}`}>
            {percentage}%
          </span>
          <span className="text-xs text-gray-500">Complete</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your skill tracker...</p>
        </div>
      </div>
    );
  }

  if (!tracker) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
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
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Circular Progress */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Circular Progress */}
            <div className="shrink-0">
              <CircularProgress percentage={stats?.overallProgress || 0} size={140} />
            </div>

            {/* Header Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {tracker.careerGoalLabel} Track
              </h1>
              <p className="text-gray-600 mb-4">
                Master the essential skills to become a professional {tracker.careerGoalLabel.toLowerCase()}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                  {stats?.completedSkills || 0} / {stats?.totalSkills || 0} Skills
                </div>
                <button
                  onClick={() => navigate('/badges')}
                  className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold hover:bg-yellow-200 transition-colors flex items-center gap-2"
                >
                  <span>🏆</span>
                  <span>{stats?.badges || 0} Badges</span>
                </button>
                <button
                  onClick={handleSyncBadges}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold hover:bg-green-200 transition-colors"
                  title="Sync existing badges with skills"
                >
                  🔄 Sync Badges
                </button>
                <button
                  onClick={handleResetTracker}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold hover:bg-red-200 transition-colors"
                  title="Reset and recreate tracker"
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Card */}
        {tracker.isCompleted && (
          <div className="bg-linear-to-r from-green-400 to-blue-500 rounded-2xl shadow-xl p-8 mb-8 text-white">
            <div className="flex items-center gap-4">
              <div className="text-6xl animate-bounce">🎉</div>
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
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Roadmap</h2>
          
          {tracker.roadmap && tracker.roadmap.map((skill, index) => {
            // Debug each skill
            if (index < 3) { // Only log first 3 to avoid spam
              console.log(`[Render] Skill ${index}: ${skill.name} - Status: ${skill.status}, Progress: ${skill.progress}`);
            }
            
            const colors = getStatusColor(skill.status);
            const isUnlocked = skill.status === 'unlocked' || skill.status === 'completed';
            const isCompleted = skill.status === 'completed';
            
            // Ensure first skill is always unlocked if not completed
            let actualStatus = skill.status;
            if (index === 0 && skill.status === 'locked' && !isCompleted) {
              actualStatus = 'unlocked';
            }
            
            const canMarkComplete = actualStatus === 'unlocked' && !isCompleted;

            return (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl ${
                  isUnlocked ? 'border-2 border-indigo-200' : 'border border-gray-200'
                }`}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                          isCompleted ? 'bg-green-500 text-white' : actualStatus === 'unlocked' ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {isCompleted ? '✓' : index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900">{skill.name}</h3>
                          <p className="text-sm text-gray-600">{skill.description}</p>
                        </div>
                        <div>
                          {isCompleted && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                              ✓ COMPLETED
                            </span>
                          )}
                          {actualStatus === 'unlocked' && !isCompleted && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold animate-pulse">
                              🔓 UNLOCKED
                            </span>
                          )}
                          {actualStatus === 'locked' && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-full text-xs font-bold">
                              🔒 LOCKED
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {(actualStatus === 'unlocked' || isCompleted) && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">Progress</span>
                            <span className="text-sm font-bold text-indigo-600">{skill.progress || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className={`h-full transition-all duration-500 rounded-full ${
                                isCompleted 
                                  ? 'bg-green-500' 
                                  : skill.progress === 100 
                                    ? 'bg-yellow-500' 
                                    : 'bg-indigo-500'
                              }`}
                              style={{ width: `${skill.progress || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {/* Info message for unlocked skills */}
                      {actualStatus === 'unlocked' && !isCompleted && (
                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <span className="font-semibold">📚 Complete a {skill.name} course</span> on Skillion to unlock this skill. Skill completes automatically when you earn the course badge!
                          </p>
                        </div>
                      )}

                      {/* Completion Info */}
                      {isCompleted && tracker.completedSkills && (
                        (() => {
                          const completion = tracker.completedSkills.find(cs => cs.skillName === skill.name);
                          if (completion) {
                            return (
                              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="flex items-start gap-2">
                                  <span className="text-green-600">✓</span>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-green-900">
                                      Completed via {completion.source === 'skillion' ? 'Skillion' : 'Other Platform'}
                                    </p>
                                    {completion.sourceDescription && (
                                      <p className="text-xs text-green-700 mt-1">{completion.sourceDescription}</p>
                                    )}
                                    <p className="text-xs text-green-600 mt-1">
                                      {new Date(completion.completedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })()
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-yellow-900 mb-2">How Skill Tracker Works</h3>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Skills are unlocked sequentially - complete one to unlock the next</li>
                <li>• Complete Skillion courses to earn badges and auto-complete skills</li>
                <li>• Only courses from Skillion platform count toward skill completion</li>
                <li>• When all skills are completed, you'll receive your Skillion Achievement Card!</li>
                <li>• Track your progress and badges in real-time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Badge Popup */}
      {showBadgePopup && newBadge && (
        <BadgePopup
          badge={newBadge}
          onClose={() => {
            setShowBadgePopup(false);
            setNewBadge(null);
          }}
        />
      )}

      {/* Welcome Animation */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white animate-fadeIn">
          <div className="text-center text-gray-800 px-4">
            <div className="text-7xl mb-6 animate-bounce">🎯</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideUp text-gray-900">
              Welcome to Your Learning Journey!
            </h1>
            <p className="text-xl md:text-2xl mb-6 animate-slideUp text-gray-700" style={{ animationDelay: '0.2s' }}>
              {tracker.careerGoalLabel} Roadmap
            </p>
            <div className="flex items-center justify-center gap-3 animate-slideUp" style={{ animationDelay: '0.4s' }}>
              <div className="bg-gray-100 rounded-full px-6 py-3">
                <span className="text-lg font-semibold text-gray-800">{tracker.roadmap?.length || 0} Skills to Master</span>
              </div>
              <div className="bg-yellow-100 rounded-full px-6 py-3">
                <span className="text-lg font-semibold text-yellow-800">Let's Get Started! 🚀</span>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-slideUp {
              animation: slideUp 0.6s ease-out forwards;
              opacity: 0;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default SkillTrackerDashboardNew;
