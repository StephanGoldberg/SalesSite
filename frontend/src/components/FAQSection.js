import React, { useState } from 'react';

function FAQSection() {
  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestionIndex(openQuestionIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the Directory Maker?",
      answer: "The Directory Maker is a fully-featured directory platform that provides the core functionality you need to launch a directory website quickly—user authentication, admin dashboard, payment integration, and advanced search. While it offers a powerful backend solution, the design and styling are flexible. This gives you the freedom to customize the look and feel to perfectly fit your brand. It's the ideal foundation, saving you time on complex functionality."
    },
    {
      question: "What tech stack is used in the Directory Maker?",
      answer: "The Directory Maker is built using modern and popular technologies: Next.js for the frontend and server-side rendering. Tailwind CSS for styling, offering a modern, responsive design. Supabase for the backend and data storage, providing real-time capabilities and a familiar SQL interface. Clerk for user authentication and management. Stripe for payment processing, allowing you to monetize your directory with ease."
    },
    {
      question: "What exactly do I get when I purchase the Directory Maker?",
      answer: "You get access to the complete source code of the Directory Maker. This includes: A fully functional directory platform. Comprehensive user authentication and role management. Admin dashboard for managing listings, ads, and sponsorships. Integrated payment system with Stripe. Advanced search functionality and customizable frontend."
    },
    {
      question: "How can I use the Directory Maker?",
      answer: "After purchasing, you'll receive access to a private GitHub repository where you can fork the project and start customizing it to your needs. The Directory Maker is designed to be easy to set up and modify, so you can tailor it to your specific business requirements."
    },
    {
      question: "How many hours does it save?",
      answer: "Building a similar directory platform from scratch could take an experienced developer approximately 75 to 105 hours—nearly 3 to 4 weeks of full-time work. By purchasing this Directory Maker, you save all that time and effort, allowing you to focus on growing your business instead of building the foundational elements."
    },
    {
      question: "Can I request additional features?",
      answer: "While we continually strive to improve the Directory Maker with new features and updates, we do not take on custom feature requests or development work for individual clients. However, we value your feedback and are always open to suggestions for future updates."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We are committed to helping you get the most out of the Directory Maker. While we provide support for setting up and using the Directory Maker, we do not offer custom development services or work on clients' directories directly. Our goal is to empower you with the tools you need to succeed, and we are here to assist with any questions or issues related to the Directory Maker itself."
    },
    {
      question: "Do you offer refunds?",
      answer: "Due to the nature of digital products, all sales of the Directory Maker are final, and we do not offer refunds. We recommend reviewing all available information and documentation before making your purchase to ensure it meets your needs."
    },
    {
      question: "How is the Directory Maker licensed?",
      answer: "The Directory Maker is licensed for personal and commercial use. However, it is a non-transferable license, meaning you cannot resell or redistribute the code in its original or modified form. By purchasing, you agree to these terms and are responsible for ensuring your use complies with the license agreement."
    },
    {
      question: "Can I customize the Directory Maker to fit my brand?",
      answer: "Absolutely! The Directory Maker is fully customizable. You can easily modify the design, add or remove features, and adjust the layout to match your brand's identity. The code is well-documented and structured to make customization as straightforward as possible."
    },
    {
      question: "How do I deploy the Directory Maker?",
      answer: "The Directory Maker is designed to be deployed on popular platforms like Vercel. Simply follow the setup instructions included in the documentation, and you can have your directory up and running in no time."
    },
    {
      question: "Do I need to know how to code to use this Directory Maker?",
      answer: "While the Directory Maker is designed to be user-friendly, some knowledge of web development is recommended to fully customize and deploy it. If you are comfortable with HTML, CSS, and JavaScript, you should be able to navigate and modify the Directory Maker with ease."
    },
    {
      question: "What makes this Directory Maker different from others?",
      answer: "Our Directory Maker is a comprehensive, all-in-one solution that combines a powerful backend with a sleek, modern frontend. It includes everything you need to launch a directory-based website quickly and effectively, with no recurring fees and full control over the source code."
    },
    {
      question: "How do I get started?",
      answer: "After purchase, you'll receive instructions on how to access the GitHub repository. From there, you can fork the project, customize it to your needs, and deploy it to your preferred hosting platform. Detailed documentation is provided to guide you through each step of the process."
    }
  ];

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
              className="backdrop-blur-sm bg-gray-900/30 rounded-xl border border-purple-900/20 
                       shadow-[0_0_40px_rgba(139,92,246,0.05)] overflow-hidden transition-all duration-300
                       hover:border-purple-700/30"
            >
              <div className="relative">
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-transparent to-pink-900/10" />
                
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full p-6 text-left relative flex justify-between items-center"
                >
                  <h3 className="text-xl font-semibold text-white pr-8">
                    {faq.question}
                  </h3>
                  <span className={`transform transition-transform duration-300 ${openQuestionIndex === index ? 'rotate-180' : ''}`}>
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
                    openQuestionIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-gray-300">
                    {faq.answer}
                  </p>
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



