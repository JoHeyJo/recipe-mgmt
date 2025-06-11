//components
import RoutesList from "./nav-routes/RoutesList";
//modules
import { useState, useEffect } from "react";
import { UserSignUp as SignUpData, UserLogin } from "./utils/types";
import API from "./api";
import { UserContext, UserContextType } from "./context/UserContext";
import { User } from "./utils/types";
import { BrowserRouter } from "react-router-dom";
//styles
import "./styles/App.css";
import "./styles/light.css";
import "./styles/dark.css";
import "./styles/theme.css";
import { errorHandling } from "./utils/ErrorHandling";
import {
  extractAndSetUser,
  validateUserFetchBooks,
} from "./utils/fetchRequests";
import useLocalStorage from "./hooks/useLocalStorage";
import TopNav from "./components/layout/TopNav";

const TOKEN_STORAGE_ID = "user-token";
const USER_STORAGE_ID = "user-data";

const defaultUser = {
  userName: "",
  id: undefined,
  isAdmin: undefined,
  defaultBookId: undefined,
  currentBookId: undefined,
  books: [],
};

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [userData, setUserData] = useState<User>(defaultUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isContextInitialized, setIsContextInitialized] = useState(false);
  console.log("User data", userData)
  console.log("token:",token)

  const UserDataFromContext: UserContextType = {
    user: userData?.userName,
    userId: userData?.id,
    defaultBook: userData?.defaultBook,
    defaultBookId: userData?.defaultBookId, // remove?
    currentBookId: userData?.currentBookId || userData?.defaultBookId,
    books: userData?.books,
    token,
    setUserData,
    isLoading,
    isInitialized: isContextInitialized,
  };

  /** User sign up - returns token and auth credentials - saved to local storage */
  async function userSignUp(signUpData: SignUpData) {
    try {
      const res = await API.signUp(signUpData);
      const userId = await extractAndSetUser(res.token, setUserData);
      API.token = res.token;
      setToken(res.token);
      setIsContextInitialized(true)
    } catch (error: any) {
      errorHandling("App->userSignUp", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  /** User login - returns token */
  async function userLogin(loginData: UserLogin) {
    try {
      const res = await API.login(loginData);
      const userId = await extractAndSetUser(res.token, setUserData);
      API.token = res.token;
      setToken(res.token);
      setIsContextInitialized(true);
    } catch (error: any) {
      errorHandling("App->userLogin", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  /** Removes token and user data */
  function logout() {
    setToken(null);
    setUserData(null);
    setIsLoading(false);
  }

  /** persist user data state on refresh */
  useEffect(() => {
    API.token = token;
    async function persistUser() {
      const userId = await extractAndSetUser(token as string, setUserData);
    }
    if (token) {
      persistUser();
      // setIsLoading(false);
    }
  }, [token]);

  useEffect(()=>{
      if (userData?.id) {
        setIsContextInitialized(true);
        setIsLoading(false);
      }
  },[userData])
  
  if(isLoading) return <p>Loading...</p>//template of application with outdata

  return (
    <BrowserRouter>
      <div id="App-container">
        <UserContext.Provider value={UserDataFromContext}>
          <TopNav logout={logout} />
          <RoutesList signUp={userSignUp} login={userLogin} />
        </UserContext.Provider>
        {/* <button type="button" onClick={toggleDarkMode}>toggle color scheme</button> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
