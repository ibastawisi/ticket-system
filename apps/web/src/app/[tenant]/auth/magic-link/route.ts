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
    type: "magiclink",
  });
  if (error) {
    const message = "Make sure the email address is valid";
    return NextResponse.redirect(
      tenantUrl(`/login?type=magic-link&error=${message}`, tenant),
      { status: 302 }
    );
  }
  const { hashed_token, verification_type } = data.properties;

  if (verification_type === "signup") {
    await supabase.auth.admin.deleteUser(data.user.id);
    const message = "This email is not associated with an account";
    return NextResponse.redirect(
      tenantUrl(`/login?type=magic-link&error=${message}`, tenant),
      { status: 302 }
    );
  }

  const user = data.user;
  if (!user.app_metadata.tenants.includes(tenant)) {
    const message = "This email is not registered with this tenant";
    return NextResponse.redirect(
      tenantUrl(`/login?type=magic-link&error=${message}`, tenant),
      { status: 302 }
    );
  }
  const constructedLink = tenantUrl(
    `/auth/verify?hashed_token=${hashed_token}`,
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
    subject: "Magic Link",
    html: `
    <h1>Hi there, this is a your magic link email!</h1>
    <p>Click <a href="${constructedLink.toString()}">here</a> to log in.</p>
    `,
  });
  const message = "Check your email for the magic link";
  return NextResponse.redirect(
    tenantUrl(`/login?type=magic-link&success=${message}`, tenant),
    {
      status: 302,
    }
  );
}
