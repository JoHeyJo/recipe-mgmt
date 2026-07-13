import React, { useState } from "react";
import Login from "../../auth/Login";
import SignUp from "../../auth/SignUp";
import { AuthProps } from "../../utils/types";
import { useSearchParams } from "react-router-dom";

/** Displays user auth forms
 *
 *
 * RoutesList -> AuthTabs -> [Login, SignUp]
 */
function AuthTabs({ signUp, login }: AuthProps) {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || "login",
  );

  // border-solid border-b border-white border-b-1
  return (
    <div className="cardContainer border border-border-color flex flex-col rounded-lg shadow-md w-[80vw] xs:w-[50vw] md:w-[40vw] xl:w-[30vw] mx-auto mt-[5%] overflow-hidden h-[75vh]">
      <nav id="AuthTabs-container">
        <ul className="navList flex list-none m-0 p-0">
          <li
            className={`navItem cursor-pointer flex-1 text-center p-2 transition-colors duration-300 ${activeTab === "login" ? "light-border" : "border-b bg-selected"}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </li>
          <li
            className={`navItem cursor-pointer flex-1 text-center p-2 transition-colors duration-300 ${activeTab === "signup" ? "light-border font-bold" : "border-b bg-selected"}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign up
          </li>
        </ul>
      </nav>
      <div className="formContent overflow-y-auto flex-1 flex flex-col justify-center">
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
