import React, { useState } from 'react';
import Login from '../auth/Login'; // Adjust path as necessary
import SignUp from '../auth/SignUp'; // Adjust path as necessary
import '../styles/AuthTabs.css'; // Import the CSS file

function AuthTabs() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="cardContainer">
      <nav>
        <ul className="navList">
          <li className={`navItem ${activeTab === 'login' ? 'navItemActive' : ''}`} onClick={() => setActiveTab('login')}>
            Login
          </li>
          <li className={`navItem ${activeTab === 'signup' ? 'navItemActive' : ''}`} onClick={() => setActiveTab('signup')}>
            Sign up
          </li>
        </ul>
      </nav>
      <div className="formContent">
        {activeTab === 'login' ? <Login /> : <SignUp />}
      </div>
    </div>
  );
}

export default AuthTabs;
