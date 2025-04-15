"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const comments = [
  {
    author: "Dave",
    date: "2027-01-01",
    content: "This is a comment from Dave",
  },
  {
    author: "Alice",
    date: "2027-01-02",
    content: "This is a comment from Alice",
  },
];

export function TicketComments() {
  const commentRef = useRef(null);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Comments ({comments.length})</h3>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          alert("TODO: Add comment");
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="comment">Add a comment</Label>
          <Textarea 
            ref={commentRef} 
            id="comment" 
            placeholder="Write your comment here..." 
            rows={3}
          />
        </div>
        <Button type="submit">Add comment</Button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.date} className="py-4">
            <CardContent className="px-5">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">{comment.author}</div>
                <time className="text-sm text-muted-foreground">{comment.date}</time>
              </div>
              <p>{comment.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
