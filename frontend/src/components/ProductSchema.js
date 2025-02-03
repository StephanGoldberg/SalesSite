import React from 'react';
import { Helmet } from 'react-helmet-async';

const ProductSchema = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Directory Maker",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": [
      {
        "@type": "Offer",
        "name": "Standard License",
        "price": "79.00",
        "priceCurrency": "USD",
        "description": "Single project license with lifetime updates",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Agency License",
        "price": "499.00",
        "priceCurrency": "USD",
        "description": "Unlimited projects license with white labeling",
        "availability": "https://schema.org/InStock"
      }
    ],
    "description": "Professional directory and listing website builder with enterprise-grade features. Build business directories, job boards, real estate listings, and more.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "features": [
      "Advanced Search System",
      "Enterprise-Grade Security",
      "Complete Admin Dashboard",
      "White Label Solution",
      "Payment Processing",
      "User Authentication"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default ProductSchema;