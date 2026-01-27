import React from 'react';
import { FiFileText, FiShield, FiCheck } from 'react-icons/fi';
import Footer from '../../components/student/Footer';

const Terms = () => {
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="relative bg-linear-to-r from-yellow-400 via-orange-400 to-red-400 py-24 px-8 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-lg">
              <FiFileText className="w-10 h-10 text-yellow-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Terms of Service
            </h1>
            <p className="text-xl text-white/90 font-medium">
              Last updated: January 24, 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-8 py-16">
          <div className="space-y-6">
            <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shrink-0">
                  <FiCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">Agreement to Terms</h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    By accessing and using Skillion, you accept and agree to be bound by the terms and 
                    provisions of this agreement. If you do not agree to these terms, please do not use our services.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center shrink-0">
                  <FiShield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">Use of Services</h2>
                  <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      You may use our services only as permitted by law and these terms. You agree not to:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0"></span>
                        <span className="text-gray-700">Use our services for any illegal purpose</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0"></span>
                        <span className="text-gray-700">Share your account credentials with others</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0"></span>
                        <span className="text-gray-700">Distribute or download course content without authorization</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0"></span>
                        <span className="text-gray-700">Interfere with the proper functioning of our platform</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 shrink-0"></span>
                        <span className="text-gray-700">Attempt to gain unauthorized access to any part of our services</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Registration</h2>
              <p className="text-gray-600 leading-relaxed">
                To access certain features, you must register for an account. You are responsible for 
                maintaining the confidentiality of your account credentials and for all activities that 
                occur under your account.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Enrollment and Access</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  When you enroll in a course:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>You gain access to the course content for the duration specified</li>
                  <li>Access may be revoked if you violate these terms</li>
                  <li>Course content and structure may be updated or modified</li>
                  <li>Refunds are subject to our refund policy</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                All course content, including videos, text, graphics, and materials, is owned by Skillion 
                or our content providers and is protected by copyright and other intellectual property laws. 
                You may not reproduce, distribute, or create derivative works without explicit permission.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  For paid courses:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>All prices are in the currency specified at checkout</li>
                  <li>Payment is required before accessing course content</li>
                  <li>We use secure third-party payment processors</li>
                  <li>Pricing is subject to change with notice</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We offer a 30-day money-back guarantee for most courses. To request a refund, contact 
                our support team within 30 days of purchase. Refunds are not available after completing 
                more than 50% of the course content.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Content</h2>
              <p className="text-gray-600 leading-relaxed">
                You may submit content such as comments, reviews, and forum posts. By submitting content, 
                you grant Skillion a non-exclusive, royalty-free license to use, reproduce, and display 
                that content in connection with our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                Skillion shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages resulting from your use of or inability to use our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to suspend or terminate your account at any time for violations of 
                these terms or for any other reason we deem appropriate.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We may modify these terms at any time. Continued use of our services after changes 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600 leading-relaxed">
                For questions about these Terms of Service, please contact us at legal@skillion.com
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
