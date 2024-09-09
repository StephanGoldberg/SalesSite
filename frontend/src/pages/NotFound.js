import React from 'react';

function NotFound() {
  return (
    <div className="container mx-auto text-center py-10">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="text-blue-600 hover:underline">Go back to Home</a>
    </div>
  );
}

export default NotFound;
