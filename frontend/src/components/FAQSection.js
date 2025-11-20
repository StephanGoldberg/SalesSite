import React, { useState } from 'react';

function FAQSection() {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  // FAQ data 
  const faqs = [
    {
      question: "What is the Directory Maker?",
      answer:
`Directory Maker is a comprehensive, production-ready directory website boilerplate built with enterprise-grade security features.  
It provides a complete foundation with user authentication, advanced search capabilities, review systems, an admin dashboard, and detailed analytics.  
The core includes secure payment processing, role-based access control, and a flexible design system.  
While the backend is robust and production-ready, you have full freedom to customize the frontend to match your brand's unique identity.`
    },
    {
      question: "What tech stack is used in the Directory Maker?",
      answer:
`Directory Maker utilizes a modern, scalable tech stack:
- Next.js 14 and React 18 for the frontend with TypeScript for type safety.
- Tailwind CSS for responsive styling.
- Clerk for secure authentication.
- Supabase for real-time database capabilities.
- Stripe for payment processing.
Additionally, it includes React Context for state management, React Hook Form for form handling, Recharts for analytics visualization, and Lucide React for icons.
This combination provides the perfect balance of performance, security, and developer experience.`
    },
    {
      question: "What exactly do I get when I purchase the Directory Maker?",
      answer:
`After purchase, you'll receive:
1. Immediate access to the private GitHub repository containing the complete codebase.
2. A step-by-step setup guide.

The codebase includes:
- A complete admin dashboard with listing management.
- A user authentication system with role-based access.
- Advanced search with filters and categories.
- A payment system with Stripe integration.
- A review and rating system.
- Advertisement zones management.
- Security features (including XSS protection and CSRF guards).
- Comprehensive documentation.

Everything is production-ready and built with TypeScript for reliability.

Note: You'll need free accounts on:
- Supabase (for database hosting),
- Stripe (for payment processing), and
- Vercel (or a similar platform for website hosting).`
    },
    {
      question: "Do I need to know how to code to use this Directory Maker?",
      answer:
`While Directory Maker is developer-friendly, common customizations are accessible through our Express Customize feature:

No-Code Customizations (Express Customize):
- Easily change your directory name and description.
- Update the hero background image.
- Set your own pricing for regular and featured listings.
- Customize upgrade pricing.
- All done through simple settings panels.

For deeper customizations, basic development experience is required.`
    },
    {
      question: "How many hours does it save?",
      answer:
`Building a similar directory platform from scratch typically requires 75–105 hours (3–4 weeks) of full-time development work.  
This includes:
- 20–25 hours for authentication and user management.
- 15–20 hours for search functionality.
- 20–25 hours for the admin dashboard.
- 10–15 hours for payment integration.
- 10–20 hours for security implementation.

Directory Maker provides all these features pre-built and tested, allowing you to focus on customizing the platform for your specific needs rather than building core functionality from scratch.`
    },
    {
      question: "What makes this Directory Maker different from others?",
      answer:
`Directory Maker stands out through its enterprise-grade security implementation, complete TypeScript coverage, and production-ready features.  
Unlike other solutions, we provide:
1. Complete Row Level Security (RLS) implementation.
2. Advanced search with multiple filter types.
3. A comprehensive admin dashboard with analytics.
4. Real-time data capabilities through Supabase.
5. Multiple monetization options, including ads and sponsorships.
6. A detailed security logging system.
7. Proper rate limiting and CORS configurations.

All this comes with clean, maintainable code and extensive documentation.`
    },
    {
      question: "How is the Directory Maker licensed?",
      answer:
`Directory Maker offers two license options: Standard and Agency.

The Standard License ($79) is a perpetual, single-project commercial license for one end product.  
The Agency License ($499) allows unlimited client projects, white-labeling, and custom branding for agencies.

Both licenses are perpetual and include lifetime updates.  
While you can modify the code for your needs, licenses are non-transferable and reselling or redistributing the source code is not permitted.  
For agencies managing multiple client projects, the Agency License provides the flexibility to create unlimited implementations while ensuring code security and maintaining the tool's value.`
    },
    {
      question: "How can I deploy the Directory Maker?",
      answer:
`Deployment is streamlined for Vercel but is compatible with any hosting platform.  
The process involves:
1. Setting up your Supabase database using our provided SQL scripts.
2. Configuring environment variables for API keys and endpoints.
3. Setting up Clerk for authentication.
4. Configuring Stripe for payments.
5. Deploying through your platform's interface.

Our documentation includes step-by-step deployment guides and troubleshooting tips.  
While the process requires some technical knowledge, it's designed to be as straightforward as possible.`
    },
    {
      question: "Do you offer support?",
      answer:
`We provide comprehensive documentation and basic support for setup and configuration issues.  
While we don't offer custom development services, our documentation covers most common scenarios and customization needs.  
Additionally, all security patches and critical updates are provided at no extra cost.`
    },
    {
      question: "Can I customize the Directory Maker to fit my brand?",
      answer:
`Absolutely! Directory Maker is built for customization.  
The frontend is built with Tailwind CSS and React components that are easy to modify.  
The codebase is modular and well-documented, making it straightforward to adjust any aspect of the platform to match your brand.`
    },
    {
      question: "Can I request additional features?",
      answer:
`While we don't take on custom development work, we maintain an active development roadmap based on user feedback.  
All security updates and critical patches are provided free of charge.  
The codebase is structured to make it easy to add your own features, and our documentation includes guides for common customizations and extensions.`
    },
    {
      question: "Do you offer refunds?",
      answer:
`Due to the digital nature of the product and the immediate access to the source code, we do not offer refunds.  
We recommend thoroughly reviewing our documentation, feature list, and technical requirements before purchasing to ensure Directory Maker meets your needs.`
    },
    {
      question: "How do I get started?",
      answer:
`After purchase, you'll receive immediate access to the private GitHub repository.  
The getting started process involves:
1. Forking the repository.
2. Setting up your development environment.
3. Configuring your database using our provided SQL scripts.
4. Setting up authentication and payment services.
5. Customizing the platform for your needs.

Our comprehensive documentation guides you through each step, and the basic setup can typically be completed in just a few hours.`
    },
  ];

  // Helper function to format answer text into paragraphs based on newlines
  const formatAnswer = (answer) => {
    return answer
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line, i) => (
        <p key={i} className="mb-2">
          {line.trim()}
        </p>
      ));
  };

  return (
    <section id="faq" className="w-screen bg-black py-20 overflow-hidden relative">
      {/* Gradient background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(128,90,213,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(76,29,149,0.15),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">
        <h2 className="text-4xl font-bold text-center mb-12">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Frequently Asked Questions
          </span>
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 shadow-[0_0_40px_rgba(139,92,246,0.05)] overflow-hidden transition-all duration-300 hover:border-purple-700/30"
            >
              <div className="relative">
                {/* Glass effect overlay for question header */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-pink-900/10" />
                
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full p-6 text-left relative flex justify-between items-center"
                >
                  <h3 className="text-xl font-semibold text-white pr-8">
                    {faq.question}
                  </h3>
                  <span
                    className={`transform transition-transform duration-300 ${
                      openQuestionIndex === index ? 'rotate-180' : ''
                    }`}
                  >
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
                  className={`transition-all duration-300 overflow-hidden ${
                    openQuestionIndex === index
                      ? 'max-h-[1000px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  {/* Enhanced answer container with pronounced glass effect */}
                  <div className="p-6 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 backdrop-blur-lg rounded-b-xl">
                    {formatAnswer(faq.answer)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;




