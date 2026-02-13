// import apiClient from "./http/apiClient";
// import { unwrap } from "./http/apiResponse";

// const AuthService = {

//   login: (data) =>
//     apiClient.post("/auth/login", data).then(unwrap),

//   logout: () =>
//     apiClient.post("/auth/logout").then(unwrap),

//   me: () =>
//     apiClient.get("/auth/me").then(unwrap),

//   /*
//   ==================================================
//   ✅ تسجيل مستخدم / أدمن
//   ==================================================
//   SUPER ADMIN:
//       يستطيع إرسال role + branchid
//   ADMIN:
//       ينشئ USER فقط
//   ==================================================
//   */

//   registerUser: (data) => {

//     const payload = {
//       fullname: data.fullname,
//       email: data.email,
//       password: data.password,
//     };

//     if (data.role) {
//       payload.role = data.role;
//     }

//     if (data.branchid) {
//       payload.branchid = Number(data.branchid);
//     }

//     return apiClient.post("/auth/register", payload).then(unwrap);
//   },
// };

// export default AuthService;


import apiClient from "./http/apiClient";
import { unwrap } from "./http/apiResponse";

const AuthService = {
  login: (data) => apiClient.post("/auth/login", data).then(unwrap),

  logout: () => apiClient.post("/auth/logout").then(unwrap),

  me: () => apiClient.get("/auth/me").then(unwrap),

  registerAdmin: (data) =>
    apiClient
      .post("/auth/register", {
        ...data,
        role: "ADMIN",
      })
      .then(unwrap),

  registerUser: (data) =>
    apiClient
      .post("/auth/register", {
        ...data,
      })
      .then(unwrap),
};

export default AuthService;