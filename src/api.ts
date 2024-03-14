import axios from "axios";
import { UserLogin, UserSignUp } from "./utils/types";

const BASEURL = "http://127.0.0.1:5000"
/** API class. 
 * 
 * Static class - Contains methods that facilitate communications between client
 * and backend API */
class API {
  static token = null;

  static async request(endpoint: string, data: object = {}, method = "GET") {

    const url = `${BASEURL}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${API.token}`
    };
    const params = method === "GET" ? data : {}
    try {
      const res = (await axios({ url, method, data, params, headers })).data;
      return res
    } catch (error) {
      console.error(`Error in ${endpoint} API => ${error}`)
      throw error
    }
  }

  /** Register user: returns token */
  static async signUp(data: UserSignUp) {
    const res = await this.request("signup", data, "POST");
    return res.token;
  }

  /**Authenticate user: returns token */
  static async login(data: UserLogin) {
    const res = await this.request("login", data, "POST");
    return res;
  }
}


export default API;