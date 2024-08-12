import axios from "axios";
import { Recipe, UserLogin, UserSignUp, Option } from "./utils/types";

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
      Authorization: `Bearer ${API.token}`
    };
    const params = method === "GET" ? data : {}
    try {
      console.log("url===", url, "method===", method, "data===", data, "params===", params, "headers===",headers)
      const res = (await axios({ url, method, data, params, headers })).data;
      return res
    } catch (error) {
      console.error(`Error in ${endpoint} API => ${error}`)
      throw error
    }
  }

  /** Register user: returns token */
  static async signUp(data: UserSignUp) {
    console.log("data",data)
    const res = await this.request("signup", data, "POST");
    return res;
  }

  /**Authenticate user: returns token */
  static async login(data: UserLogin) {
    const res = await this.request("login", data, "POST");
    return res;
  }

  /** Add recipe to database*/
  static async postRecipe(data: Recipe){
    const res = await this.request("add_recipe", data, "POST");
    return res;
  }

  /** Add ingredient option to database */
  static async postOption(data: Option, option: string){
    const res = await this.request(`add_option/${option}`, data, "POST")
    return res;
  }
}


export default API;