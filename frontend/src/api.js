import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /* Get current user. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /* Get companies by name */
  static async getCompanies(search) {
    let res = await this.request("companies", { search });
    return res.companies;
  }

  /** Get job list */
  static async getJobs(search) {
    let res = await this.request("jobs", { search });
    return res.jobs;
  }

  /** Create User */
  static async createUser(user) {
    let res = await this.request('users', user, "post");
    return res.token;
  }
  
  /** Apply to job */
  static async loginUser(user) {
    let res = await this.request('login', user, "post");
    return res.token;
  }

  /** Get User */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.token;
  }

  /** Patch User */
  static async patchUser(user) {
    const { username, ...userInput } = user
    let res = await this.request(`users/${user.username}`, userInput, "patch");
    return res.user;
  }
  
  /** Apply */
  static async apply(id, username) {
    await this.request(`jobs/${id}/apply`, { username }, "post");
  }

  /** Withdraw */
  static async withdraw(id, username) {
    await this.request(`jobs/${id}/withdraw`, { username }, "post");
  }
}


export default JoblyApi;

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
