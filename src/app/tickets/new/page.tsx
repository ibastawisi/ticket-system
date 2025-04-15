"use client";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function CreateTicket() {
  const ticketTitleRef = useRef(null);
  const ticketDescriptionRef = useRef(null);

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Create a new ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              alert("TODO: Add a new ticket");
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input ref={ticketTitleRef} id="title" placeholder="Add a title" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                ref={ticketDescriptionRef} 
                id="description" 
                placeholder="Add a comment" 
                rows={5}
              />
            </div>
            
            <Button type="submit">Create ticket</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
