import SignUp from "../auth/SignUp";

export type User = {
  userName: string;
}

export type UserLogin = User & {
  password: string;
}

export type UserSignUp = User & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export type SignUp = {
  signUp: (signUpData: UserSignUp) => void;
}

export type Login = {
  login: (loginData: UserLogin) => void;
}

export type AuthProps = Login & SignUp