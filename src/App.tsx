//components
import RoutesList from "./nav-routes/RoutesList";
//modules
import { useState } from 'react';
import { UserSignUp as SignUpData, UserLogin } from './utils/types';
import API from "./api";
//styles
import './styles/App.css'
import { errorHandling } from "./components/common/ErrorHandling";

function App() {
  const [currentUser, setCurrentUser] = useState();

  /** User sign up - returns token and auth credentials - saved to local storage */
  async function userSignUp(signUpData: SignUpData) {
    try {
      const credentials = await API.signUp(signUpData);
      console.log('credentials token', credentials)
    } catch (error: any) {
      errorHandling("App->userSignUp",error)
      throw error;
    }
  }

  /** User login - returns token */
  async function userLogin(loginData: UserLogin) {
    try {
      const res = await API.login(loginData);
      return res;
    } catch (error: any) {
      errorHandling("App->userLogin",error)
      throw error;
    }
  }

  return (
    <div className="App">
      <RoutesList signUp= {userSignUp} login={userLogin} />
    </div>
  );
}

export default App;
