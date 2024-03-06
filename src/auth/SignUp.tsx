//components
import InputWithLabel from '../components/InputWithLabel';
import Alert from '../components/common/Alert';
//modules
import API from '../api'
import { newUser } from '../utils/types'
import { ChangeEvent, useState } from 'react';
//styles
import '../styles/SignUp.css'
import { PillButton } from '../components/common/PillButton';

const defaultNew: newUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  userName: ""
}

/** Render SignUp form - handles SignUp logic */
function SignUp() {
  const [newUser, setNewUser] = useState(defaultNew);

  /** Handle changes to sign up form */
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { id, value } = event.target;
    setNewUser(user => (
      { ...user, [id]: value }
    ))
  }

  /** Submits new user data for */
  async function handleSubmit() {
    try {
      const token = await API.signUp(newUser);
      return token
    } catch (error) {

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
              id={'user'}
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
      {/* <Alert /> */}
    </>
  )
}

export default SignUp;