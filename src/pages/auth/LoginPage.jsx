import { useState } from "react";
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
   ✅ ZOD SCHEMA
===================================================== */

const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});



/* =====================================================
   ✅ PAGE
===================================================== */

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });



  /* =====================================================
     🔥 DARK MODE TOGGLE
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
     🔥 SUBMIT
  ===================================================== */

  const onSubmit = async (values) => {
    try {
      await login(values);
      navigate("/");
    } catch (e) {
      alert(e.message);
    }
  };



  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">

      {/* dark mode button */}
      <button
        onClick={toggleDark}
        className="absolute top-4 right-4 p-2 rounded-xl border bg-card hover:bg-muted transition"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>



      {/* card */}
      <Card className="w-full max-w-sm shadow-xl rounded-2xl">

        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Mini ERP Login
          </CardTitle>
        </CardHeader>



        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* EMAIL */}
            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                placeholder="example@mail.com"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-destructive text-xs">
                  {errors.email.message}
                </p>
              )}
            </div>



            {/* PASSWORD */}
            <div className="space-y-2">
              <Label>Password</Label>

              <div className="relative">

                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-destructive text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>



            {/* BUTTON */}
            <Button
              className="w-full rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
