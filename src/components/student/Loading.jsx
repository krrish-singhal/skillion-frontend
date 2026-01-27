import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Loading = () => {
  const { path } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!path) return;

    const timer = setTimeout(() => {
      navigate(`/${path}`);
    }, 2500); // faster, feels premium

    return () => clearTimeout(timer);
  }, [path, navigate]);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center space-y-6 text-center">
      
      {/* Animated Loader Ring */}
      <div className="relative flex items-center justify-center">
        
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="absolute h-14 w-14 rounded-full border-4 border-yellow-500 border-t-transparent"
        />
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-sm font-medium tracking-wide text-gray-600 mt-6"
      >
        Preparing your learning experience…
      </motion.p>

      {/* Animated Dots */}
      <div className="flex items-center space-x-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
            className="h-2.5 w-2.5 rounded-full bg-yellow-500"
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
