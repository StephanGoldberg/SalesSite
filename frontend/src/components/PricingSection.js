import React from 'react';

function PricingSection() {
  return (
    <section className="pricing-section py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h3 className="text-2xl font-semibold text-center mb-4">One-Time Purchase</h3>
            <p className="text-gray-600 text-center mb-6">Get lifetime access to Directory Maker</p>
            <div className="text-4xl font-bold text-center mb-6">$79</div>
            <ul className="text-sm text-gray-600 mb-6">
              <li className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Full access to Directory Maker
              </li>
              <li className="mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                GitHub repository access
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Future updates included
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingSection;





