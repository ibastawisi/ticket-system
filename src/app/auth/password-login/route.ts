import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export async function POST(request: Request) {
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
    return NextResponse.redirect(
      new URL(`/login?error=${message}`, BASE_URL),
      { status: 302 }
    );
  }
  return NextResponse.redirect(new URL("/tickets", BASE_URL), {
    status: 302,
  });
}
