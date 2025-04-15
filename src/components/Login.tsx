"use client";

import { useState } from "react";
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

export const Login: React.FC<
  { isPasswordLogin: boolean } & React.ComponentPropsWithoutRef<"div">
> = ({ isPasswordLogin, className, ...props }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Authentication logic would go here
      alert(
        `Login attempt with ${isPasswordLogin ? "password" : "magic link"}`
      );
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 container mx-auto mt-12 px-4 sm:px-6 lg:px-8 py-6 max-w-md",
        className
      )}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your {isPasswordLogin ? "credentials" : "email"} to login to
            your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
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
                      href="/auth/forgot-password"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? "Signing in..."
                  : `Sign in with${
                      isPasswordLogin ? " Password" : " Magic Link"
                    }`}
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              {isPasswordLogin ? (
                <Link
                  href={{
                    pathname: "/",
                    query: { magicLink: "yes" },
                  }}
                  className="underline underline-offset-4"
                >
                  Go to Magic Link Login
                </Link>
              ) : (
                <Link
                  href={{
                    pathname: "/",
                    query: { magicLink: "no" },
                  }}
                  className="underline underline-offset-4"
                >
                  Go to Password Login
                </Link>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
