import { Login } from "@/components/auth/Login";
import { createAdminClient } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenant: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { tenant } = await params;
  const magicLink = (await searchParams).type === "magic-link";
  const passwordReset = (await searchParams).type === "password-reset";
  const errorMessage = (await searchParams).error;
  const successMessage = (await searchParams).success;

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
        <Login
          tenant={tenant}
          tenantName={data?.name ?? tenant}
          isPasswordLogin={!magicLink && !passwordReset}
          isPasswordReset={passwordReset}
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      </div>
    </div>
  );
}
