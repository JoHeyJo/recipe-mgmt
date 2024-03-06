import axios from "axios";
import { UserSignUp } from "./utils/types";

const BASEURL = "http://localhost:3000/"
/** API class. 
 * 
 * Static class - Contains methods that facilitate communications between client
 * and backend API */
class API {
  static token = null;

  static async request(endpoint:string, data:object, method="GET"){

    const url = `${BASEURL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${API.token}`};
    const params = method ==="GET" ? data : {}
    try {
      const res = (await axios({ url, method, data, params, headers })).data;
      return res
    } catch (error) {
      throw Error
    }
  }

  /** Register user & return token */
  static async signUp(data: UserSignUp){
    const res = await this.request("signup", data, "POST");
    return res.token;
  }
}

export default API;