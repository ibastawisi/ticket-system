import { TicketDetails } from "@/components/tickets/TicketDetails";

export default async function TicketDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <TicketDetails id={id} />
  );
}
