import axios from "axios";
import { Recipe, UserLogin, UserSignUp, Ingredient, Book, AttributeData } from "./utils/types";

const BASEURL = "http://127.0.0.1:5000"
/** API class. 
 * 
 * Static class - Contains methods that facilitate communications between client
 * and backend API */
class API {
  static token: string | null = null;

  static async request(endpoint: string, data: object = {}, method: string = "GET") {

    const url = `${BASEURL}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${this.token}`
    };
    const params = method === "GET" ? data : {}
    try {
      console.log("HEADERS", headers.Authorization)
      const res = (await axios({ url, method, data, params, headers })).data;
      return res
    } catch (error) {
      console.log(error)
      console.error(`Error in ${endpoint} API => ${error}`)
      throw error
    }
  }

  // ########### USERS ###########

  /** Register user: returns token */
  static async signUp(data: UserSignUp) {
    const res = await this.request("signup", data, "POST");
    return res;
  }

  /**Authenticate user: returns token */
  static async login(data: UserLogin) {
    const res = await this.request("login", data, "POST");
    return res;
  }

  /** Fetch specific user */
  static async getUser(userId: number) {
    const res = await this.request(`users/${userId}`);
    return res;
  }

  // ############ RECIPES ###########
  /** Add user recipe to corresponding book*/
  static async postUserRecipe(data: Recipe, bookId: number, userId: number) {
    const res = await this.request(`users/${userId}/books/${bookId}/recipes`, data, "POST");
    return res;
  }

  /** Fetch user recipes */
  static async getBookRecipes(userId: number, bookId: number) {
    const res = await this.request(`users/${userId}/books/${bookId}/recipes`)
    return res
  }

  /** Edit user recipe */
  static async editBookRecipe(userId: number, bookId: number, recipeId: number, data) {
    const res = await this.request(`users/${userId}/books/${bookId}/recipes/${recipeId}`, data, "PATCH")
    return res
  }

  /** Delete book recipe */
  static async deleteUserRecipe(userId: number, bookId: number, recipeId: number) {
    const res = await this.request(`users/${userId}/books/${bookId}/recipes/${recipeId}`, {}, "DELETE")
    return res
  }

  // ########### BOOKS ###########

  /** Post new book */
  static async postBook(data: Book, userId: number) {
    const res = await this.request(`users/${userId}/books`, data, "POST")
    return res
  }

  /** Fetch user books */
  static async getUserBooks(userId: number) {
    const res = await this.request(`users/${userId}/books`)
    return res
  }

  // ########### INGREDIENTS ###########

  /** Fetch all ingredients  */
  static async getUserComponentOptions(userId: number) {
    const res = await this.request(`/users/${userId}/ingredients/components`)
    return res;
  }

  /** Fetch book ingredients */
  static async getBookComponentOptions(userId: number, bookId: number) {
    const res = await this.request(`/users/${userId}/books/${bookId}/ingredients/components`)
    return res;
  }

  /** Add ingredient - NOT IN USE*/
  static async postIngredient(data: AttributeData, option: string) {
    const res = await this.request(`ingredients/${option}`, data, "POST")
    return res;
  }

  /** Add book ingredient */
  static async postBookIngredient(data: AttributeData, bookId: number, userId: number, entity: string) {
    const res = await this.request(`/users/${userId}/books/${bookId}/ingredients/${entity}`, data, "POST")
    return res;
  }
  // ########### INSTRUCTIONS ###########

  /** Fetch all instructions */
  static async getInstructions() {
    const res = await this.request("instructions")
    return res;
  }

  /** Fetch user instructions */
  static async getUserInstructions(userId: number) {
    const res = await this.request(`/users/${userId}/instructions`)
    return res;
  }

  /** Fetch book instructions */
  static async getBookInstructions(userId: number, bookId: number) {
    const res = await this.request(`/users/${userId}/books/${bookId}/instructions`)
    return res;
  }

  /** Post instruction to database */
  static async postInstruction(userId: number, bookId: number, data: Ingredient) {
    const res = await this.request(`users/${userId}/books/${bookId}/instructions`, data, "POST")
    return res
  }

  /** Post instruction associate */
  static async postInstructionAssociation(userId: number, bookId: number, instructionId: number) {
    const res = await this.request(`users/${userId}/books/${bookId}/instructions/${instructionId}`, {}, "POST")
    return res
  }
}


export default API;