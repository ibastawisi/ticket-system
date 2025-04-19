"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { tenantPath } from "@/utils/url";

export const Login: React.FC<
  {
    tenant: string;
    tenantName: string;
    errorMessage?: string | string[];
    successMessage?: string | string[];
  } & React.ComponentPropsWithoutRef<"div">
> = ({
  tenant,
  tenantName,
  errorMessage,
  successMessage,
  className,
  ...props
}) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: window.location.origin + "/auth/verify-oauth",
      },
    });
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
            Login
          </CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button variant="outline" onClick={handleGoogleSignIn}>
            Sign in with Google
          </Button>
          <p className="text-sm min-h-5">
            <span className="text-green-500">{successMessage}</span>
            <span className="text-red-500">{error}</span>
            <span className="text-red-500">{errorMessage}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
