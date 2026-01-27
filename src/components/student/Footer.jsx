import React, { useState } from "react";
import { Link } from "react-router-dom";
import SocialIcons from "../SocialIcons"

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-12">
        
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-5">
          
          {/* Brand - Takes more space */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              Skillion
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed max-w-md">
              A practical learning platform focused on real-world skills, hands-on projects, and career-ready education for the modern learner.
            </p>
            <SocialIcons />
          </div>

          {/* Learn */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wide">
              Learn
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/courses" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">All Courses</Link></li>
              <li><Link to="/skill-tracker-dashboard" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">Skill Tracks</Link></li>
              <li><Link to="/projects" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">Real Projects</Link></li>
              <li><Link to="/certification" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">Certification</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">Terms</Link></li>
            </ul>
          </div>

          {/* Newsletter - Compact on right */}
          <div className="lg:col-span-1">
            <h4 className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wide">
              Newsletter
            </h4>
            <p className="text-xs text-gray-600 mb-3">
              Get updates weekly
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm font-semibold bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-gray-600">
          <p className="font-medium">
            © {new Date().getFullYear()} Skillion. All rights reserved.
          </p>
          <p className="font-medium">
            Built with <span className="text-red-500">❤️</span> for learners
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
