import React, { useState } from 'react';
import SEO from '../components/SEO';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send the data to a backend server or an email address
    alert('Thank you for reaching out! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
    <SEO 
  title="Contact - Directory Maker | Get Support"
  description="Contact the Directory Maker team for support, questions about licensing, or technical assistance with your directory website project."
  canonicalUrl="/contact"
  keywords="directory maker support, directory software help, business directory assistance"
/>
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <p className="mb-8">
        If you have any questions or would like to get in touch, please fill out the form below and we'll get back to you as soon as possible.
      </p>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="5"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-full font-bold hover:bg-blue-700 transition duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
    </>
  );
}

export default Contact;
