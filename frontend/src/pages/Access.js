import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SEO from '../components/SEO';

function Access() {
  const [token, setToken] = useState('');
  const [githubUsername, setGithubUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const location = useLocation();

  const checkPaymentStatus = useCallback(async (tokenToCheck) => {
    try {
      console.log('Checking payment status for token:', tokenToCheck);
      console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/submit-github-username`, {
        params: { token: tokenToCheck },
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      console.log('Payment status response:', response.data);
      if (response.data.paid) {
        setIsPaid(true);
        setMessage('Payment successful! Please enter your GitHub username to gain access.');
      } else {
        setMessage('Payment is still processing. Please wait a moment and try again.');
        if (retryCount < 5) {
          setTimeout(() => {
            setRetryCount(prevCount => prevCount + 1);
            checkPaymentStatus(tokenToCheck);
          }, 5000);
        } else {
          setMessage('Payment processing is taking longer than expected. Please contact support if this persists.');
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      handleError(error);
      if (retryCount < 5) {
        setTimeout(() => {
          setRetryCount(prevCount => prevCount + 1);
          checkPaymentStatus(tokenToCheck);
        }, 5000);
      } else {
        setMessage('Unable to verify payment status. Please contact support.');
      }
    }
  }, [retryCount]);

  const handleError = (error) => {
    if (error.response && error.response.status === 404) {
      setMessage('Your session may have expired or the payment is still processing. Please try again or contact support.');
    } else if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
      setMessage(`Error: ${error.response.data.message || 'An unexpected error occurred. Please try again.'}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      setMessage('Unable to connect to the server. Please check your internet connection and try again.');
    } else {
      console.error('Error setting up request:', error.message);
      setMessage(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');
    console.log('Token from URL:', tokenFromUrl);
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      checkPaymentStatus(tokenFromUrl);
    } else {
      console.log('No token found in URL');
      setMessage('Invalid access. Please make sure you\'ve completed the payment process.');
    }
  }, [location, checkPaymentStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      console.log('Submitting GitHub username:', githubUsername);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/submit-github-username`,
        { token, githubUsername },
        { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      console.log('Submit GitHub username response:', response.data);
      if (response.data.isOwner) {
        setMessage('You are the repository owner. Access is already granted.');
      } else {
        setMessage('An invitation has been sent to your GitHub account. Please check your email and accept the invitation to gain access to the repository.');
      }
    } catch (error) {
      console.error('Error submitting GitHub username:', error);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <SEO 
  title="Access Repository - Directory Maker"
  description="Access your purchased Directory Maker repository. Start building your professional directory website with our complete solution."
  canonicalUrl="/access"
  keywords="directory maker access, directory software download, repository access"
/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Access Your Purchase</h1>
      {token && isPaid ? (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <input
            type="text"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            placeholder="Enter your GitHub username"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      ) : (
        <p className="text-red-600">
          {token ? 'Waiting for payment confirmation...' : 'Invalid access token. Please make sure you\'ve completed your purchase.'}
        </p>
      )}
      {message && <p className="mt-4 text-center font-semibold">{message}</p>}
    </div>
    </>
  );
}

export default Access;