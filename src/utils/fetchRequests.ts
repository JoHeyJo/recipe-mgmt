import { Dispatch } from "react";
import { jwtDecode } from "jwt-decode";
import { JWTPayload, User, Book } from "./types";
import API from "../api";
import { errorHandling } from "./ErrorHandling";

/** Fetches specific user and updates state used by context */
export async function extractAndSetUser(
  token: string,
  setUser: (user: User) => void,
) {
  API.token = token;
  const { sub }: JWTPayload = jwtDecode(token);
  if (sub) {
    try {
      const localStorageBookValue = JSON.parse(
        localStorage.getItem("current-book-id"),
      );
      const res = await API.getUser(sub);
      console.log("user object",res)
      setUser({
        userName: res.user_name,
        id: res.id,
        defaultBookId: res.default_book_id,
        defaultBook: res.default_book,
        currentBookId: localStorageBookValue || res.default_book_id,
        books: await validateUserFetchBooks(sub, setUser),
      });
      if (!localStorageBookValue) {
        localStorage.setItem(
          "current-book-id",
          JSON.stringify(res.default_book_id),
        );
      }
      return sub;
    } catch (error: any) {
      errorHandling("fetchRequests -> extractAndSetUser", error);
      throw error;
    }
  }
}

/** On successful auth populate user's books */
export async function validateUserFetchBooks(
  userId: number,
  setBooks: Dispatch<React.SetStateAction<User>>,
): Promise<Book[]> {
  if (userId) {
    try {
      const res = await API.getUserBooks(userId);
      setBooks((books) => ({ ...books, books: res }));
      return res;
    } catch (error: any) {
      errorHandling("fetchRequests - validateUserFetchBooks", error);
      throw error;
    }
  }
}

/** Get book request */
async function fetchBookRecipes(userId: number, bookId: number) {
  try {
    const recipes = await API.getBookRecipes(userId, bookId);
    return recipes;
  } catch (error) {
    errorHandling("fetchRequests -> fetchBookRecipes", error);
    throw error;
  }
}

// DEPRECATED
/** Sets first book created as default */
export function ensureDefaultBook(
  currentDefaultBookId: number,
  setId: Dispatch<React.SetStateAction<User>>,
  defaultBookId: number,
) {
  if (!currentDefaultBookId) {
    setId((user) => {
      const updatedUser = { ...user };
      // updatedUser.defaultBook = defaultBook
      return updatedUser;
    });
  }
}
