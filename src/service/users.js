import { get, post } from "../utils/requets";

export const login = async (username, password) => {
  const result = await get(`users?username=${username}&password=${password}`);
  return result;
};

export const registerUser = async (data) => {
  const result = await post("users", data);
  return result;
};
