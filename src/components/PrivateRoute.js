import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const { currentUser, isLoadingUser } = useAuth();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoadingUser && !currentUser) {
      navigate('/login');
    }

    if (!isLoadingUser && currentUser) {
      setIsLoading(false);
    }
  }, [isLoadingUser, currentUser]);

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center flex-row py-5">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default PrivateRoute;
