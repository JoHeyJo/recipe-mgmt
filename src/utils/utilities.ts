import { Dispatch } from "react";
import { jwtDecode } from "jwt-decode";
import { JWTPayload, User } from "../utils/types";
import API from "../api";
import { errorHandling } from "./ErrorHandling";

export function extractAndSetUser(token: string, setUser: (user: User) => void) {
  const { user, user_id, is_admin, book_id }: JWTPayload = jwtDecode(token);
  setUser({ userName: user, userId: user_id, defaultBookId: book_id, isAdmin: is_admin, currentBook: undefined, books: [] })
  return user_id
}

export async function validateUserFetchBooks(userId: number, setBooks: Dispatch<React.SetStateAction<User>>) {
  if (userId) {
    try {
      const bookIds = await API.getUserBooks(userId);
      setBooks((books) => {
        const userBooks = { ...books };
        userBooks.books = bookIds;
        return userBooks
      })
    } catch (error: any) {
      errorHandling("utilities - validateUserFetchBooks", error)
    }
  }
}

export function ensureDefaultBook(defaultBookId: number, setId: Dispatch<React.SetStateAction<User>>, defaultId: number) {
  if (!defaultBookId) {
    setId(user => {
      const updatedUser = { ...user };
      updatedUser.defaultBookId = defaultId
      return updatedUser;
    })
  }
}


// export function toggleColorScheme() {
//   document.documentElement.classList.toggle('dark');
//   console.log("toggled")
// }

