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

const defaultUser = {
  userName: "",
  id: undefined,
  isAdmin: undefined, 
  defaultBookId: undefined,
  booksIds: []
}

function App() {
  const [currentUser, setCurrentUser] = useState<User>(defaultUser);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.log("user in App from state", currentUser)
  

  const UserData: UserContextType = {
    user: currentUser?.userName,
    isAdmin: currentUser?.isAdmin,
    userId: currentUser?.userId,
    defaultBookId: currentUser?.defaultBookId,
    currentBook: currentUser?.defaultBookId,
    booksIds: currentUser?.booksIds,
    setCurrentUser
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
      const userId = extractAndSetUser(res.token, setCurrentUser)
      API.token = res.token;
      localStorage.setItem("user-token", res.token);
      validateUserFetchBooks(userId, setCurrentUser);
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
