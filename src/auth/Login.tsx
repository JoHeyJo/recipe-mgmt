//modules
import { useEffect, useState } from 'react';
import { Login, UserLogin } from '../utils/types';
import { useNavigate } from 'react-router-dom';
//components
import { PillButton } from '../components/common/PillButton';
import { errorHandling } from '../components/common/ErrorHandling';
import InputWithLabel from '../components/InputWithLabel'
import Alert from '../components/common/Alert';
//styles
import '../styles/Login.css';


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
  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      const res = await login(credentials);
      setCredentials(defaultCredentials);
      navigate("/home");
    } catch (error: any) {
      errorHandling("Login", error);
      setAlert(error.response.data.error)
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

  useEffect(() => {
    function hideAlert() {
      setTimeout(() => {
        setAlert(undefined);
      }, 3000)
    }
    hideAlert();
  }, [alert])

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
        <div id='Login-form-footer'>
          <PillButton action={"Login"} />
          {alert && <Alert alert={alert} degree={"yellow"} />}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
