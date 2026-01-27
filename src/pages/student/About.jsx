import React from 'react';
import { FiTarget, FiUsers, FiAward } from 'react-icons/fi';
import Footer from '../../components/student/Footer';

const About = () => {
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 py-24 px-8 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg">
              <FiTarget className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              About Skillion
            </h1>
            <p className="text-xl text-white/90 leading-relaxed font-medium max-w-3xl mx-auto">
              We're on a mission to make quality education accessible to everyone, 
              transforming learners into skilled professionals ready for the modern workforce.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl mb-6 shadow-lg">
                <FiTarget className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                Empowering individuals with practical skills and knowledge to succeed 
                in their careers through hands-on learning experiences.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-blue-400 to-indigo-500 rounded-2xl mb-6 shadow-lg">
                <FiUsers className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Join thousands of learners and educators building skills together 
                in a supportive, collaborative environment.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-purple-400 to-pink-500 rounded-2xl mb-6 shadow-lg">
                <FiAward className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-world projects, expert instructors, and industry-relevant 
                curriculum designed to get you job-ready fast.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="py-16 px-8">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
            <h2 className="text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              <p>
                Skillion was founded with a simple belief: quality education should be 
                accessible to everyone, regardless of their background or location. We saw 
                a gap between traditional education and the skills demanded by modern employers.
              </p>
              <p>
                Today, we're proud to serve thousands of learners worldwide, helping them 
                acquire practical skills through hands-on projects and expert guidance. Our 
                platform brings together passionate educators and motivated learners in a 
                dynamic learning environment.
              </p>
              <p>
                Whether you're starting your career, switching fields, or advancing your 
                current role, Skillion provides the tools, resources, and support you need 
                to succeed.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto px-8 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We maintain the highest standards in course quality, instructor expertise, 
                and student support to ensure the best learning outcomes.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                Quality education should be within reach for everyone. We work to remove 
                barriers and make learning opportunities available to all.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously evolve our platform and curriculum to stay ahead of 
                industry trends and deliver cutting-edge learning experiences.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                Learning is better together. We foster a supportive community where 
                students and educators can connect, collaborate, and grow.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
