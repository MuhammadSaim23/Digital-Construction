import React, {useEffect} from 'react'
import AuthUser from '../components/AuthUser';
import LoginUi from '../components/Signin'

import Inspectordashboard from '../components/Inspectordashboard'
import { useNavigate } from 'react-router-dom';


const InspectordashboardPage = () => {
  const navigate = useNavigate();
  const { getToken } = AuthUser();

  useEffect(() => {
    const handleBrowserBackButton = () => {
      // Check if the user is logged in
      const isLoggedIn = getToken();

      if (isLoggedIn) {
        navigate("/inspectordashboard"); // Redirect to the home page or any other authorized page
      }
      
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", handleBrowserBackButton);

    return () => {
      window.removeEventListener("popstate", handleBrowserBackButton);
    };
  }, [getToken, navigate]);
  if (!getToken()) {
    return <LoginUi />;
  }
    return (
      <Inspectordashboard/>
    )
  } 

export default InspectordashboardPage