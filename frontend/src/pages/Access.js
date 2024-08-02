import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AccessForm from '../components/AccessForm';

function Access() {
  const [token, setToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('token');
    if (accessToken) {
      setToken(accessToken);
    }
  }, [location]);

  return (
    <main>
      <h1>Access Your Purchase</h1>
      {token ? (
        <AccessForm token={token} />
      ) : (
        <p>Invalid access token. Please make sure you've completed your purchase.</p>
      )}
    </main>
  );
}

export default Access;