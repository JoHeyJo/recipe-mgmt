//components
import InputWithLabelForm from "../components/views/InputWithLabelForm";
import Alert from "../components/ui/Alert";
//modules
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
//styles
import "../styles/theme.css";
import { PillButtonSubmit } from "../components/ui/PillButtonSubmit";
import { SignUp as SignUpProps, UserSignUp } from "../utils/types";
import { errorHandling } from "../utils/ErrorHandling";

const defaultNew: UserSignUp = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  userName: "",
};

/** Render SignUp form - handles SignUp logic
 *
 * New user by default is not an admin. Admin PRIVILEGES are granted to user
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
    setNewUser((user) => ({ ...user, [id]: value }));
  }

  /** Submits new user data for */
  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      await signUp(newUser);
      setNewUser(defaultNew);
      navigate("/home");
    } catch (error: any) {
      const message = errorHandling("SignUp", error);
      setAlert(message);
    }
  }

  return (
    <>
      <div className="SignUp-container flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="SignUp flex flex-col p-5 rounded-lg shadow w-full max-w-sm"
        >
          <div className="form-group block mb-2">
            <InputWithLabelForm
              styles={"w-full p-2.5 mb-4 border border-gray-800 rounded text-base"}
              name={"First Name:"}
              id={"firstName"}
              type={"text"}
              className={"SignUp-fn"}
              handleChange={handleChange}
              value={newUser.firstName}
              required={true}
            />
          </div>
          <div className="form-group block mb-2">
            <InputWithLabelForm
              styles={"w-full p-2.5 mb-4 border border-gray-800 rounded text-base"}
              name={"Last Name:"}
              id={"lastName"}
              type={"text"}
              className={"SignUp-ln"}
              handleChange={handleChange}
              value={newUser.lastName}
              required
            />
          </div>
          <div className="form-group block mb-2">
            <InputWithLabelForm
              styles={"w-full p-2.5 mb-4 border border-gray-800 rounded text-base"}
              id={"email"}
              name={"Email:"}
              className={"SignUp-email"}
              type={"email"}
              handleChange={handleChange}
              value={newUser.email}
              required
            />
          </div>
          <div className="form-group block mb-2">
            <InputWithLabelForm
              styles={"w-full p-2.5 mb-4 border border-gray-800 rounded text-base"}
              id={"password"}
              name={"Password:"}
              className={"SignUp-pw"}
              type={"password"}
              value={newUser.password}
              handleChange={handleChange}
              required
            />
          </div>
          <div className="form-group block mb-2">
            <InputWithLabelForm
              styles={"w-full p-2.5 mb-4 border border-gray-800 rounded text-base"}
              id={"userName"}
              name={"User name:"}
              type={"text"}
              className={"SignUp-user-input"}
              value={newUser.userName}
              handleChange={handleChange}
              required
            />
          </div>
          <PillButtonSubmit action={"submit"} />
        </form>
      </div>
      {alert && <Alert alert={alert} degree={"yellow"} />}
    </>
  );
}

export default SignUp;
