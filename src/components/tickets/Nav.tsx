"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Nav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
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
            <Button variant="secondary" asChild>
              <Link href="/logout">Log out</Link>
            </Button>
          </div>
        </nav>
      </CardContent>
    </Card>
  );
}
