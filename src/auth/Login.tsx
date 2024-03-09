import { useState } from 'react';
import InputWithLabel from '../components/InputWithLabel'
import '../styles/Login.css';
import { Login, UserLogin } from '../utils/types';
import { PillButton } from '../components/common/PillButton';
import { errorHandling } from '../components/common/ErrorHandling';


const defaultCredentials: UserLogin = { userName: "", password: "" };


/** Renders login form
 * 
 * App -> LoginForm
 */
function LoginForm({login}: Login ) {
  const [credentials, setCredentials] = useState(defaultCredentials);

  /** sends form data */
  async function handleSubmit() {
    try {
      login(credentials);
    } catch (error: any) {
      errorHandling("Login",error);
      throw error
    }
   }

  /** handles input change */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { id, value } = event.target
    console.log(id, value)
    setCredentials(credentials => (
      { ...credentials, [id]: value }
    ))
  }

  return (
    <div className="LoginForm-container">
      <form className="LoginForm">
        <div className="form-group">
          <InputWithLabel
            name={"Username:"}
            id={"userName"}
            type={"text"}
            className={"LoginForm-email"}
            handleChange={handleChange}
            value={credentials.userName}
            required={true} />
        </div>
        <div className="form-group">
          <InputWithLabel
            name={"Password:"}
            id={"password"}
            type={"password"}
            className={"LoginForm-password"}
            handleChange={handleChange}
            value={credentials.password}
            required={true} />
        </div>
        <PillButton handleAction={handleSubmit} action={"Login"} />
      </form>
    </div>
  );
}

export default LoginForm;
