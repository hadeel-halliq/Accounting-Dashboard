import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "./login-schema";

import { Sun, Moon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "../../components/ui/Button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [darkMode, setDarkMode] = useState(true);
const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = form;

  async function onSubmit(values) {
    try {
      await login(values);
      navigate("/", { replace: true });
    } catch (err) {
      setError("root", {
        message: "بريد إلكتروني أو كلمة مرور غير صحيحة",
      });
    }
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div>
      <Button
        className="h-12 w-12 rounded-full ml-3.5 mt-3.5 cursor-pointer"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <Sun /> : <Moon />}
      </Button>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">تسجيل الدخول</CardTitle>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                dir="rtl"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الإيميل : </FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كلمة المرور :</FormLabel>

                      
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"} 
                            dir="rtl"
                            className="pr-10 text-right" 
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          >
                            {showPassword ? (
                              <Eye size={18} />
                            ) : (
                              <EyeOff size={18} />
                            )}
                          </button>
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Error من السيرفر */}
                {form.formState.errors.root && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                )}

                <Button className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "تسجيل الدخول . . ." : "تسجيل الدخول"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
