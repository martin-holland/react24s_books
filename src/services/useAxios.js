import axios from "axios";
import { useState } from "react";

/**
 * Custom hook for handling HTTP requests
 * Provides state management for loading, alerts, and data
 * @param {string} baseUrl - The base URL for API requests
 * @returns {Object} Object containing request methods and state
 */
const useAxios = (baseUrl) => {
  const [data, setData] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);

  /**
   * Displays an alert message for a specified duration
   * @param {string} message - The message to display
   * @param {string} type - The type of alert ('success' or 'error')
   */
  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000);
  };

  /**
   * Makes an HTTP request using axios
   * @param {string} method - The HTTP method to use
   * @param {string} endpoint - The API endpoint
   * @param {Object} payload - Optional data payload
   * @returns {Promise} The API response
   */
  const makeRequest = async (method, endpoint, payload = null) => {
    try {
      setLoading(true);
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload);
      setData(response.data);
      showAlert("Book added successfully", "success");
    } catch (err) {
      showAlert(`Error: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };
  const get = async (endpoint) => makeRequest("get", endpoint);
  const post = async (endpoint, payload) =>
    makeRequest("post", endpoint, payload);
  const update = async (endpoint, payload) =>
    makeRequest("put", endpoint, payload);
  const remove = async (endpoint) => makeRequest("delete", endpoint);

  return { data, alert, loading, get, post, update, remove };
};

export default useAxios;
