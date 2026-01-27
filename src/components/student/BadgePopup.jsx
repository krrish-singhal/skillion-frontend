import { useEffect, useState } from 'react';

const BadgePopup = ({ badge, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger animation
    setTimeout(() => setShow(true), 100);
    
    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/40">
      <div 
        className={`transform transition-all duration-500 ${
          show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* Confetti Background */}
          <div className="relative bg-linear-to-br from-yellow-400 via-orange-400 to-pink-500 p-8">
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `-${Math.random() * 20}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                >
                  {['🎉', '🎊', '✨', '⭐', '🌟'][Math.floor(Math.random() * 5)]}
                </div>
              ))}
            </div>
            
            {/* Badge Display */}
            <div className="relative z-10 text-center">
              <div 
                className="inline-block w-32 h-32 rounded-full  items-center justify-center text-6xl animate-bounce shadow-2xl"
                style={{ backgroundColor: badge.badgeColor }}
              >
                {badge.badgeIcon}
              </div>
            </div>
          </div>

          {/* Badge Info */}
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🎉 Badge Earned!
            </h2>
            <h3 className="text-xl font-semibold text-indigo-600 mb-3">
              {badge.badgeName}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {badge.description}
            </p>
            
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-500 font-mono">
                Verification ID: {badge.verificationId}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Awesome!
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BadgePopup;
