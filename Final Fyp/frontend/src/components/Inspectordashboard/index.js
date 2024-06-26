import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserNurse } from 'react-icons/fa';
// import Inspectorappoinment from './Inspectorappointment';
import Adddetails from './Adddetails';
import Welcome from '../Dashboard/Welcome';
import AuthUser from '../AuthUser'
import Inspectorprofile from './inspectorprofile';

const Inspectordashboard = () => {

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
      case 'View Profile':
        setDashboardData(<Inspectorprofile/>
        );
        break;
      // case 'Appointments':
      //   setDashboardData(<Inspectorappoinment/>
      //   );
      //   break;
      case 'Add Details':
        setDashboardData(<Adddetails/>

        );
        break;
      default:
        setDashboardData(<Welcome/>);
    }
    // Add selected class to clicked item
  const sidebarItems = document.querySelectorAll('.sidebar li');
  sidebarItems.forEach(item => item.classList.remove('selected'));
  e.target.parentElement.classList.add('selected');
  };
  return (
    <div className="dashboard">
      <header>
        <div className="company-name"><FaUserNurse className="my-icon"/> <h1 id='comp'>Inspector Dashboard</h1></div>
        <span className="username"> 
        <button onClick={logoutUser} className="btn transparent1" >Logout</button>
        </span>
        
      </header>
      <main>
        <aside>
          <nav>
            <ul>
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>View Profile</li></Link>
            {/* <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>Appointments</li></Link> */}
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>Add Details</li></Link>
            {/* <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>View Sales</li></Link>  */}
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

export default Inspectordashboard