import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const SocialIcons = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 transition hover:text-yellow-500"
        aria-label="GitHub"
      >
        <FaGithub size={20} />
      </a>

      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 transition hover:text-yellow-500"
        aria-label="LinkedIn"
      >
        <FaLinkedin size={20} />
      </a>

      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 transition hover:text-yellow-500"
        aria-label="Twitter"
      >
        <FaTwitter size={20} />
      </a>

      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 transition hover:text-yellow-500"
        aria-label="YouTube"
      >
        <FaYoutube size={20} />
      </a>
    </div>
  );
};

export default SocialIcons;
