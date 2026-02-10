import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

const AuthService = {

  login: (data) =>
    apiClient.post("/auth/login", data).then(unwrap),

  logout: () =>
    apiClient.post("/auth/logout").then(unwrap),

  me: () =>
    apiClient.get("/auth/me").then(unwrap),

  registerAdmin: (data) =>
    apiClient
      .post("/auth/register", {
        ...data,
        role: "ADMIN",
      })
      .then(unwrap),
};

export default AuthService;

