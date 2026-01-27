import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const MarkCompleteModal = ({ skill, onClose, onComplete }) => {
  const { getToken } = useAuth();
  const [source, setSource] = useState('');
  const [description, setDescription] = useState('');
  const [proofImage, setProofImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setProofImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!source) {
      alert('Please select a source');
      return;
    }

    if (source === 'skillion' && !proofImage) {
      alert('Proof image is mandatory for Skillion completions');
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      let proofImageUrl = '';

      // Upload image if provided
      if (proofImage) {
        setUploadingImage(true);
        const formData = new FormData();
        formData.append('proofImage', proofImage);

        const uploadRes = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/upload-proof`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        proofImageUrl = uploadRes.data.imageUrl;
        setUploadingImage(false);
      }

      // Mark skill as complete
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/skill-tracker/mark-complete`,
        {
          skillName: skill.name,
          source,
          sourceDescription: description,
          proofImageUrl
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      onComplete(response.data);
    } catch (error) {
      console.error('Error marking complete:', error);
      alert(error.response?.data?.message || 'Failed to mark skill as complete');
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-white/30">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Mark "{skill.name}" as Complete
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Warning Message */}
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex items-start">
              <div className="shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">⚠️ Important Warning</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p className="font-semibold">Any fake image uploads or malpractice will result in:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Immediate ban of your Skillion account</li>
                    <li>Revocation of all earned certificates and badges</li>
                    <li>Loss of access to the Skillion Card and verification ID</li>
                  </ul>
                  <p className="mt-2 font-bold">Be honest about your learning journey!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Source Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Where did you complete this skill? <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <label className="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                <input
                  type="radio"
                  name="source"
                  value="skillion"
                  checked={source === 'skillion'}
                  onChange={(e) => setSource(e.target.value)}
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="ml-3 flex-1">
                  <span className="block font-medium text-gray-900">Skillion Platform</span>
                  <span className="block text-sm text-gray-600">Completed through our courses</span>
                  {source === 'skillion' && (
                    <span className="block text-xs text-red-600 mt-1">📸 Screenshot proof is mandatory</span>
                  )}
                </div>
              </label>

              <label className="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                <input
                  type="radio"
                  name="source"
                  value="other"
                  checked={source === 'other'}
                  onChange={(e) => setSource(e.target.value)}
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="ml-3 flex-1">
                  <span className="block font-medium text-gray-900">Other Platform</span>
                  <span className="block text-sm text-gray-600">External courses or self-learning</span>
                  {source === 'other' && (
                    <span className="block text-xs text-gray-600 mt-1">📝 Description required, proof optional</span>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Description */}
          {source && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {source === 'skillion' ? 'Additional Notes (Optional)' : 'Source Description *'}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required={source === 'other'}
                rows={3}
                placeholder={
                  source === 'skillion'
                    ? 'Any additional notes about your learning...'
                    : 'Describe where and how you learned this skill (e.g., Udemy, YouTube, Personal Projects)...'
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>
          )}

          {/* Image Upload */}
          {source && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Proof {source === 'skillion' ? '*' : '(Optional)'}
              </label>
              <p className="text-sm text-gray-600 mb-3">
                {source === 'skillion' 
                  ? '📸 Screenshot from your My Enrollments page showing 100% completion'
                  : '📎 Certificate, project screenshot, or completion proof'
                }
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {imagePreview ? (
                  <div className="space-y-3">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-lg shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setProofImage(null);
                        setImagePreview('');
                      }}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div>
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="mt-4">
                      <label className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          Click to upload image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImage || !source}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {uploadingImage ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Marking Complete...
                </span>
              ) : (
                'Mark as Complete'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkCompleteModal;
