//modules
import { useEffect, useState, FormEvent } from "react";
import { Login, UserLogin } from "../utils/types";
import { useNavigate, Navigate } from "react-router-dom";
//components
import { PillButtonSubmit } from "../components/ui/PillButtonSubmit";
import { errorHandling } from "../utils/ErrorHandling";
import InputWithLabelForm from "../components/views/InputWithLabelForm";
import Alert from "../components/ui/Alert";
//styles
import "../styles/Login.css";

const defaultCredentials: UserLogin = { userName: "", password: "" };

/** Renders login form
 *
 * App -> LoginForm
 */
function LoginForm({ login }: Login) {
  const [credentials, setCredentials] = useState<UserLogin>(defaultCredentials);
  const [alert, setAlert] = useState(undefined);

  const navigate = useNavigate();

  /** sends form data */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const res = await login(credentials);
      setCredentials(defaultCredentials);
      navigate("/home");
    } catch (error: any) {
      errorHandling("Login", error);
      setAlert(error.message);
    }
  }

  /** handles input change */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { id, value } = event.target;
    setCredentials((credentials) => ({ ...credentials, [id]: value }));
  }

  useEffect(() => {
    function hideAlert() {
      setTimeout(() => {
        setAlert(undefined);
      }, 3000);
    }
    hideAlert();
  }, [alert]);

  return (
    <div className="LoginForm-container">
      <form onSubmit={handleSubmit} className="LoginForm">
        <div className="form-group">
          <InputWithLabelForm
            name={"Username:"}
            id={"userName"}
            type={"text"}
            className={"LoginForm-email"}
            handleChange={handleChange}
            value={credentials.userName}
            required={true}
          />
        </div>
        <div className="form-group">
          <InputWithLabelForm
            name={"Password:"}
            id={"password"}
            type={"password"}
            className={"LoginForm-password"}
            handleChange={handleChange}
            value={credentials.password}
            required={true}
          />
        </div>
        <div id="Login-form-footer">
          <PillButtonSubmit action={"Login"} />
          {alert && <Alert alert={alert} degree={"yellow"} />}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
