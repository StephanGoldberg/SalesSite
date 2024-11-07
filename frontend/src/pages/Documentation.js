import React from 'react';

function Documentation() {
  return (
    <section className="w-screen bg-black py-32 overflow-hidden relative">
      {/* Gradient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(128,90,213,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(76,29,149,0.15),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <h1 className="text-4xl font-bold text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Documentation
          </span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Getting Started */}
          <div className="backdrop-blur-sm bg-gray-900/30 p-8 rounded-xl border border-purple-900/20 shadow-[0_0_40px_rgba(139,92,246,0.05)]">
            <h2 className="text-2xl font-semibold text-white mb-4">Getting Started</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Next.js 14 setup and configuration</li>
              <li>• Environment variables setup</li>
              <li>• Database configuration with Supabase</li>
              <li>• Authentication setup with Clerk</li>
              <li>• Stripe integration guidelines</li>
            </ul>
          </div>

          {/* Technical Requirements */}
          <div className="backdrop-blur-sm bg-gray-900/30 p-8 rounded-xl border border-purple-900/20 shadow-[0_0_40px_rgba(139,92,246,0.05)]">
            <h2 className="text-2xl font-semibold text-white mb-4">Technical Requirements</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Node.js 18+ and npm/yarn</li>
              <li>• Basic TypeScript knowledge</li>
              <li>• Familiarity with React</li>
              <li>• Git version control basics</li>
              <li>• Basic SQL understanding</li>
            </ul>
          </div>

          {/* Core Features */}
          <div className="backdrop-blur-sm bg-gray-900/30 p-8 rounded-xl border border-purple-900/20 shadow-[0_0_40px_rgba(139,92,246,0.05)]">
            <h2 className="text-2xl font-semibold text-white mb-4">Core Features</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• User authentication and roles</li>
              <li>• Advanced search functionality</li>
              <li>• Admin dashboard overview</li>
              <li>• Payment integration system</li>
              <li>• Real-time updates</li>
            </ul>
          </div>

          {/* Security Features */}
          <div className="backdrop-blur-sm bg-gray-900/30 p-8 rounded-xl border border-purple-900/20 shadow-[0_0_40px_rgba(139,92,246,0.05)]">
            <h2 className="text-2xl font-semibold text-white mb-4">Security Features</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Row Level Security (RLS)</li>
              <li>• CSRF protection</li>
              <li>• Rate limiting implementation</li>
              <li>• Secure data access patterns</li>
              <li>• API route protection</li>
            </ul>
          </div>

          {/* Deployment */}
          <div className="backdrop-blur-sm bg-gray-900/30 p-8 rounded-xl border border-purple-900/20 shadow-[0_0_40px_rgba(139,92,246,0.05)]">
            <h2 className="text-2xl font-semibold text-white mb-4">Deployment</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Vercel deployment guide</li>
              <li>• Environment configuration</li>
              <li>• Database migration</li>
              <li>• SSL/TLS setup</li>
              <li>• Performance optimization</li>
            </ul>
          </div>

          {/* Customization */}
          <div className="backdrop-blur-sm bg-gray-900/30 p-8 rounded-xl border border-purple-900/20 shadow-[0_0_40px_rgba(139,92,246,0.05)]">
            <h2 className="text-2xl font-semibold text-white mb-4">Customization</h2>
            <ul className="space-y-3 text-gray-300">
              <li>• Styling with Tailwind CSS</li>
              <li>• Component modification</li>
              <li>• Custom feature integration</li>
              <li>• Theme customization</li>
              <li>• Layout adaptation</li>
            </ul>
          </div>

          {/* Note Section */}
          <div className="md:col-span-2 backdrop-blur-sm bg-gray-900/30 p-8 rounded-xl border border-purple-900/20 shadow-[0_0_40px_rgba(139,92,246,0.05)]">
            <h2 className="text-2xl font-semibold text-white mb-4">Full Documentation Access</h2>
            <p className="text-gray-300">
              This is an overview of our documentation. After purchase, you'll receive access to our comprehensive documentation including:
            </p>
            <ul className="space-y-3 text-gray-300 mt-4">
              <li>• Step-by-step setup guides</li>
              <li>• Detailed API documentation</li>
              <li>• Code examples and snippets</li>
              <li>• Best practices and optimization tips</li>
              <li>• Troubleshooting guides</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Documentation;