import React, { useState } from 'react';

function Documentation() {
  // For collapsible sections
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      title: "Quick Start Guide",
      content: [
        {
          subtitle: "Prerequisites",
          items: [
            "Node.js 18+ installed",
            "Git installed and configured",
            "GitHub account",
            "Stripe account (for payments)",
            "Supabase account (for database)",
            "Clerk account (for authentication)"
          ]
        },
        {
          subtitle: "Initial Setup",
          items: [
            "1. Fork the repository",
            "2. Clone your forked repository",
            "3. Install dependencies: npm install",
            "4. Copy .env.example to .env.local",
            "5. Set up environment variables"
          ]
        },
        {
          subtitle: "Environment Variables",
          items: [
            "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
            "CLERK_SECRET_KEY",
            "NEXT_PUBLIC_SUPABASE_URL",
            "NEXT_PUBLIC_SUPABASE_ANON_KEY",
            "STRIPE_SECRET_KEY",
            "STRIPE_WEBHOOK_SECRET"
          ]
        }
      ]
    },
    {
      title: "Database Setup",
      content: [
        {
          subtitle: "Supabase Configuration",
          items: [
            "1. Create new Supabase project",
            "2. Execute provided SQL scripts",
            "3. Set up Row Level Security policies",
            "4. Configure real-time subscriptions",
            "5. Test database connections"
          ]
        },
        {
          subtitle: "Data Models",
          items: [
            "Users table structure",
            "Listings table schema",
            "Categories implementation",
            "Reviews system tables",
            "Relationships and foreign keys"
          ]
        }
      ]
    },
    {
      title: "Authentication Setup",
      content: [
        {
          subtitle: "Clerk Integration",
          items: [
            "1. Create Clerk application",
            "2. Configure authentication settings",
            "3. Set up OAuth providers (optional)",
            "4. Implement role management",
            "5. Test user flows"
          ]
        },
        {
          subtitle: "Protected Routes",
          items: [
            "Setting up middleware",
            "Role-based access control",
            "API route protection",
            "Authentication hooks usage",
            "Custom auth rules"
          ]
        }
      ]
    },
    {
      title: "Payment Integration",
      content: [
        {
          subtitle: "Stripe Setup",
          items: [
            "1. Configure Stripe account",
            "2. Set up webhook endpoints",
            "3. Test payment flow",
            "4. Handle successful payments",
            "5. Implement error handling"
          ]
        },
        {
          subtitle: "Payment Features",
          items: [
            "Listing payment processing",
            "Handling successful payments",
            "Failed payment scenarios",
            "Webhook processing",
            "Payment verification"
          ]
        }
      ]
    },
    {
      title: "Customization Guide",
      content: [
        {
          subtitle: "Styling",
          items: [
            "Tailwind configuration",
            "Theme customization",
            "Component styling",
            "Responsive design",
            "Custom CSS integration"
          ]
        },
        {
          subtitle: "Component Modification",
          items: [
            "Directory structure",
            "Component architecture",
            "State management",
            "Custom hooks",
            "TypeScript types"
          ]
        }
      ]
    },
    {
      title: "Deployment",
      content: [
        {
          subtitle: "Vercel Deployment",
          items: [
            "1. Connect to Vercel",
            "2. Configure build settings",
            "3. Set environment variables",
            "4. Deploy application",
            "5. Monitor deployment"
          ]
        },
        {
          subtitle: "Production Checklist",
          items: [
            "Environment variables",
            "Database configuration",
            "SSL/TLS setup",
            "Performance optimization",
            "Security checks"
          ]
        }
      ]
    }
  ];

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
        
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div 
              key={index}
              className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 
                       shadow-[0_0_40px_rgba(139,92,246,0.05)] overflow-hidden"
            >
              <button
                onClick={() => toggleSection(index)}
                className="w-full p-6 text-left flex justify-between items-center"
              >
                <h2 className="text-2xl font-semibold text-white">{section.title}</h2>
                <span className={`transform transition-transform duration-300 ${openSection === index ? 'rotate-180' : ''}`}>
                  <svg 
                    className="w-6 h-6 text-purple-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`transition-all duration-300 ${
                  openSection === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="p-6 pt-0 space-y-6">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-xl font-semibold text-purple-300 mb-3">
                        {subsection.subtitle}
                      </h3>
                      <ul className="space-y-2 text-gray-300 ml-4">
                        {subsection.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <span className="text-purple-400 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {/* Full Documentation Note */}
          <div className="backdrop-blur-sm bg-gray-900/30 p-8 rounded-xl border border-purple-900/20 mt-12">
            <h2 className="text-2xl font-semibold text-white mb-4">Full Documentation Access</h2>
            <p className="text-gray-300">
              This is an overview of our documentation. After purchase, you'll receive access to our comprehensive documentation including detailed guides, code examples, and best practices for each section above.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Documentation;