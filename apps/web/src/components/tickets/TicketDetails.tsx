import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketComments } from "./TicketComments";
import { Badge } from "../ui/badge";

export function TicketDetails({ id }: { id: string; }) {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">#{id}</span>
              <Badge className="bg-green-500 hover:bg-green-600">Open</Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              Created by <span className="font-semibold">AuthorName</span> at{" "}
              <time>December 10th 2025</time>
            </div>
            <CardTitle>Ticket title should be here</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose max-w-none dark:prose-invert">
            <p>Some details about the ticket should be here.</p>
          </div>

          <div className="pt-6 border-t">
            <TicketComments />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
