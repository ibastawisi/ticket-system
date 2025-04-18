"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";
import { tenantPath } from "@/utils/url";

export default function Nav({ tenant }: { tenant: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === tenantPath(path, tenant);
  };

  useEffect(() => {
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push(tenantPath("/login", tenant));
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const logout = async (event: React.MouseEvent) => {
    event.preventDefault();
    const supabase = createClient();
    await supabase.auth.signOut();
  };

  return (
    <Card className="mx-4 mb-4">
      <CardContent className="px-4">
        <nav className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button
              variant={isActive("/tickets") ? "default" : "outline"}
              asChild
            >
              <Link href={tenantPath("/tickets", tenant)}>Ticket List</Link>
            </Button>
            <Button
              variant={isActive("/tickets/new") ? "default" : "outline"}
              asChild
            >
              <Link href={tenantPath("/tickets/new", tenant)}>
                Create new Ticket
              </Link>
            </Button>
            <Button
              variant={isActive("/tickets/users") ? "default" : "outline"}
              asChild
            >
              <Link href={tenantPath("/tickets/users", tenant)}>User List</Link>
            </Button>
          </div>
          <div>
            <Button variant="secondary" onClick={logout} asChild>
              <Link href={tenantPath("/logout", tenant)} prefetch={false}>
                Log out
              </Link>
            </Button>
          </div>
        </nav>
      </CardContent>
    </Card>
  );
}
