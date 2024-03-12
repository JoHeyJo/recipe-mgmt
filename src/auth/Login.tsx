import { useState } from 'react';
import InputWithLabel from '../components/InputWithLabel'
import '../styles/Login.css';
import { Login, UserLogin } from '../utils/types';
import { PillButton } from '../components/common/PillButton';
import { errorHandling } from '../components/common/ErrorHandling';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/common/Alert';


const defaultCredentials: UserLogin = { userName: "", password: "" };


/** Renders login form
 * 
 * App -> LoginForm
 */
function LoginForm({ login }: Login) {
  const [credentials, setCredentials] = useState(defaultCredentials);
  const [alert, setAlert] = useState(undefined);
  const navigate = useNavigate();

  /** sends form data */
  async function handleSubmit() {
    try {
      const res = await login(credentials);
      console.log("res in login", res);
      setCredentials(defaultCredentials);
      navigate("/home");
    } catch (error: any) {
      errorHandling("Login", error);
      setAlert(error.response.data.error)
      console.log('error in Login', error)
    }
  }

  /** handles input change */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { id, value } = event.target
    setCredentials(credentials => (
      { ...credentials, [id]: value }
    ))
  }

  return (
    <div className="LoginForm-container">
      <form onSubmit={handleSubmit} className="LoginForm">
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
        {/* <div className="form-group">
          <InputWithLabel
            name={"Password:"}
            id={"password"}
            type={"password"}
            className={"LoginForm-password"}
            handleChange={handleChange}
            value={credentials.password}
            required={true} />
        </div> */}
        <input type="password" id="password" required />

        {/* <label htmlFor="test" >test</label>
        <input
          type="text"
          id="test"
          required
        /> */}
        <PillButton action={"Login"} />
      {alert ? <Alert alert={alert} degree={"yellow"} /> : ""}
      </form>
    </div>
  );
}

export default LoginForm;
