import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Footer from '../../components/student/Footer';

const PaymentSuccess = () => {
  const { backendUrl, authorizedPost, fetchUserEnrolledCourses } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [message, setMessage] = useState('Processing your payment...');

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    try {
      const sessionId = searchParams.get('session_id');
      
      if (!sessionId) {
        setMessage('Invalid payment session');
        setTimeout(() => navigate('/'), 3000);
        return;
      }

      setMessage('Verifying your payment and enrolling you in the course...');

      // Call backend to verify the session
      const { data } = await authorizedPost(`${backendUrl}/api/user/verify-payment`, {
        sessionId
      });

      if (data?.success) {
        setMessage('Payment successful! Redirecting to your enrollments...');
        toast.success('Successfully enrolled in the course!');
        
        // Refresh enrolled courses
        await fetchUserEnrolledCourses();
        
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate('/my-enrollments');
        }, 2000);
      } else {
        setMessage('Payment verification failed');
        toast.error('Payment verification failed. Please contact support.');
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setMessage('Error verifying payment. Please check your enrollments or contact support.');
      toast.error('Payment verification failed. Please contact support.');
      setTimeout(() => navigate('/my-enrollments'), 3000);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {verifying ? (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Processing Payment</h2>
            <p className="text-gray-600">{message}</p>
          </>
        ) : (
          <>
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Success!</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default PaymentSuccess;
