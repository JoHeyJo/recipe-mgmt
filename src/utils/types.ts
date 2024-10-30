import SignUp from "../auth/SignUp";

export type RecipeData = Recipe & {
  user_id: number,
  book_id: number,
}

export type Recipe = {
  id: number;
  name: string,
  instructions: Instructions,
  notes: string,
  ingredients: Ingredient[]
}
export type Ingredient = {
  amount: Option;
  unit: Option;
  item: Option;
}

export type User = {
  userName: string;
  id?: number;
  defaultBookId?: number;
  currentBookId?: number;
  booksIds?: number[];
}

export type UserLogin = User & {
  password: string;
}

export type UserSignUp = User & {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type SignUp = {
  signUp: (signUpData: UserSignUp) => Promise<void>;
}

export type Login = {
  login: (loginData: UserLogin) => Promise<void>;
}

export type AuthProps = Login & SignUp

export type JWTPayload = {
  sub: number;
}

export type Option = {
  id: string | number | null;
  name?: string;
  value?: string;
  type?: string;
}

export type Instruction = { id: string | number | null , instruction: string }

export type Instructions = Instruction[];

export type Manager = Option | Instruction

export type Book = {
  id: null | number;
  title: string;
  description: string;
}