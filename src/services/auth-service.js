import api from "./api";

export const login = (data) => api.post("/auth/login", data);

export const register = (data) => api.post("/auth/register", data);

export const logout = () => api.post("/auth/logout", {});

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.data;
};

// ----------------------------------------------------------------

// وهمي للتحقق من الروتس

// export async function login(credentials) {
//   const { email, password } = credentials;

//   // حساب وهمي
//   const MOCK_USER = {
//     id: 1,
//     name: "Super Admin",
//     email: "admin@test.com",
//     role: "super_admin",
//     branch_id: null,
//     token: "fake-jwt-token",
//   };

//   // تحقق وهمي
//   if (email === "admin@test.com" && password === "123456") {
//     // محاكاة تأخير السيرفر
//     await new Promise((resolve) => setTimeout(resolve, 800));

//     return MOCK_USER;
//   }

//   // في حال الخطأ
//   throw new Error("Invalid credentials");
// }
