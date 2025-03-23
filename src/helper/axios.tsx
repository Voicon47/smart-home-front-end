import axios from "axios";
import helper from ".";
import { API_ROOT } from "../utils/constants";
const instance = axios.create({
    baseURL : API_ROOT,
    timeout : 1000,
    headers: {
        "Content-type": "application/json",
      },
})
// Add a request interceptor to include the token
instance.interceptors.request.use(
    (config) => {
      const token = helper.getToken(); // Retrieve token from storage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
instance.interceptors.response.use(
    (response) => {
        return response
    },
    // (error) => {
    //     console.log(error);
    // }
);

export default instance