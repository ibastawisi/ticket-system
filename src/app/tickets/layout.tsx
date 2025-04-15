import Nav from "@/components/tickets/Nav";
import TenantName from "@/components/tickets/TenantName";

export default function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="border-b">
        <TenantName tenantName="Packt" />
        <Nav />
      </section>
      <section className="w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          {children}
        </div>
      </section>
    </>
  );
}
