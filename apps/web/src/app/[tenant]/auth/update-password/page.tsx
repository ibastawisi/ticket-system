import { UpdatePassword } from "@/components/auth/UpdatePassword";
import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ tenant: string }>;
}) {
  const { tenant } = await params;
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("tenants")
    .select("*")
    .eq("id", tenant)
    .single();

  if (error) {
    notFound();
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdatePassword tenant={tenant} tenantName={data.name} />
      </div>
    </div>
  );
}
