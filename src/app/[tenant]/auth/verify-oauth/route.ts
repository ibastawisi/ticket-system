import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { tenantUrl } from "@/utils/url";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tenant: string }> }
) {
  const { tenant } = await params;
  const { searchParams } = new URL(request.url);

  const supabase = await createClient();
  const { data: sessionData, error: sessionError } =
    await supabase.auth.exchangeCodeForSession(searchParams.get("code") || "");

  if (sessionError) {
    const message = "Login failed! Could not verify your session.";
    return NextResponse.redirect(tenantUrl(`/login?error=${message}`, tenant));
  }

  const supabaseAdmin = await createAdminClient();
  const { user } = sessionData;
  const { email } = user;
  const [, emailHost] = email!.split("@");
  const { error: tenantMatchError } = await supabaseAdmin
    .from("tenants")
    .select()
    .eq("id", tenant)
    .single();

  if (tenantMatchError) {
    await supabase.auth.signOut();
    const message = "Login failed! You are not authorized to access this tenant.";
    return NextResponse.redirect(
      tenantUrl(`/login?error=${message}`, tenant),
    );
  }

  const needsInitialSetup =
    !user.app_metadata.tenants || !user.app_metadata.tenants.includes(tenant);

  if (needsInitialSetup) {
    await supabaseAdmin.auth.admin.updateUserById(user.id, {
      app_metadata: {
        tenants: [tenant, ...(user.app_metadata.tenants ?? [])],
      },
    });

    const { data: serviceUser } = await supabaseAdmin
      .from("service_users")
      .insert({
        full_name: user.user_metadata.full_name,
        supabase_user: user.id,
      })
      .select()
      .single();

    await supabaseAdmin.from("tenant_permissions").insert({
      tenant,
      service_user: serviceUser?.id ?? 0,
    });
  }

  // return NextResponse.json({ session: sessionData.session });
  return NextResponse.redirect(tenantUrl("/", tenant));
}
