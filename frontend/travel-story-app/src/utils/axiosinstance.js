import axios from "axios";
import { BASE_URL } from "./constants";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;





/*  // Import the axios library to make HTTP requests
import axios from "axios";

// Import the BASE_URL from constants.js to manage API endpoints centrally
import { BASE_URL } from "./constants";

/**
 * Create an axios instance with predefined configurations.
 * This instance will be used throughout the application for making API calls.
//  */
// const axiosInstance = axios.create({
//     baseURL: BASE_URL,  // Sets the base URL for all API requests
//     timeout: 10000,  // Specifies a timeout limit (10 seconds) for API requests
//     headers: {
//         "Content-Type": "application/json", // Ensures requests send data in JSON format
//     },
// });

/**
 * Axios Request Interceptor
 * - Automatically adds an authentication token (if available) to each request.
 * - Ensures all requests to protected endpoints include the Authorization header.
 */
// axiosInstance.interceptors.request.use(
//     (config) => {
//         // Retrieve the authentication token from localStorage
//         const accessToken = localStorage.getItem("token");

//         // If a token exists, attach it to the Authorization header
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }

//         // Return the modified request configuration
//         return config;
//     },
//     (error) => {
//         // Handle any errors that occur while modifying the request
//         return Promise.reject(error);
//     }
// );

/**
 * Export the axios instance
 * - This ensures all API calls in the app use the same pre-configured settings.
 * - Makes API calls easier to manage and maintain.
 */
// export default axiosInstance;
