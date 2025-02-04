import React from 'react';

function FeaturesSection() {
  return (
    <section id="features" className="w-screen bg-black py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Enterprise Security */}
          <div className="bg-gray-900/30 p-8 rounded-xl shadow-lg border border-purple-900/30 backdrop-blur-lg hover:border-purple-700/40 transition-all">
            <h3 className="text-xl font-semibold text-white mb-4">Enterprise-Grade Security</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Row Level Security (RLS)
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                XSS & CSRF Protection
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Security Audit Logging
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                API Rate Limiting
              </li>
            </ul>
          </div>

          {/* Advanced Search */}
          <div className="bg-gray-900/30 p-8 rounded-xl shadow-lg border border-purple-900/30 backdrop-blur-lg hover:border-purple-700/40 transition-all">
            <h3 className="text-xl font-semibold text-white mb-4">Advanced Search System</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Full-Text Search
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Custom Filter Builder
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Category Filtering
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Smart Result Ranking
              </li>
            </ul>
          </div>

          {/* Express Customization - NEW */}
          <div className="bg-gray-900/30 p-8 rounded-xl shadow-lg border border-purple-900/30 backdrop-blur-lg hover:border-purple-700/40 transition-all">
            <h3 className="text-xl font-semibold text-white mb-4">Express Customization</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Branding Settings
                <span className="text-xs ml-2 text-purple-400">(No-Code)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="flex-1">Directory Name & Description</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="flex-1">Hero Background Image</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Pricing Settings
                <span className="text-xs ml-2 text-purple-400">(No-Code)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="flex-1">Regular & Featured Listing Prices</span>
              </li>
            </ul>
          </div>

          {/* Monetization */}
          <div className="bg-gray-900/30 p-8 rounded-xl shadow-lg border border-purple-900/30 backdrop-blur-lg hover:border-purple-700/40 transition-all">
            <h3 className="text-xl font-semibold text-white mb-4">Monetization Ready</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Stripe Integration
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Ad Space Management
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Premium Listings
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Multiple Revenue Streams
              </li>
            </ul>
          </div>

          {/* User Engagement */}
          <div className="bg-gray-900/30 p-8 rounded-xl shadow-lg border border-purple-900/30 backdrop-blur-lg hover:border-purple-700/40 transition-all">
            <h3 className="text-xl font-semibold text-white mb-4">User Engagement</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Review & Rating System
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                User Profiles
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Interaction Tracking
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Activity Analytics
              </li>
            </ul>
          </div>

          {/* Admin Controls */}
          <div className="bg-gray-900/30 p-8 rounded-xl shadow-lg border border-purple-900/30 backdrop-blur-lg hover:border-purple-700/40 transition-all">
            <h3 className="text-xl font-semibold text-white mb-4">Admin Controls</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Complete Dashboard
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Content Management
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                User Management
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Analytics Dashboard
              </li>
            </ul>
          </div>

          {/* Authentication System */}
          <div className="bg-gray-900/30 p-8 rounded-xl shadow-lg border border-purple-900/30 backdrop-blur-lg hover:border-purple-700/40 transition-all">
            <h3 className="text-xl font-semibold text-white mb-4">Authentication System</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Clerk Authentication
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Role-Based Access Control
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Protected Routes & APIs
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Auto-Redirect System
              </li>
            </ul>
          </div>

          {/* Data Management */}
          <div className="bg-gray-900/30 p-8 rounded-xl shadow-lg border border-purple-900/30 backdrop-blur-lg hover:border-purple-700/40 transition-all">
            <h3 className="text-xl font-semibold text-white mb-4">Data Management</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Supabase Integration
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                CSV Bulk Import
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Field Validation
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Real-time Updates
              </li>
            </ul>
          </div>

          {/* Modern Tech Stack */}
          <div className="bg-gray-900/30 p-8 rounded-xl shadow-lg border border-purple-900/30 backdrop-blur-lg hover:border-purple-700/40 transition-all">
            <h3 className="text-xl font-semibold text-white mb-4">Modern Tech Stack</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Next.js 14 & React 18
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                React Hook Form
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Recharts Analytics
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Context State Management
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;















