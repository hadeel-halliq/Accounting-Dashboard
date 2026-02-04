import { z } from "zod";

export const RegisterSchema = z.object({
  fullname: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين").max(100),
  email: z.string().email("بريد إلكتروني غير صحيح").max(100),
  password: z.string().min(6, "كلمة المرور على الأقل 6 أحرف").max(255),
});
