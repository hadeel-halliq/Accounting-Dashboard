// import api from "./api";

// export const login = (credentials) => api.post("/login", credentials);
// export const logout = () => api.post("/logout");

// api جاهز للتعامل مع 


// ----------------------------------------------------------------

// وهمي للتحقق من الروتس

export async function login(credentials) {
  const { email, password } = credentials;

  // حساب وهمي
  const MOCK_USER = {
    id: 1,
    name: "Super Admin",
    email: "admin@test.com",
    role: "super_admin",
    branch_id: null,
    token: "fake-jwt-token",
  };

  // تحقق وهمي
  if (email === "admin@test.com" && password === "123456") {
    // محاكاة تأخير السيرفر
    await new Promise((resolve) => setTimeout(resolve, 800));

    return MOCK_USER;
  }

  // في حال الخطأ
  throw new Error("Invalid credentials");
}
