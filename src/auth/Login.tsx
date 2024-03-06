import { useState } from 'react';
import InputWithLabel from '../components/InputWithLabel'
import '../styles/Login.css';


const defaultCredentials: { email: string, password: string } = { email: "", password: "" };

/** Renders login form
 * 
 * App -> LoginForm
 */
function LoginForm() {
  const [credentials, setCredentials] = useState(defaultCredentials);

  /** sends form data */
  function handleSubmit() {
    
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
            name={"Email:"}
            id={"email"}
            type={"email"}
            className={"LoginForm-email"}
            handleChange={handleChange}
            value={credentials.email}
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
      </form>
    </div>
  );
}

export default LoginForm;
