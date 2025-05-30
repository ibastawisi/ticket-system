import { createAdminClient } from "@/lib/supabase/admin";
import { tenantUrl } from "@/utils/url";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tenant: string }> }
) {
  const { tenant } = await params;
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const supabase = await createAdminClient();
  const { data, error } = await supabase.auth.admin.generateLink({
    email,
    type: "recovery",
  });
  if (error) {
    const message = "Make sure the email address is valid";
    const url = tenantUrl(
      `/login?type=password-reset&error=${message}`,
      tenant
    );
    return NextResponse.redirect(url, { status: 302 });
  }
  const { hashed_token } = data.properties;

  const constructedLink = tenantUrl(
    `/auth/verify?hashed_token=${hashed_token}&type=password-reset`,
    tenant
  );
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "localhost",
    port: Number(process.env.SMTP_PORT) || 54325,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  await transporter.sendMail({
    from: "tms@ibastawisi.tech",
    to: email,
    subject: "Password Reset",
    html: `
    <h1>Hi there, this is a your reset password email!</h1>
    <p>We received a request to reset your password. If you didn't make this request, just ignore this email.</p>
    <p>Click <a href="${constructedLink.toString()}">here</a> to reset your password.</p>
    `,
  });
  const message = "Check your email for the reset password link";
  return NextResponse.redirect(
    tenantUrl(`/login?type=password-reset&success=${message}`, tenant),
    {
      status: 302,
    }
  );
}
