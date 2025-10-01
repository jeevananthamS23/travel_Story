export const BASE_URL='https://travel-story-7lg2.onrender.com'   // database connection url

/**
 * BASE_URL Explanation
 * export const BASE_URL = 'http://localhost:8000'; // Backend API URL for local development
 * The BASE_URL is a constant that stores the base API endpoint of the backend server. 
 * It is used to make HTTP requests from the frontend to the backend in a structured and maintainable way.
 * 
 * Purpose:
 * 1. **Centralized API Management:** Avoids hardcoding the backend URL in multiple places, making updates easier.
 * 2. **Flexibility Across Environments:** Can be changed dynamically for different environments (development, staging, production).
 * 3. **Ensures Consistency:** Prevents errors caused by using different URLs across the application.
 * 4. **Works with Axios & Fetch:** Used as the base URL for API requests to send and receive data from the backend.
 * 
 * Example Usage:
 * import axios from "axios";
 * import { BASE_URL } from "./constants";
 * 
 * const axiosInstance = axios.create({
 *    baseURL: BASE_URL,
 *    timeout: 10000,
 *    headers: { "Content-Type": "application/json" },
 * });
 * 
 * export default axiosInstance;
 * 
 * 

 */


