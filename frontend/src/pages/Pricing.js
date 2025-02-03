import React from 'react';
import PricingSection from '../components/PricingSection';
import SEO from '../components/SEO';

function Pricing() {
  return (
    <>
    <SEO 
  title="Pricing - Directory Maker | Standard & Agency Licenses"
  description="Choose your Directory Maker license: Standard ($79) for single projects or Agency ($499) for unlimited use with white labeling. One-time payment, lifetime updates."
  canonicalUrl="/pricing"
  keywords="directory website pricing, directory software cost, white label directory pricing, business directory license"
/>
    <main>
      <h1>Pricing</h1>
      <PricingSection />
    </main>
    </>
  );
}

export default Pricing;