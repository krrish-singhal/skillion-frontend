import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const SkillTrackerForm = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [hasEnrollment, setHasEnrollment] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(true);
  const [knowledgeOptions, setKnowledgeOptions] = useState([]);

  const [formData, setFormData] = useState({
    careerGoal: '',
    careerGoalLabel: '',
    currentSkillLevel: '',
    learningIntensity: '',
    goalTimeline: '',
    existingKnowledge: [],
    commitment: false
  });

  const careerGoals = [
    { value: 'frontend', label: 'Frontend Developer' },
    { value: 'backend', label: 'Backend Developer' },
    { value: 'fullstack', label: 'Full Stack Developer' },
    { value: 'dataanalyst', label: 'Data Analyst' },
    { value: 'datascientist', label: 'Data Scientist' },
    { value: 'cybersecurity', label: 'Cybersecurity Analyst' },
    { value: 'custom', label: 'Custom (Contact Admin)' }
  ];

  useEffect(() => {
    checkEnrollmentStatus();
  }, []);

  useEffect(() => {
    if (formData.careerGoal) {
      fetchKnowledgeOptions(formData.careerGoal);
    }
  }, [formData.careerGoal]);

  const checkEnrollmentStatus = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/check-enrollment`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setHasEnrollment(response.data.hasEnrollment);
      setCheckingEnrollment(false);
    } catch (error) {
      console.error('Error checking enrollment:', error);
      setCheckingEnrollment(false);
    }
  };

  const fetchKnowledgeOptions = async (careerGoal) => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/knowledge-options?careerGoal=${careerGoal}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setKnowledgeOptions(response.data.options || []);
    } catch (error) {
      console.error('Error fetching knowledge options:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'careerGoal') {
      const selectedGoal = careerGoals.find(g => g.value === value);
      setFormData(prev => ({
        ...prev,
        careerGoal: value,
        careerGoalLabel: selectedGoal?.label || '',
        existingKnowledge: [] // Reset knowledge when goal changes
      }));
    } else if (type === 'checkbox' && name === 'commitment') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleKnowledgeToggle = (knowledge) => {
    setFormData(prev => ({
      ...prev,
      existingKnowledge: prev.existingKnowledge.includes(knowledge)
        ? prev.existingKnowledge.filter(k => k !== knowledge)
        : [...prev.existingKnowledge, knowledge]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.commitment) {
      alert('Please accept the commitment to continue');
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/create`,
        {
          careerGoal: formData.careerGoal,
          careerGoalLabel: formData.careerGoalLabel,
          currentSkillLevel: formData.currentSkillLevel,
          learningIntensity: formData.learningIntensity,
          goalTimeline: formData.goalTimeline,
          existingKnowledge: formData.existingKnowledge
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Show success animation
      setShowSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/skill-tracker-dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error creating skill tracker:', error);
      alert(error.response?.data?.message || 'Failed to create skill tracker');
      setLoading(false);
    }
  };

  if (checkingEnrollment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking enrollment status...</p>
        </div>
      </div>
    );
  }

  if (!hasEnrollment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Enrollment Required</h2>
          <p className="text-gray-600 mb-6">
            To access the Skill Tracker feature, please enroll in at least one course first.
          </p>
          <button
            onClick={() => navigate('/course-list')}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
      `}</style>
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md animate-scaleIn">
            <div className="text-6xl mb-4 animate-bounce">🚀</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Skill Tracker Created!</h2>
            <p className="text-gray-600">Redirecting to your personalized roadmap...</p>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Tracker Setup</h1>
            <p className="text-gray-600">
              Let's build your personalized learning roadmap to achieve your career goals.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Career Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What do you want to become? <span className="text-red-500">*</span>
              </label>
              <select
                name="careerGoal"
                value={formData.careerGoal}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select your career goal</option>
                {careerGoals.map(goal => (
                  <option key={goal.value} value={goal.value}>
                    {goal.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Current Skill Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you rate your current level? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {[
                  { value: 'beginner', label: "Beginner", desc: "I'm starting from scratch" },
                  { value: 'intermediate', label: "Intermediate", desc: "I know basics" },
                  { value: 'advanced', label: "Advanced", desc: "I want to polish & certify" }
                ].map(level => (
                  <label key={level.value} className="flex items-start p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                    <input
                      type="radio"
                      name="currentSkillLevel"
                      value={level.value}
                      checked={formData.currentSkillLevel === level.value}
                      onChange={handleChange}
                      required
                      className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="ml-3">
                      <span className="block font-medium text-gray-900">{level.label}</span>
                      <span className="block text-sm text-gray-600">{level.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Learning Intensity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How much time can you study weekly?
              </label>
              <select
                name="learningIntensity"
                value={formData.learningIntensity}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select your availability</option>
                <option value="3-5">3–5 hrs/week</option>
                <option value="6-10">6–10 hrs/week</option>
                <option value="10+">10+ hrs/week</option>
              </select>
            </div>

            {/* Goal Timeline */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                When do you want to complete this track?
              </label>
              <select
                name="goalTimeline"
                value={formData.goalTimeline}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select your timeline</option>
                <option value="1-2">1–2 months</option>
                <option value="3-4">3–4 months</option>
                <option value="no-deadline">No deadline</option>
              </select>
            </div>

            {/* Existing Knowledge */}
            {formData.careerGoal && knowledgeOptions.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Which of these do you already know?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {knowledgeOptions.map(knowledge => (
                    <label
                      key={knowledge}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        formData.existingKnowledge.includes(knowledge.toLowerCase())
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.existingKnowledge.includes(knowledge.toLowerCase())}
                        onChange={() => handleKnowledgeToggle(knowledge.toLowerCase())}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">{knowledge}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Commitment */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  name="commitment"
                  checked={formData.commitment}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                />
                <span className="ml-3 text-sm text-gray-700">
                  <span className="font-semibold">I understand</span> that completing videos alone does not complete a skill. 
                  Projects and assessments are mandatory. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </span>
                ) : (
                  'Start My Journey'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillTrackerForm;
