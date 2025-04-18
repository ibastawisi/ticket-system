import { createClient } from "@/lib/supabase/server";
import { tenantUrl } from "@/utils/url";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ tenant: string }> }
) {
  const { tenant } = await params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const hashed_token = searchParams.get("hashed_token");
  if (!hashed_token) {
    return NextResponse.redirect(
      tenantUrl(`/login?type=password-reset&error=Invalid token`, tenant),
      { status: 302 }
    );
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    type: type === "password-reset" ? "recovery" : "magiclink",
    token_hash: hashed_token,
  });
  if (error) {
    return NextResponse.redirect(
      tenantUrl(`/login?type=password-reset&error=Invalid token`, tenant)
    );
  } else {
    if (type === "password-reset") {
      return NextResponse.redirect(tenantUrl(`/auth/update-password`, tenant), {
        status: 302,
      });
    }
    return NextResponse.redirect(tenantUrl("/tickets", tenant));
  }
}
