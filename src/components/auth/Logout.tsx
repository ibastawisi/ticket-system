"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LogoutButton(props: React.ComponentProps<typeof Button>) {
  const router = useRouter();
  const logout = async (event: React.MouseEvent) => {
    event.preventDefault();
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <Button {...props} onClick={logout} asChild>
      <Link href="/logout" prefetch={false}>
        Log out
      </Link>
    </Button>
  );
}
