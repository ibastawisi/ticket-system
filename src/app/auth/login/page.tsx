import { Login } from "@/components/auth/Login";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const magicLink = (await searchParams).type === "magic-link";
  const passwordReset = (await searchParams).type === "password-reset";
  const errorMessage = (await searchParams).error;
  const successMessage = (await searchParams).success;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Login isPasswordLogin={!magicLink && !passwordReset} isPasswordReset={passwordReset} errorMessage={errorMessage} successMessage={successMessage} />
      </div>
    </div>
  );
}
