import React, { useState } from 'react';
import Login from '../auth/Login'; 
import SignUp from '../auth/SignUp'; 
import '../styles/AuthTabs.css'; 
import { AuthProps } from '../utils/types';

function AuthTabs({ signUp, login }: AuthProps) {
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
        {activeTab === 'login' ? <Login /> : <SignUp signUp={signUp}/>}
      </div>
    </div>
  );
}

export default AuthTabs;
