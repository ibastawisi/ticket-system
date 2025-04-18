import Nav from "@/components/layout/Nav";
import TenantName from "@/components/layout/TenantName";

export default async function TicketsLayout({
  params,
  children,
}: {
  params: Promise<{ tenant: string }>;
  children: React.ReactNode;
}) {
  const { tenant } = await params;
  return (
    <>
      <section className="border-b">
        <TenantName tenant={tenant} />
        <Nav tenant={tenant} />
      </section>
      <section className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          {children}
        </div>
      </section>
    </>
  );
}
