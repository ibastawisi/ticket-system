import { Ticket } from "@/types/ticket";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { tenantPath } from "@/utils/url";

export function TicketList({
  tickets,
  tenant,
}: {
  tickets: Ticket[];
  tenant: string;
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>
                <Link
                  href={tenantPath(`/tickets/details/${ticket.id}`, tenant)}
                >
                  {ticket.title}
                </Link>
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "capitalize",
                    ticket.status === "Not started" &&
                      "bg-red-500 hover:bg-red-600",
                    ticket.status === "In progress" &&
                      "bg-yellow-500 hover:bg-yellow-600",
                    ticket.status === "Done" &&
                      "bg-green-500 hover:bg-green-600"
                  )}
                >
                  {ticket.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
