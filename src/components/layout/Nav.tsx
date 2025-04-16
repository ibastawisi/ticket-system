"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogoutButton } from "../auth/Logout";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/");
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Card className="mx-4 mb-4">
      <CardContent className="px-4">
        <nav className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant={isActive("/tickets") ? "default" : "outline"}
              asChild
            >
              <Link href="/tickets">Ticket List</Link>
            </Button>
            <Button
              variant={isActive("/tickets/new") ? "default" : "outline"}
              asChild
            >
              <Link href="/tickets/new">Create new Ticket</Link>
            </Button>
            <Button
              variant={isActive("/tickets/users") ? "default" : "outline"}
              asChild
            >
              <Link href="/tickets/users">User List</Link>
            </Button>
          </div>
          <div>
            <LogoutButton variant="secondary" />
          </div>
        </nav>
      </CardContent>
    </Card>
  );
}
