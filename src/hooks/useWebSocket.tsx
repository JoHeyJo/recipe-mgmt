import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { RecipeContext } from "../context/RecipeContext";
import API from "../api";
import { BASEURL, protocol } from "../api";
import useLocalStorage from "./useLocalStorage";

/** Custom Hook to create open connection between client and server
 *
 * Notes: Should auto connect be turned off?
 *
 * [MainContainer, RecipesList] - > useWebSocket
 */
function useWebSocket() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [bookId, setBookId] = useLocalStorage("current-book-id");

  const { userId, currentBookId, user, currentBook, setUserData } =
    useContext(UserContext);
  const { recipeId, recipeName, updateRecipes } = useContext(RecipeContext);

  /** Initiates handshake, maintains connection, & disconnects on unmount */
  useEffect(() => {
    const newSocket = io(`${protocol}://${BASEURL}`, {
      auth: { userId: userId, token: API.token },
    });

    setSocket(newSocket);
    newSocket.on("connect", () => {});

    newSocket.on("book_shared", (data) => {
      setMessage(data.message);
    });

    newSocket.on("recipe_shared", (data) => {
      setMessage(data.message);
    });

    newSocket.on("user_shared_book", (data) => {
      setMessage(data.message);
      setUserData((prevState) => ({ ...prevState, books: data.books }));
      setStatus(200);
    });

    newSocket.on("user_shared_recipe", (data) => {
      console.log("shared data:",data)
      if(data?.payload) {
        setUserData((prevState) => {
          console.log("pre state:",prevState)
          const newState = {...prevState, 
            books: [data.payload],
            defaultBook: data.payload,
            currentBookId: data.payload.id,
            currentBook: data.payload
          };
          setBookId(data.payload.id)
          console.log("new state:",newState)
          return newState
        }) 
      }
      // console.log
      // setUserData((prevState) => ({ ...prevState, books: data.books }));
      // setUserData((prevState) => ({ ...prevState, data, books: data.books }));
      setMessage(data.message);
      updateRecipes(data.recipe)
      setStatus(200);
    });

    newSocket.on("error_sharing_book", (data) => {
      setMessage(data.data);
    });

    newSocket.on("error_sharing_recipe", (data) => {
      setMessage(data.data);
    });

    return () => {
      newSocket.disconnect();
      // console.log("Disconnected from server");
    };
  }, []);

  /** Sends message to share book with recipient */
  function sendBook(recipient: string) {
    if (socket && recipient) {
      socket.emit("share_book", {
        userId,
        recipient,
        currentBookId,
        user,
        currentBook: currentBook.title,
      });
    }
  }

  function sendRecipe(recipient: string) {
    if (socket && recipient) {
      socket.emit("share_recipe", {
        recipient,
        recipeId,
        user,
        recipeName,
      });
    }
  }

  /** Resets message */
  function resetMessage() {
    setMessage("");
    setStatus(null);
  }
  return { sendRecipe, sendBook, message, resetMessage, status };
}

export default useWebSocket;
