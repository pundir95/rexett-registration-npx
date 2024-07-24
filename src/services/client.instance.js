import axios from "axios";
// import { toast } from "react-toastify";
import { getRefreshToken, getToken, updateLocalAccessToken } from "../constant/utils";


const clientInstance = axios.create({
  baseURL:  process.env.REACT_APP_BASE_URL,
});
export const clientFormInstance = axios.create({
  baseURL:  process.env.REACT_APP_BASE_URL,

});
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNTkiLCJpYXQiOjE3MjA1OTY2MjIsImV4cCI6MTcyMDYwMDIyMn0.WkEim6D4wZBhdVpEj6eoH1xLOkMuJBQoYwDZMULlFoo"

// Request Interceptor
clientInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `${getToken(token)}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

clientFormInstance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `${getToken(token)}`;
    config.headers["content-type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
clientInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        let refreshToken = getRefreshToken("refreshToken");
        const response = await clientInstance.post('auth/refresh-token', { refresh_token
          : refreshToken });
        let refreshTokn = updateLocalAccessToken("token",response.data.access_token)
        originalRequest.headers["Authorization"] = `${refreshTokn}`;
        return clientInstance(originalRequest);
      } catch (error) {
        // Handle refresh token error
        console.error("Error refreshing token:", error);
        return Promise.reject(error);
      }

    }
    return Promise.reject(error);
  }

);

export default clientInstance;

