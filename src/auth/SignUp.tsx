//components
import InputWithLabel from '../components/InputWithLabel';
import Alert from '../components/common/Alert';
//modules
import { ChangeEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
//styles
import '../styles/SignUp.css'
import { PillButton } from '../components/common/PillButton';
import { SignUp as SignUpProps, UserSignUp } from '../utils/types';
import { errorHandling } from '../components/common/ErrorHandling';

const defaultNew: UserSignUp = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  userName: "",
  isAdmin: false
}


/** Render SignUp form - handles SignUp logic 
 * 
 * New user by default is not an admin. Admin privileges are granted to user
 * when "Recipe Book" is created at time of creation to corresponding book.
*/
function SignUp({ signUp }: SignUpProps) {
  const [newUser, setNewUser] = useState(defaultNew);
  const [alert, setAlert] = useState(undefined); 
  const navigate = useNavigate();

  /** Handle changes to sign up form */
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { id, value } = event.target;
    setNewUser(user => (
      { ...user, [id]: value }
    ))
  }

  /** Submits new user data for */
  async function handleSubmit(event:any) {
    event.preventDefault();
    try {
      signUp(newUser);
      setNewUser(defaultNew);
      navigate("/Home")
    } catch (error: any) {
      errorHandling("SignUp",error)
      throw error
    }
  }

  return (
    <>
      <div className="SignUp-container">
        <form onSubmit={handleSubmit} className="SignUp">
          <div className="form-group">
            <InputWithLabel
              name={"First Name:"}
              id={"firstName"}
              type={"text"}
              className={"SignUp-fn"}
              handleChange={handleChange}
              value={newUser.firstName}
              required={true} />
          </div>
          <div className="form-group">
            <InputWithLabel
              name={"Last Name:"}
              id={'lastName'}
              type={'text'}
              className={'SignUp-ln'}
              handleChange={handleChange}
              value={newUser.lastName}
              required />
          </div>
          <div className='form-group'>
            <InputWithLabel
              id={'email'}
              name={'Email:'}
              className={'SignUp-email'}
              type={'email'}
              handleChange={handleChange}
              value={newUser.email}
              required />
          </div>
          <div className='form-group'>
            <InputWithLabel
              id={'password'}
              name={'Password:'}
              className={'SignUp-pw'}
              type={'password'}
              value={newUser.password}
              handleChange={handleChange}
              required />
          </div>
          <div className='form-group'>
            <InputWithLabel
              id={'userName'}
              name={'User name:'}
              type={'text'}
              className={'SignUp-user-input'}
              value={newUser.userName}
              handleChange={handleChange}
              required />
          </div>
          <PillButton action={'submit'} />
        </form>
      </div>
      {alert && <Alert alert={alert} degree={"yellow"} />}
    </>
  )
}

export default SignUp;