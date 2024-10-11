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
import './styles/theme.css';
import './styles/light.css';
import './styles/dark.css';
import { errorHandling } from "./utils/ErrorHandling";
import { extractAndSetUser, validateUserFetchBooks } from "./utils/utilities";
import useLocalStorage from "./hooks/useLocalStorage";
import TopNav from "./components/layout/TopNav";

const TOKEN_STORAGE_ID = "user-token"
const USER_STORAGE_ID = "user-data"

const defaultUser = {
  userName: "",
  id: undefined,
  isAdmin: undefined, 
  defaultBookId: undefined,
  booksIds: []
}

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [userData, setUserData] = useState<User>(defaultUser);

  console.log("user in App from state", userData)
  
  const UserData: UserContextType = {
    user: userData?.userName,
    isAdmin: userData?.isAdmin,
    userId: userData?.userId,
    defaultBookId: userData?.defaultBookId,
    currentBookId: userData?.defaultBookId,
    booksIds: userData?.booksIds,
    setUserData
  }

  /** User sign up - returns token and auth credentials - saved to local storage */
  async function userSignUp(signUpData: SignUpData) {
    try {
      const res = await API.signUp(signUpData);
      const userId = await extractAndSetUser(res.token, setUserData)
      API.token = res.token;
      setToken(res.token);
      validateUserFetchBooks(userId, setUserData);
    } catch (error: any) {
      errorHandling("App->userSignUp", error)
      throw error;
    }
  }

  /** User login - returns token */
  async function userLogin(loginData: UserLogin) {
    try {
      const res = await API.login(loginData);
      const userId = await extractAndSetUser(res.token, setUserData)
      API.token = res.token;
      setToken(res.token);
      validateUserFetchBooks(userId, setUserData);
    } catch (error: any) {
      errorHandling("App->userLogin", error)
      throw error;
    }
  }

  /** Removes token and user data */
  function logout() {
    setUserData(undefined);
    setToken(null);
    setUserData(null);
  }

  /** persist user data state on refresh */
  useEffect(() => {
    async function persistUser(){
      const userId = await extractAndSetUser(token as string, setUserData)
      validateUserFetchBooks(userId, setUserData);
      API.token = token as string;
    }
    if (token) {
      persistUser();
    }
  }, [token])

  // class="bg-[var(--background-color)] text-[var(--text-color)]"

  return (
    <BrowserRouter>
      {/* <div className="App bg-blue-900 dark:bg-slate-800"> */}
        <div className="bg-[var(--background-color)] text-[var(--text-color)]">
        <UserContext.Provider value={UserData}>
          <TopNav logout={logout} />
          <RoutesList signUp={userSignUp} login={userLogin} />
        </UserContext.Provider>
        {/* <button type="button" onClick={toggleDarkMode}>toggle color scheme</button> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
