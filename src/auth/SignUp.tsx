//components
import InputWithLabelForm from "../components/views/InputWithLabelForm";
import Alert from "../components/ui/Alert";
//modules
import { ChangeEvent, useEffect, useState, FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
//styles
import "../styles/theme.css";
import { PillButtonSubmit } from "../components/ui/PillButtonSubmit";
import { SignUp as SignUpProps, UserSignUp } from "../utils/types";
import { errorHandling } from "../utils/ErrorHandling";
import API from "../api";
import PopOut from "../components/ui/common/PopOut";

const defaultNew: UserSignUp = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  userName: "",
};

const isProd = process.env.NODE_ENV === "production";
const environment = process.env.NODE_ENV;

/** Render SignUp form - handles SignUp logic
 * PROD and DEV build have different signup UI/UX
 * Production requires user request token before signing up
 *
 * New user by default is not an admin. Admin PRIVILEGES are granted to user
 * when "Recipe Book" is created at time of creation to corresponding book. - DEPRECATED?
 */

function SignUp({ signUp }: SignUpProps) {
  const [newUser, setNewUser] = useState(defaultNew);
  const [alert, setAlert] = useState(undefined);
  const [message, setMessage] = useState("");
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [needsInvite, setNeedsInvite] = useState(true);
  const [token, setToken] = useState("");

  /** Handle changes to sign up form */
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { id, value } = event.target;
    setNewUser((user) => ({ ...user, [id]: value }));
  }

  /** Submits new user data for */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {

      console.log("torken in handleSubmit:",token)
      await signUp(newUser, token);
      setNewUser(defaultNew);
    } catch (error: any) {
      const message = errorHandling("SignUp - handleSubmit", error);
      setAlert(message);
    }
  }

  async function handleInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const res = await API.requestInvite(newUser.email);
      setMessage(res.message);
      setIsMessageOpen(true);
    } catch (error) {
      const message = errorHandling("SignUp - handleInvite", error);
      setAlert(message);
    }
  }

  function handleCloseMessage() {
    setIsMessageOpen(false);
  }

  function handleResetMessage() {
    setMessage("");
  }

  /** Checks for beta tester invitation */
  useEffect(() => {
    // if(environment === "development") setNeedsInvite(false);
    const URLEmail = searchParams.get("email");
    const URLToken = searchParams.get("token");
    try {
      if(URLToken){
        const isTokenValid = jwtDecode(URLToken);
        if (isTokenValid && true) {
          API.token = URLToken
          setNeedsInvite(false);
          setNewUser({...newUser, email: URLEmail})
          console.log("token insighup:",URLToken)
          setToken(URLToken)
          setSearchParams(searchParams, { replace: true });
        }
      } 
    } catch (error) {
      const message = errorHandling("SignUp - token validation", error);
      setAlert(message);
    }
    
    
  }, [searchParams]);

  return (
    <>
      <div className="SignUp-container flex justify-center items-center">
        <PopOut
          message={message}
          isDialogOpen={isMessageOpen}
          onCloseDialog={handleCloseMessage}
          onResetMessage={handleResetMessage}
        />
        <form
          onSubmit={needsInvite ? handleInvite : handleSubmit}
          className="SignUp flex flex-col p-5 rounded-lg shadow w-full max-w-sm"
        >
          <div className="form-group block mb-2">
            <InputWithLabelForm
              styles={`w-full p-2.5 mb-4 border border-gray-800 rounded text-base ${needsInvite && "bg-gray-500"}`}
              isDisabled={needsInvite}
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
              styles={`w-full p-2.5 mb-4 border border-gray-800 rounded text-base ${needsInvite && "bg-gray-500"}`}
              isDisabled={needsInvite}
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
              styles={
                "w-full p-2.5 mb-4 border border-gray-800 rounded text-base"
              }
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
              styles={`w-full p-2.5 mb-4 border border-gray-800 rounded text-base ${needsInvite && "bg-gray-500"}`}
              isDisabled={needsInvite}
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
              styles={`w-full p-2.5 mb-4 border border-gray-800 rounded text-base ${needsInvite && "bg-gray-500"}`}
              isDisabled={needsInvite}
              id={"userName"}
              name={"User name:"}
              type={"text"}
              className={"SignUp-user-input"}
              value={newUser.userName}
              handleChange={handleChange}
              required
            />
          </div>
          <PillButtonSubmit
            action={needsInvite ? "Request Invite" : "submit"}
          />
        </form>
      </div>
      {alert && <Alert alert={alert} degree={"yellow"} />}
    </>
  );
}

export default SignUp;
