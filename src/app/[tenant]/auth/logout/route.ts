import { createClient } from "@/lib/supabase/server";
import { tenantUrl } from "@/utils/url";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(tenantUrl("/login", tenant));
}
