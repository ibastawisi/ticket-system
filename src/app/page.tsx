import { Login } from "@/components/Login";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const wantsMagicLink = (await searchParams).magicLink === "yes";
  return <Login isPasswordLogin={!wantsMagicLink} />;
}
