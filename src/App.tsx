//components
import RoutesList from "./nav-routes/RoutesList";
//modules
import { useState } from 'react';
import { UserSignUp as SignUpData } from './utils/types';
import API from "./api";
//styles
import './styles/App.css'

function App() {
  const [currentUser, setCurrentUser] = useState();

  /** User sign up - returns token and auth credentials - saved to local storage */
  async function userSignUp(signUpData: SignUpData){
    try {
      const credentials = await API.signUp(signUpData);
      console.log('credentials token',credentials)
    } catch (error) {
      throw error;
    }
  }

  return (
    <div className="App">
      <RoutesList signUp={userSignUp}/>
    </div>
  );
}

export default App;
