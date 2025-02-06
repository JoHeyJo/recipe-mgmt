import SignUp from "../auth/SignUp";

export type RecipeData = Recipe & {
  user_id: number,
  default_book_id: number,
}

export type Recipe = {
  id: number;
  name: string,
  instructions: Instructions,
  notes: string,
  ingredients: Ingredient[]
}
export type Ingredient = {
  ingredient_id?: number;
  id: number
  amount: AttributeData;
  unit: AttributeData;
  item: AttributeData;
}

export type Ingredients = Ingredient[];

export type User = {
  userName: string;
  id?: number;
  defaultBookId?: number;
  defaultBook?: Book;
  currentBookId?: number;
  books?: Book[];
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

export type AttributeData = {
  id: string | number | null;
  name?: string;
  value?: string;
  type?: string;
}

export type Instruction = { association_id?: number, id: string | number | null, instruction: string }

export type Instructions = Instruction[];

export type Manager = AttributeData | Instruction

export type Book = {
  id: number;
  title: string;
  description: string;
}
// export type Books = { books?: Book[] }