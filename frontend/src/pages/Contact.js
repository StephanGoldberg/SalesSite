import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import SEO from '../components/SEO';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Use EmailJS to send the email. Make sure you have signed up at emailjs.com,
    // created a service (using your Gmail account, for example), and an email template
    // that sends messages to nela.petria@gmail.com.
    emailjs
      .send(
        'service_malpp6p',   // Replace with your EmailJS service ID
        'template_cs8vlwf',  // Replace with your EmailJS template ID
        formData,
        'vvI18T3SDa1c0pHev'       // Replace with your EmailJS user ID or public key
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setFeedbackMessage('Thank you for reaching out! We will get back to you soon.');
          setFormData({ name: '', email: '', message: '' });
          setLoading(false);
        },
        (err) => {
          console.error('FAILED...', err);
          setFeedbackMessage('There was an error sending your message. Please try again later.');
          setLoading(false);
        }
      );
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
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <p className="mb-8 text-center">
          If you have any questions or would like to get in touch, please fill out the form below and we'll get back to you as soon as possible.
        </p>
        {feedbackMessage && (
          <p className="mb-4 text-center text-green-600 font-medium">
            {feedbackMessage}
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
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
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
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
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
              Message
            </label>
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
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-full font-bold hover:bg-blue-700 transition duration-300"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </>
  );
}

export default Contact;

