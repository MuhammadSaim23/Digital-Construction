import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';
import Appoinments from '../BuilderDashboard/Appoinments';
import Managecustomers from './Managecustomers';
import Managebuilders from './Managebuilders';
import Managecompanies from './Managecompanies';
import Manageinspectors from './Manageinspectors';
import Welcome from '../Dashboard/Welcome';
import AuthUser from '../AuthUser'

const Builderdashboard = () => {

  const { token, logout } = AuthUser();

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };

  const [dashboardData, setDashboardData] = useState(<Welcome/>);

  const handleSidebarItemClick = (e) => {
    e.preventDefault();
    const linkText = e.target.innerText;
    switch (linkText) {
      case 'Manage Customers':
        setDashboardData(<Managecustomers/>
        );
        break;
      case 'Manage Builders':
        setDashboardData(<Managebuilders/>

        );
        break;
      case 'Manage Companies':
        setDashboardData(<Managecompanies/>
            
        );
        break;
      case 'Manage Inspectors':
        setDashboardData(<Manageinspectors/>
              
        );
        break;
      default:
        setDashboardData(<Welcome/>);
    }

  };
  return (
    <div className="dashboard">
      <header>
        <div className="company-name"><FaUserPlus className="my-icon"/> <h1 id='comp'>Admin Panel</h1></div>
        <span className="username"> 
        <button onClick={logoutUser} className="btn transparent1" >Logout</button>
        </span>
        
      </header>
      <main>
        <aside>
          <nav>
            <ul>
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>Manage Customers</li></Link>
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>Manage Builders</li></Link>
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>Manage Companies</li></Link> 
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>Manage Inspectors</li></Link> 
            </ul>
          </nav>
        </aside>
        <section  className='block'>
          {dashboardData}
        </section>
      </main>
    </div>
  )
}

export default Builderdashboard