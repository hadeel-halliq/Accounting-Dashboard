import api from "./api";

// تسجيل الدخول
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data.data;
};

// تسجيل الخروج
export const logout = async () => {
  await api.post("/auth/logout");
};

// الحصول على بيانات المستخدم الحالي
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data.data;
};


// ----------------------------------------------------------------

// // وهمي للتحقق من الروتس

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
