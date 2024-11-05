import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Access() {
  const [githubUsername, setGithubUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const location = useLocation();

  const checkPaymentStatus = useCallback(async (params) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/submit-github-username`,
        {
          params: params,
          headers: { 'ngrok-skip-browser-warning': 'true' }
        }
      );

      if (response.data.paid) {
        setIsPaid(true);
        setMessage('Payment successful! Please enter your GitHub username to gain access.');
      } else {
        setMessage('Payment is still processing. Please wait a moment and try again.');
        if (retryCount < 5) {
          setTimeout(() => {
            setRetryCount(prevCount => prevCount + 1);
            checkPaymentStatus(params);
          }, 5000);
        } else {
          setMessage('Payment processing is taking longer than expected. Please contact support if this persists.');
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      if (retryCount < 5) {
        setTimeout(() => {
          setRetryCount(prevCount => prevCount + 1);
          checkPaymentStatus(params);
        }, 5000);
      } else {
        setMessage('Unable to verify payment status. Please contact support.');
      }
    }
  }, [retryCount]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const sessionId = params.get('session_id');
    const state = params.get('state');
    
    if (token) {
      // Pass all available parameters
      checkPaymentStatus({ 
        token,
        session_id: sessionId,
        state
      });
    } else {
      setMessage('Invalid access. Please make sure you\'ve completed the payment process.');
    }
  }, [location, checkPaymentStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const sessionId = params.get('session_id');
    const state = params.get('state');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/submit-github-username`,
        { 
          token,
          session_id: sessionId,
          state,
          githubUsername 
        },
        { 
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      if (response.data.isOwner) {
        setMessage('You are the repository owner. Access is already granted.');
      } else {
        setMessage('An invitation has been sent to your GitHub account. Please check your email and accept the invitation.');
      }
    } catch (error) {
      console.error('Error submitting GitHub username:', error);
      setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Access Your Purchase</h1>
      {isPaid ? (
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
          {message || 'Waiting for payment confirmation...'}
        </p>
      )}
      {message && <p className="mt-4 text-center font-semibold">{message}</p>}
    </div>
  );
}

export default Access;