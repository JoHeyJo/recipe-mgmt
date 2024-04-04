//components
import RoutesList from "./nav-routes/RoutesList";
//modules
import { useState, useEffect } from 'react';
import { UserSignUp as SignUpData, UserLogin } from './utils/types';
import API from "./api";
import { UserContext, UserContextType } from "./auth/UserContext";
import { User } from "./utils/types";
import { BrowserRouter } from "react-router-dom";
//styles
import './styles/App.css'
import { errorHandling } from "./components/common/ErrorHandling";
import extractAndSetUser from "./utils/utilities";
import useLocalStorage from "./hooks/useLocalStorage";
import TopNav from "./components/TopNav";

const TOKEN_STORAGE_ID = "user-token"

function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  console.log("toggled")
}


function App() {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  const UserData: UserContextType = {
    user: currentUser?.userName,
    isAdmin: currentUser?.isAdmin
  }

  /** User sign up - returns token and auth credentials - saved to local storage */
  async function userSignUp(signUpData: SignUpData) {
    try {
      const credentials = await API.signUp(signUpData);
      console.log('credentials token', credentials)
    } catch (error: any) {
      errorHandling("App->userSignUp", error)
      throw error;
    }
  }

  /** User login - returns token */
  async function userLogin(loginData: UserLogin) {
    try {
      const res = await API.login(loginData);
      extractAndSetUser(res.token, setCurrentUser)
      API.token = res.token;
      localStorage.setItem("user-token", res.token);
    } catch (error: any) {
      errorHandling("App->userLogin", error)
      throw error;
    }
  }

  /** Removes token and user data */
  function logout() {
    setCurrentUser(undefined);
    setToken(null);
  }

  useEffect(() => {
    if (token) {
      extractAndSetUser(token as string, setCurrentUser)
      API.token = token;
    }
  }, [token])

  return (
    <BrowserRouter>
      <div className="App">
        <UserContext.Provider value={UserData}>
          <TopNav logout={logout} />
            <RoutesList signUp={userSignUp} login={userLogin} />
        </UserContext.Provider>
        <button type="button" onClick={toggleDarkMode}>toggle color scheme</button>
      </div>
    </BrowserRouter>
  );
}

export default App;
