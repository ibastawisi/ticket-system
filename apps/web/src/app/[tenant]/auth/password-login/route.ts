import { createClient } from "@/lib/supabase/server";
import { tenantUrl } from "@/utils/url";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tenant: string }> }
) {
  const { tenant } = await params;
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  const userData = data?.user;
  if (error || !userData) {
    const message = "Login failed. Please check your credentials.";
    return NextResponse.redirect(tenantUrl(`/login?error=${message}`, tenant), {
      status: 302,
    });
  }
  if (!userData.app_metadata?.tenants.includes(tenant)) {
    await supabase.auth.signOut();
    const message = "You don't have access to this tenant.";
    return NextResponse.redirect(tenantUrl(`/login?error=${message}`, tenant), {
      status: 302,
    });
  }
  return NextResponse.redirect(tenantUrl("/tickets", tenant), {
    status: 302,
  });
}
