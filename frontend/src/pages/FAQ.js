import React from 'react';
import FAQSection from '../components/FAQSection';
import SEO from '../components/SEO';

function FAQ() {
  return (
    <>
    <SEO 
  title="FAQ - Directory Maker | Common Questions Answered"
  description="Find answers to frequently asked questions about Directory Maker. Learn about licensing, customization, technical requirements, and support for your directory website project."
  canonicalUrl="/faq"
  keywords="directory website faq, directory software questions, directory maker help, business directory setup"
/>
    <main>
      <h1>Frequently Asked Questions</h1>
      <FAQSection />
    </main>
    </>
  );
}

export default FAQ;