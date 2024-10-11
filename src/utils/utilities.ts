import { Dispatch } from "react";
import { jwtDecode } from "jwt-decode";
import { JWTPayload, User } from "../utils/types";
import API from "../api";
import { errorHandling } from "./ErrorHandling";

export function extractAndSetUser(token: string, setUser: (user: User) => void) {
  const { user, user_id, is_admin, book_id }: JWTPayload = jwtDecode(token);
  setUser({
    userName: user,
    userId: user_id,
    defaultBookId: book_id,
    isAdmin: is_admin,
    currentBookId: book_id,
    booksIds: []
  })
  return user_id
}


export function extractAndSetUserOnLogin(token: string, setUser: (user: User) => void) {
  const { user, user_id, is_admin, book_id }: JWTPayload = jwtDecode(token);
  setUser({
    userName: user,
    userId: user_id,
    defaultBookId: book_id,
    isAdmin: is_admin,
    currentBookId: book_id,
    booksIds: []
  })
  return user_id
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

