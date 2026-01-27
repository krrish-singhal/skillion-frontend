import React from "react";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full overflow-hidden bg-linear-to-b from-yellow-100/70 to-white px-6 pt-24 md:pt-36 text-center">
      
      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-4xl font-bold text-gray-900 text-4xl font-sans"
      >
        Build{" "}
        <span className="text-yellow-500">real-world skills</span>{" "}
        with learning that actually{" "}
        <span className="text-gray-800">moves your career forward</span>.
      </motion.h1>

      {/* Description (Desktop) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mt-6 hidden max-w-3xl text-gray-700 md:block font-sans text-xl leading-relaxed"
      >
        <p className="font-medium">
          <span className="text-yellow-600 font-bold">Skillion</span> is a practical learning platform built for{" "}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-gray-900 font-semibold"
          >
            students and professionals
          </motion.span>{" "}
          who want to master{" "}
          <span className="text-yellow-600 font-semibold">in-demand skills</span>, work on{" "}
          <span className="text-gray-900 font-semibold">real projects</span>, and become{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-yellow-600 font-bold underline decoration-yellow-400/50 decoration-2 underline-offset-4"
          >
            industry-ready
          </motion.span>{" "}
          — not just certificate-ready.
        </p>
      </motion.div>

      {/* Description (Mobile) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        className="mt-5 max-w-sm text-gray-700 md:hidden font-sans text-lg leading-relaxed"
      >
        <p className="font-medium">
          Learn <span className="text-yellow-600 font-bold">practical skills</span>, build{" "}
          <span className="text-gray-900 font-semibold">real projects</span>, and grow your career with{" "}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-yellow-600 font-bold"
          >
            Skillion
          </motion.span>.
        </p>
      </motion.div>

      {/* Decorative Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-300/20 blur-3xl"></div>
    </section>
  );
};

export default Hero;
