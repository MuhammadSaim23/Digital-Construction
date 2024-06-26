import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTools } from 'react-icons/fa';
import Appoinments from './Appoinments';
import Editdetails from './Editdetails';
import Welcome from '../Dashboard/Welcome';
import AuthUser from '../AuthUser'
import Builderprofile from './builderprofile';
import Viewproject from './ViewProject';


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
      case 'View Profile':
        setDashboardData(<Builderprofile/>
        );
        break;
      case 'Add Details':
        setDashboardData(<Editdetails/>

        );
        break;
      case 'My Appointments':
          setDashboardData(<Appoinments/>
              
          );
      break;
      case 'My Projects':
          setDashboardData(<Viewproject/>
              
          );
      break;
      default:
        setDashboardData(<Welcome/>);
    }

  };
  return (
    <div className="dashboard">
      <header>
        <div className="company-name"><FaTools className="my-icon"/> <h1 id='comp'>Builder Dashboard</h1></div>
        <span className="username"> 
        <button onClick={logoutUser} className="btn transparent1" >Logout</button>
        </span>
        
      </header>
      <main>
        <aside>
          <nav>
            <ul>
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>View Profile</li></Link>
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>Add Details</li></Link>
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>My Appointments</li></Link>
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>My Projects</li></Link>
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