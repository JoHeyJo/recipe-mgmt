import { useState } from 'react';
import '../styles/LoginForm.css';


const defaultCredentials: { email: string, password: string } = { email: "", password: "" };

/** Renders login form
 * 
 * App -> LoginForm
 */
function LoginForm() {
  const [credentials, setCredentials] = useState(defaultCredentials);

  /** sends form data */
  function handleSubmit() { }

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
          <label htmlFor="email" className="LoginForm-email-label">Email:</label>
          <input
            type="email"
            id="email"
            className="LoginForm-email-input"
            onChange={handleChange}
            value={credentials.email}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="LoginForm-pw-label">Password:</label>
          <input
            type="password"
            id="password"
            className="LoginForm-pw-input"
            onChange={handleChange}
            value={credentials.password}
            required />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
