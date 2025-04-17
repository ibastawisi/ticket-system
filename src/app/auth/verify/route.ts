import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const hashed_token = searchParams.get("hashed_token");
  if (!hashed_token) {
    return NextResponse.redirect(
      new URL(`/login?type=password-reset&error=Invalid token`, BASE_URL),
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
      new URL(`/login?type=password-reset&error=Invalid token`, BASE_URL),
    );
  } else {
  if (type === "password-reset") {
    return NextResponse.redirect(
      new URL(`/auth/update-password`, BASE_URL),
      { status: 302 }
    );
  }
    return NextResponse.redirect(new URL("/tickets", BASE_URL),);
  }}
