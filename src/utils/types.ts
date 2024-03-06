export type UserSignUp = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  isAdmin: boolean;
}

export type SignUp = {
  signUp: (signUpData: UserSignUp) => void;
}