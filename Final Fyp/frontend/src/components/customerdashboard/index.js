import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import Shopping from './Shopping';
import Appointbuilder from './Appointbuilder';
import Appointinspector from './Appointinspector';
import Cart from './Cart';
import Welcome from '../Dashboard/Welcome';
import Customerprofile from './customerprofile';
import AuthUser from '../AuthUser';
import Appoinments from './Appointments';
import Viewproject from './ViewProject';

const Customerdashboard = () => {
  const { token, logout } = AuthUser();

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  const [dashboardData, setDashboardData] = useState(<Welcome />);
  const [refresh, setRefresh] = useState(false);

  const handleSidebarItemClick = (e) => {
    e.preventDefault();
    const linkText = e.target.innerText;
    switch (linkText) {
      case 'View Profile':
        setDashboardData(<Customerprofile />);
        break;
      case 'Shopping':
        setDashboardData(<Shopping />);
        break;
      case 'Appoint builder':
        setDashboardData(<Appointbuilder />);
        break;
      case 'View Inspectors':
        setDashboardData(<Appointinspector />);
        break;
      case 'Cart':
        setDashboardData(<Cart />);
        break;
      case 'Appointments':
        setDashboardData(<Appoinments />);
        break;
      case 'View Projects':
        setDashboardData(<Viewproject />);
        break;
      default:
        setDashboardData(<Welcome />);
    }
    setRefresh(true); // Set refresh to true
    // Add selected class to clicked item
    const sidebarItems = document.querySelectorAll('.sidebar li');
    sidebarItems.forEach((item) => item.classList.remove('selected'));
    e.target.parentElement.classList.add('selected');
  };

  // Update the key prop to force refresh when refresh state changes
  const refreshedDashboardData = React.cloneElement(dashboardData, { key: refresh.toString() });

  return (
    <div className="dashboard">
      <header>
        <div className="company-name">
          <FaUser className="my-icon" />
          <h1 id="comp">Customer Dashboard</h1>
        </div>
        <span className="username">
          <button onClick={logoutUser} className="btn transparent1">
            Logout
          </button>
        </span>
      </header>
      <main>
        <aside>
          <nav>
            <ul>
              <Link to="#" onClick={handleSidebarItemClick}>
              
                <li id="lists">View Profile</li>
              </Link>
              <Link to="#" onClick={handleSidebarItemClick}>
                <li id="lists">Shopping</li>
              </Link>
              <Link to="#" onClick={handleSidebarItemClick}>
                <li id="lists">Appoint builder</li>
              </Link>
              <Link to="#" onClick={handleSidebarItemClick}>
                <li id="lists">View Inspectors</li>
              </Link>
              <Link to="#" onClick={handleSidebarItemClick}>
                <li id="lists"> Cart</li>
              </Link>
              <Link to="#" onClick={handleSidebarItemClick}>
                <li id="lists"> Appointments</li>
              </Link>
              <Link to="#" onClick={handleSidebarItemClick}>
                <li id="lists"> View Projects</li>
              </Link>
            </ul>
          </nav>
        </aside>
        <section className="block">{refreshedDashboardData}</section>
      </main>
    </div>
  );
};

export default Customerdashboard;
