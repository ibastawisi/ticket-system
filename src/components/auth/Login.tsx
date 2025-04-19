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
import { tenantPath } from "@/utils/url";

export const Login: React.FC<
  {
    tenant: string;
    tenantName: string;
    isPasswordLogin?: boolean;
    isPasswordReset?: boolean;
    errorMessage?: string | string[];
    successMessage?: string | string[];
  } & React.ComponentPropsWithoutRef<"div">
> = ({
  tenant,
  tenantName,
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
        if (session?.user.app_metadata.tenants?.includes(tenant)) {
          router.push(tenantPath("/tickets", tenant));
        } else {
          supabase.auth.signOut();
          setError("You are not authorized to access this tenant.");
        }
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            <span className="text-muted-foreground">{tenantName}</span>{" "}
            {isPasswordReset
              ? "Reset Password"
              : isPasswordLogin
              ? "Login"
              : "Magic Link"}
          </CardTitle>
          <CardDescription>
            Enter your {isPasswordLogin ? "credentials" : "email"} to{" "}
            {isPasswordReset
              ? "request a password reset"
              : isPasswordLogin
              ? "login"
              : "receive a magic link"}
            .
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={
              isPasswordLogin
                ? tenantPath("/auth/password-login", tenant)
                : isPasswordReset
                ? tenantPath("/auth/password-reset", tenant)
                : tenantPath("/auth/magic-link", tenant)
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
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Link
                    href={tenantPath("/login?type=password-reset", tenant)}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              )}
              <p className="text-sm min-h-5">
                <span className="text-green-500">{successMessage}</span>
                <span className="text-red-500">{error}</span>
                <span className="text-red-500">{errorMessage}</span>
              </p>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isPasswordLogin
                  ? "Login"
                  : isPasswordReset
                  ? "Reset Password"
                  : "Send Magic Link"}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              {isPasswordLogin ? (
                <Link
                  href={tenantPath("/login?type=magic-link", tenant)}
                  className="underline underline-offset-4"
                >
                  Login with Magic Link
                </Link>
              ) : (
                <Link
                  href={tenantPath("/login", tenant)}
                  className="underline underline-offset-4"
                >
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
