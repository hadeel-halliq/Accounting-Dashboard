import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff, Sun, Moon } from "lucide-react";

import { useAuth } from "../../hooks/useAuth";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/* =====================================================
    ZOD SCHEMA (عربي)
===================================================== */

const schema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("صيغة البريد الإلكتروني غير صحيحة"),

  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

/* =====================================================
    PAGE
===================================================== */

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    document.title = "تسجيل الدخول - السلام للمحاسبة";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  /* =====================================================
      تبديل الوضع الليلي
  ===================================================== */

  const toggleDark = () => {
    const html = document.documentElement;

    if (dark) {
      html.classList.remove("dark");
    } else {
      html.classList.add("dark");
    }

    setDark(!dark);
  };

  /* =====================================================
     تسجيل الدخول
  ===================================================== */

  const onSubmit = async (values) => {
    try {
      await login(values);
      navigate("/");
    } catch (e) {
      alert(e.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center bg-background p-4"
    >
      {/* زر الوضع الليلي */}
      <button
        onClick={toggleDark}
        className="absolute top-4 left-4 p-2 rounded-xl border bg-card hover:bg-muted transition"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* البطاقة */}
      <Card className="w-full max-w-sm shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            تسجيل الدخول إلى النظام
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* البريد */}
            <div className="space-y-2">
              <Label>البريد الإلكتروني</Label>

              <Input placeholder="example@mail.com" {...register("email")} />

              {errors.email && (
                <p className="text-destructive text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* كلمة المرور */}
            <div className="space-y-2">
              <Label>كلمة المرور</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-destructive text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* زر الدخول */}
            <Button className="w-full rounded-xl" disabled={isSubmitting}>
              {isSubmitting ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
