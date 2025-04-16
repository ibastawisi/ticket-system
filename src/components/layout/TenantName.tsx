import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function TenantName(props: { tenantName: string }) {
  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <Link href="/" className="border-l-4 border-orange-500 pl-2.5 py-1 text-[1.1em]">
          Ticket System
          <strong className="ml-1">{props.tenantName}</strong>
        </Link>
      </CardContent>
    </Card>
  );
}
