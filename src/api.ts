import axios from "axios";
import { Recipe, UserLogin, UserSignUp, Option, Ingredient, Book } from "./utils/types";

const BASEURL = "http://127.0.0.1:5000"
// const BASEURL = "localhost://127.0.0.1.5000"
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

  /** Add user recipe to corresponding book*/
  static async postUserRecipe(data: Recipe, bookId: number, userId: number) {
    const res = await this.request(`users/${userId}/books/${bookId}/recipes`, data, "POST");
    return res;
  }

  /** Add ingredient option to database */
  static async postOption(data: Option, option: string) {
    const res = await this.request(`options/${option}`, data, "POST")
    return res;
  }

  /** Fetch options for ingredient components */
  static async getOptions(component: string) {
    const res = await this.request(`options/${component}`)
    return res;
  }

  /** Get all instructions */
  static async getInstructions() {
    const res = await this.request("instructions")
    return res;
  }

  /** Get user instructions */
  static async getUserInstructions(userId: number) {
    const res = await this.request(`/users/${userId}/instructions`)
    return res;
  }

  /** Get book instructions */
  static async getBookInstructions(userId: number, bookId: number) {
    const res = await this.request(`/users/${userId}/books/${bookId}/instructions`)
    return res;
  }

  /** Post ingredient to database */
  static async postInstruction(userId: number, bookId: number, data: Ingredient) {
    const res = await this.request(`users/${userId}/books/${bookId}/instructions`, data, "POST")
    return res
  }

  /** Post instruction associate */
  static async postInstructionAssociation(userId: number, bookId: number, instructionId: number){
    const res = await this.request(`users/${userId}/books/${bookId}/instructions/${instructionId}`)
    return res
  }

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

}


export default API;