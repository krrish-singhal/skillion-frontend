import React, { useEffect, useState,useRef } from "react";
import { assets } from "../../assets/assets";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

// Counter component with animation
const Counter = ({ end, suffix = "", duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const CallToAction = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-yellow-100/70 to-white px-6 py-16">
      
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-300/20 blur-3xl" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 mb-6"
        >
          Build <span className="text-yellow-600">real-world skills</span> with learning that actually
          <br />
          moves your career <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-gray-800"
          >forward</motion.span>.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-base md:text-lg font-medium text-gray-700 mb-8 max-w-2xl mx-auto"
        >
          <span className="text-yellow-600 font-bold">Skillion</span> is a practical learning platform built for{" "}
          <span className="text-gray-900 font-semibold">students and professionals</span>{" "}
          who want to master{" "}
          <span className="text-yellow-600 font-semibold">in-demand skills</span>, work on{" "}
          <span className="text-gray-900 font-semibold">real projects</span>, and become{" "}
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-yellow-600 font-bold underline decoration-yellow-400/50 decoration-2 underline-offset-4"
          >industry-ready</motion.span>{" "}
          — not just certificate-ready.
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {user ? (
            <Link
              to="/courses"
              className="rounded-full bg-gray-900 px-8 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105"
            >
              Get Started Free
            </Link>
          ) : (
            <button
              onClick={() => openSignIn()}
              className="rounded-full bg-gray-900 px-8 py-3 text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105"
            >
              Get Started Free
            </button>
          )}

          <Link
            to="/about"
            className="group flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-base font-bold text-gray-900 shadow-md transition-all duration-300 hover:bg-white hover:scale-105"
          >
            Learn More
            <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Stats - Horizontal at bottom with counter animation */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-gray-900">
              <Counter end={50} />K+
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">Active Learners</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-gray-900">
              <Counter end={500} />+
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">Expert Courses</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-extrabold text-gray-900">
              <Counter end={95} />%
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-1">Success Rate</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
