import React, { useState } from 'react';
import axios from 'axios';

function AccessForm({ token }) {
  const [githubUsername, setGithubUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/submit-github-username`, {
        token,
        githubUsername,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting GitHub username:', error);
      setMessage('Failed to grant access. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Grant GitHub Access</h2>
      <p className="mb-4">Please enter your GitHub username to receive access to the private repository:</p>
      <form onSubmit={handleSubmit}>
      <input
  type="text"
  value={githubUsername}
  onChange={(e) => setGithubUsername(e.target.value)}
  placeholder="GitHub Username"
  required
  className="w-full p-2 mb-4 border border-gray-300 rounded-lg bg-gray-800 text-white placeholder-gray-400"
/>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-700 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}

export default AccessForm;

