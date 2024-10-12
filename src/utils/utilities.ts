import { Dispatch } from "react";
import { jwtDecode } from "jwt-decode";
import { JWTPayload, User } from "../utils/types";
import API from "../api";
import { errorHandling } from "./ErrorHandling";

/** Fetches specific user and updates state used by context */
export async function extractAndSetUser(token: string, setUser: (user: User) => void) {
  console.log("token", token)
  const { sub }: JWTPayload = jwtDecode(token);
  console.log("sub", sub)
  if (sub) {
    try {
      const res = await API.getUser(sub);
      console.log("response in extractAndSetUser", res)

      setUser({ 
        userName: res.user_name, 
        id: res.id, 
        defaultBookId: res.book_id,
        booksIds: res.book_ids,

      })
      console.log("set user")
      return sub
    } catch (error: any) {
      errorHandling("Utilities -> extractAndSetUser", error)
      throw error;
    }
  }
}

/** On successful auth populate user's books ids */
export async function validateUserFetchBooks(userId: number, setBooks: Dispatch<React.SetStateAction<User>>) {
  if (userId) {
    try {
      const bookIds = await API.getUserBooks(userId);
      setBooks((books) => {
        const userBooks = { ...books };
        userBooks.booksIds = bookIds.books;
        return userBooks
      })
    } catch (error: any) {
      errorHandling("utilities - validateUserFetchBooks", error)
    }
  }
}


// DEPRECATED
/** Sets first book created as default */
export function ensureDefaultBook(currentDefaultBookId: number, setId: Dispatch<React.SetStateAction<User>>, defaultBookId: number) {
  if (!currentDefaultBookId) {
    setId(user => {
      const updatedUser = { ...user };
      updatedUser.defaultBookId = defaultBookId
      return updatedUser;
    })
  }
}


// export function toggleColorScheme() {
//   document.documentElement.classList.toggle('dark');
//   console.log("toggled")
// }

