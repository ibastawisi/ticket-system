"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export const Login: React.FC<
  {
    isPasswordLogin?: boolean;
    isPasswordReset?: boolean;
    errorMessage?: string | string[];
    successMessage?: string | string[];
  } & React.ComponentPropsWithoutRef<"div">
> = ({
  isPasswordLogin,
  isPasswordReset,
  errorMessage,
  successMessage,
  className,
  ...props
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    if (!isPasswordLogin) return;
    event.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/tickets");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        router.push("/tickets");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your {isPasswordLogin ? "credentials" : "email"} to {isPasswordReset ? "request a password reset" : isPasswordLogin ? "login" : "receive a magic link" }.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={
              isPasswordLogin
                ? "/auth/password-login"
                : isPasswordReset
                ? "/auth/password-reset"
                : "/auth/magic-link"
            }
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {isPasswordLogin && (
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/login?type=password-reset"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}
              <p className="text-sm min-h-5">
                <span className="text-green-500">{successMessage}</span>
                <span className="text-red-500">{error}</span>
                <span className="text-red-500">{errorMessage}</span>
              </p>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {
                  isPasswordLogin
                    ? "Login"
                    : isPasswordReset
                    ? "Reset Password"
                    : "Send Magic Link"
                }
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              {isPasswordLogin ? (
                <Link
                  href="/login?type=magic-link"
                  className="underline underline-offset-4"
                >
                  Login with Magic Link
                </Link>
              ) : (
                <Link href="/login" className="underline underline-offset-4">
                  Login with Password
                </Link>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
