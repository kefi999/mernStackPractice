import axios from "axios";

const API_URL = "/api/users/"; // goes together with proxy from the json

//
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Logout stuff

const logout = () => {
  localStorage.removeItem("user");
};

//Login

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
const authService = {
  register,
  logout,
  login,
};

export default authService;
