import { useState } from 'react';
import InputWithLabel from '../components/InputWithLabel';
import '../styles/SignUp.css'

type DefaultNew = {
  firstName:string;
  lastName:string;
  email: string;
  password: string;
  userName: string;
}

const defaultNew: DefaultNew = {
  firstName: "",
  lastName: "",
  email: "",
  password:"",
  userName:""
}

/** Render signup form - handles SignUp logic */
function SignUp() {
  const [newUser, setNewUser] = useState();

  return (
    <div className="SignUp-container">
      <form className="SignUp">
        <div className="form-group">
          <InputWithLabel
            name={"First Name"}
            id={"firstName"}
            type={"text"}
            className={"SignUp-fn"}
            handleChange={()=>{}}
            value={''}
            required={true} />
        </div>
        <div className="form-group">
          <label htmlFor='lastName' className='SignUp-ln'>Last Name</label>
          <input 
            id='lastName'
            type='text'
            className='SignUp-ln'
            value={''}
            required/>
        </div>
      </form>
    </div>
  )
}

export default SignUp;