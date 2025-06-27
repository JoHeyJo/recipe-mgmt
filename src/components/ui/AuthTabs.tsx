import React, { useState } from "react";
import Login from "../../auth/Login";
import SignUp from "../../auth/SignUp";
import "../../styles/AuthTabs.css";
import { AuthProps } from "../../utils/types";

/** Displays user auth forms
 *
 *
 * RoutesList -> AuthTabs -> [Login, SignUp]
 */
function AuthTabs({ signUp, login }: AuthProps) {
  const [activeTab, setActiveTab] = useState("login");
  // border-solid border-b border-white border-b-1
  return (
    <div className="cardContainer border border-test-color">
      <nav id="AuthTabs-container">
        <ul className="navList">
          <li
            className={`navItem ${activeTab === "login" ? "light-border" : "navItemActive"}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </li>
          <li
            className={`navItem ${activeTab === "signup" ? "light-border" : "navItemActive"}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign up
          </li>
        </ul>
      </nav>
      <div className="formContent">
        {activeTab === "login" ? (
          <Login login={login} />
        ) : (
          <SignUp signUp={signUp} />
        )}
      </div>
    </div>
  );
}

export default AuthTabs;
