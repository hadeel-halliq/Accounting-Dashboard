import z from "zod";

export const LoginSchema = z.object({
    email: z.string().min(1, "الايميل مطلوب").email("الإيميل غير متاح"),
    password :z.string().min(6, "كلمة المرور مطلوبة")
})