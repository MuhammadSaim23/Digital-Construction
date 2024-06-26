import React from 'react'
import './dashboard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding } from 'react-icons/fa';
import Productlist from './Productlist';
import Orders from './Orders';
import Welcome from './Welcome';
import AuthUser from '../AuthUser'
import Viewproducts from './viewproducts';
import Compprofile from './compprofile';

const Dashboard = () => {

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
        setDashboardData( <Compprofile/>
        );
        break;
      case 'List Products':
        setDashboardData(<Productlist/>
        );
        break;
      case 'View Products':
        setDashboardData( <Viewproducts/>
      );
          break;
      case 'View Orders':
        setDashboardData( <Orders/>

        );
        break;
      default:
        setDashboardData('');
    }
  const sidebarItems = document.querySelectorAll('.sidebar li');
  sidebarItems.forEach(item => item.classList.remove('selected'));
  e.target.parentElement.classList.add('selected');
  };
  return (
    <div className="dashboard">
      <header>
        <div className="company-name"><FaBuilding className="my-icon"/> <h1 id='comp'>Company Dashboard</h1></div>
        <span className="username"> 
        <button onClick={logoutUser} className="btn transparent1" >Logout</button>
        </span>
        
      </header>
      <main>
        <aside>
          <nav>
            <ul>
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>View Profile</li></Link>
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>List Products</li></Link>
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>View Products</li></Link>
            <Link to="#" onClick={handleSidebarItemClick}><li id='lists'>View Orders</li></Link>
            </ul>
          </nav>
        </aside>
        <section className='block'>
          <div>
          {dashboardData}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard