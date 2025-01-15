import { Dispatch } from "react";
import { jwtDecode } from "jwt-decode";
import { JWTPayload, User } from "./types";
import API from "../api";
import { errorHandling } from "./ErrorHandling";

/** Fetches specific user and updates state used by context */
export async function extractAndSetUser(token: string, setUser: (user: User) => void) {
  console.log("token", token)
  API.token = token;
  const { sub }: JWTPayload = jwtDecode(token);
  if (sub) {
    try {
      const res = await API.getUser(sub);
      console.log("response in extractAndSetUser", res)
      setUser({ 
        userName: res.user_name, 
        id: res.id, 
        defaultBookId:res.default_book.id,
        defaultBook: res.default_book,
        currentBookId: +localStorage.getItem("current-book-id") | res.default_book,
        books: [],

      })
      return sub
    } catch (error: any) {
      errorHandling("Utilities -> extractAndSetUser", error)
      throw error;
    }
  }
}

/** On successful auth populate user's books */
export async function validateUserFetchBooks(userId: number, setBooks: Dispatch<React.SetStateAction<User>>) {
  if (userId) {
    try {
      const res = await API.getUserBooks(userId);
      setBooks((books) => {
        const userBooks = { ...books };
        userBooks.books = res;
        return userBooks
      })
    } catch (error: any) {
      errorHandling("utilities - validateUserFetchBooks", error)
    }
  }
}

/** Get book request */
async function fetchBookRecipes(userId: number, bookId: number) {
  try {
    const recipes = await API.getBookRecipes(userId, bookId)
    return recipes
  } catch (error) {
    errorHandling("BookView -> fetchBook", error)
  }
}


// DEPRECATED
/** Sets first book created as default */
export function ensureDefaultBook(currentDefaultBookId: number, setId: Dispatch<React.SetStateAction<User>>, defaultBookId: number) {
  if (!currentDefaultBookId) {
    setId(user => {
      const updatedUser = { ...user };
      // updatedUser.defaultBook = defaultBook
      return updatedUser;
    })
  }
}


// export function toggleColorScheme() {
//   document.documentElement.classList.toggle('dark');
//   console.log("toggled")
// }

