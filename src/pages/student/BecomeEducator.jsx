import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Footer from '../../components/student/Footer';

const BecomeEducator = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [existingApplication, setExistingApplication] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    professionalEmail: '',
    domains: [],
    customDomain: '',
    skills: [],
    experienceLevel: '',
    proofLinks: {
      github: '',
      portfolio: '',
      linkedin: ''
    },
    motivation: '',
    targetAudience: '',
    availability: 'Weekly',
    commitmentAccepted: false
  });

  const domainOptions = [
    'Frontend Development',
    'Backend Development',
    'Full Stack Development',
    'Data Analyst',
    'Data Scientist',
    'Cybersecurity',
    'Other'
  ];

  const skillsByDomain = {
    'Frontend Development': ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'UI/UX (Figma)'],
    'Backend Development': ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Redis', 'REST APIs', 'GraphQL'],
    'Full Stack Development': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
    'Data Analyst': ['Python', 'Excel', 'SQL', 'Statistics', 'Data Visualization', 'Tableau', 'Power BI'],
    'Data Scientist': ['Python', 'Machine Learning', 'Deep Learning', 'Statistics', 'TensorFlow', 'PyTorch', 'R'],
    'Cybersecurity': ['Network Security', 'Ethical Hacking', 'Cryptography', 'Security Tools', 'Linux', 'Windows Security'],
    'Other': []
  };

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.primaryEmailAddress?.emailAddress || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    checkExistingApplication();
  }, []);

  const checkExistingApplication = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/educator-application/my-application`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        setExistingApplication(response.data.data);
      }
    } catch (error) {
      // No existing application
    }
  };

  const handleDomainChange = (domain) => {
    setFormData(prev => {
      const newDomains = prev.domains.includes(domain)
        ? prev.domains.filter(d => d !== domain)
        : [...prev.domains, domain];
      
      return {
        ...prev,
        domains: newDomains,
        skills: [] // Reset skills when domains change
      };
    });
  };

  const handleSkillChange = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const getAvailableSkills = () => {
    const allSkills = new Set();
    formData.domains.forEach(domain => {
      if (domain !== 'Other') {
        skillsByDomain[domain]?.forEach(skill => allSkills.add(skill));
      }
    });
    return Array.from(allSkills);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.domains.length === 0) {
      toast.error('Please select at least one teaching domain');
      return;
    }

    if (!formData.professionalEmail.trim()) {
      toast.error('Please provide your professional email');
      return;
    }

    if (formData.skills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }

    if (!formData.experienceLevel) {
      toast.error('Please select your experience level');
      return;
    }

    if (!formData.proofLinks.github && !formData.proofLinks.portfolio && !formData.proofLinks.linkedin) {
      toast.error('Please provide at least one proof of expertise link');
      return;
    }

    if (!formData.motivation.trim()) {
      toast.error('Please explain why you want to teach');
      return;
    }

    if (!formData.targetAudience.trim()) {
      toast.error('Please describe who you want to teach');
      return;
    }

    if (!formData.commitmentAccepted) {
      toast.error('Please accept all content commitments');
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/educator-application/apply`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success('Your application has been sent for admin review!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  if (existingApplication) {
    const statusColors = {
      pending: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', icon: 'text-yellow-500' },
      approved: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: 'text-green-500' },
      rejected: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: 'text-red-500' }
    };

    const colors = statusColors[existingApplication.status];

    return (
      <>
        <div className="min-h-screen bg-gray-50 py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <div className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-8 shadow-lg`}>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 ${colors.bg} rounded-full mb-4`}>
                  {existingApplication.status === 'approved' ? (
                    <FiCheckCircle className={`w-12 h-12 ${colors.icon}`} />
                  ) : (
                    <FiAlertCircle className={`w-12 h-12 ${colors.icon}`} />
                  )}
                </div>
                <h1 className={`text-3xl font-bold ${colors.text} mb-4`}>
                  Application {existingApplication.status.charAt(0).toUpperCase() + existingApplication.status.slice(1)}
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                  {existingApplication.status === 'pending' && 'Your application is currently under review. We will notify you via email once a decision is made.'}
                  {existingApplication.status === 'approved' && 'Congratulations! Your educator application has been approved. You can now access the educator dashboard.'}
                  {existingApplication.status === 'rejected' && 'Unfortunately, your application was not approved at this time. You may reapply in the future.'}
                </p>
                <div className="bg-white rounded-lg p-6 mt-6">
                  <div className="text-left space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Applied on:</span> {new Date(existingApplication.appliedAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Domains:</span> {existingApplication.domains.join(', ')}
                    </p>
                  </div>
                </div>
                {existingApplication.status === 'approved' && (
                  <button
                    onClick={() => navigate('/educator/dashboard')}
                    className="mt-6 px-8 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    Go to Educator Dashboard
                  </button>
                )}
                <button
                  onClick={() => navigate('/')}
                  className="mt-4 px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Become an Educator
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Share your knowledge and inspire thousands of learners worldwide
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">1</span>
                Personal Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Personal Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.professionalEmail}
                    onChange={(e) => setFormData({ ...formData, professionalEmail: e.target.value })}
                    placeholder="Enter your professional email (This will be used for communication)"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-gray-500">This email will be used for all educator-related communication</p>
                </div>
              </div>
            </div>

            {/* Teaching Domain */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">2</span>
                Teaching Domain <span className="text-red-500">*</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {domainOptions.map((domain) => (
                  <label key={domain} className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.domains.includes(domain)}
                      onChange={() => handleDomainChange(domain)}
                      className="w-5 h-5 text-indigo-600 rounded"
                    />
                    <span className="text-gray-700 font-medium">{domain}</span>
                  </label>
                ))}
              </div>
              {formData.domains.includes('Other') && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Specify your domain"
                    value={formData.customDomain}
                    onChange={(e) => setFormData({ ...formData, customDomain: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {/* Skills */}
            {formData.domains.length > 0 && getAvailableSkills().length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">3</span>
                  Skills <span className="text-red-500">*</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {getAvailableSkills().map((skill) => (
                    <label key={skill} className="flex items-center gap-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.skills.includes(skill)}
                        onChange={() => handleSkillChange(skill)}
                        className="w-5 h-5 text-indigo-600 rounded"
                      />
                      <span className="text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Level */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">4</span>
                Experience Level <span className="text-red-500">*</span>
              </h2>
              <div className="space-y-3">
                {['Student / Fresher', 'Self-taught Developer', 'Working Professional', 'Industry Trainer / Mentor'].map((level) => (
                  <label key={level} className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                    <input
                      type="radio"
                      name="experienceLevel"
                      value={level}
                      checked={formData.experienceLevel === level}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-5 h-5 text-indigo-600"
                    />
                    <span className="text-gray-700 font-medium">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Proof of Expertise */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">5</span>
                Proof of Expertise <span className="text-red-500">*</span>
              </h2>
              <p className="text-gray-600 mb-4">Provide at least one link</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/yourusername"
                    value={formData.proofLinks.github}
                    onChange={(e) => setFormData({
                      ...formData,
                      proofLinks: { ...formData.proofLinks, github: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Website URL</label>
                  <input
                    type="url"
                    placeholder="https://yourportfolio.com"
                    value={formData.proofLinks.portfolio}
                    onChange={(e) => setFormData({
                      ...formData,
                      proofLinks: { ...formData.proofLinks, portfolio: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/yourusername"
                    value={formData.proofLinks.linkedin}
                    onChange={(e) => setFormData({
                      ...formData,
                      proofLinks: { ...formData.proofLinks, linkedin: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Teaching Intent */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">6</span>
                Teaching Intent <span className="text-red-500">*</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Why do you want to teach on Skillion?</label>
                  <textarea
                    rows={4}
                    placeholder="Share your motivation..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Who do you want to teach?</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your target audience..."
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Content Commitment */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">7</span>
                Content Commitment <span className="text-red-500">*</span>
              </h2>
              <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.commitmentAccepted}
                  onChange={(e) => setFormData({ ...formData, commitmentAccepted: e.target.checked })}
                  className="w-5 h-5 text-indigo-600 rounded mt-1"
                />
                <div className="text-gray-700">
                  <p className="font-medium mb-2">I agree to the following:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>I will create original content</li>
                    <li>Projects are mandatory in my courses</li>
                    <li>I accept Skillion content guidelines</li>
                    <li>I understand courses need admin approval</li>
                  </ul>
                </div>
              </label>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white text-sm">8</span>
                Availability
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {['Weekly', 'Bi-weekly', 'Monthly', 'One-time course'].map((option) => (
                  <label key={option} className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                    <input
                      type="radio"
                      name="availability"
                      value={option}
                      checked={formData.availability === option}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                      className="w-5 h-5 text-indigo-600"
                    />
                    <span className="text-gray-700 font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className="px-12 py-4 bg-yellow-500 text-white text-lg font-bold rounded-lg hover:bg-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? 'Submitting...' : 'Apply to Become an Educator'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BecomeEducator;
