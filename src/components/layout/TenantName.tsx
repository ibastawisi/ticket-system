import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function TenantName(props: { tenant: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tenants")
    .select("name")
    .eq("id", props.tenant)
    .single();

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Link
          href="/"
          className="border-l-4 border-orange-500 pl-2.5 py-1 text-[1.1em]"
        >
          Ticket System
          <strong className="ml-1">{data?.name ?? "Unknown Tenant"}</strong>
        </Link>
      </CardContent>
    </Card>
  );
}
