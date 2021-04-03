import axios from "axios";

const sessionInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export function login({ identifier, password }) {
  return sessionInstance.get("login", {
    params: {
      cpfOrCnpj: identifier,
      password,
    },
  });
}
