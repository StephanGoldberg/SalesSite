import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'Directory Maker - Create Professional Directory & Listing Websites',
  description = 'Build powerful directory and listing websites with Directory Maker. Complete solution with enterprise security, advanced search, and admin dashboard. Perfect for agencies and developers.',
  canonicalUrl,
  ogType = 'website',
  keywords = 'directory website builder, listing website template, directory software, white label directory solution, business directory platform'
}) => {
  const baseUrl = 'https://www.directory-maker.com';
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Directory Maker" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#000000" />
      
      {/* Language and locale */}
      <meta property="og:locale" content="en_US" />
      <link rel="alternate" href={fullUrl} hrefLang="en" />
    </Helmet>
  );
};

export default SEO;