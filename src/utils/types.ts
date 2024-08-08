import SignUp from "../auth/SignUp";

export type RecipeData = Recipe & {
  user_id: number,
  book_id: number,
}

export type Recipe = {
  name: string,
  preparation: string[],
  notes: string[],
  ingredients: Ingredient[]
}
export type Ingredient = {
  liquid: object;
  amount: object;
  unit: object;
}

export type User = {
  userName: string;
  isAdmin: boolean;
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
  signUp: (signUpData: UserSignUp) => Promise<void>;
}

export type Login = {
  login: (loginData: UserLogin) => Promise<void>;
}

export type AuthProps = Login & SignUp

export type JWTPayload = {
  sub: string | React.Dispatch<React.SetStateAction<string>>;
  is_admin: boolean;
}
// BaseOption with a required id
type BaseOption = {
  id: number | null;
};

// DynamicProperties allowing for any other properties as string | null
type DynamicProperties = {
  [key: string]: string | null;
};

// Combine both to form the Option type - this allows type safety for Option & Option[]
export type Option = BaseOption & {
  [key: string]: string | number | null;
};
// 