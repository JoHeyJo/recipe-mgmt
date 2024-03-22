//components
import RoutesList from "./nav-routes/RoutesList";
//modules
import { useState, useEffect } from 'react';
import { UserSignUp as SignUpData, UserLogin } from './utils/types';
import API from "./api";
import { jwtDecode } from "jwt-decode";
import { UserContext, UserContextType } from "./auth/UserContext";
import { User, JWTPayload } from "./utils/types";
//styles
import './styles/App.css'
import { errorHandling } from "./components/common/ErrorHandling";
import extractAndSetUser from "./utils/utilities";


function App() {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  // const [token, setToken] = useLocalStorage();

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
      extractAndSetUser(res.token,setCurrentUser)
      API.token = res.token;
      localStorage.setItem("user-token", res.token);
    } catch (error: any) {
      errorHandling("App->userLogin", error)
      throw error;
    }
  }

  useEffect(()=>{
    const token = localStorage.getItem("user-token");
    if(token){
      extractAndSetUser(token, setCurrentUser)
      API.token = token;
    }
  },[])

  return (
    <div className="App">
      <UserContext.Provider value={UserData}>
        <RoutesList signUp={userSignUp} login={userLogin} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
