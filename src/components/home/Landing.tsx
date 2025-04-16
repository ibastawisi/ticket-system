import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

export function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <Card className="max-w-3xl w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            Ticket Management System
          </CardTitle>
          <CardDescription className="text-xl mt-2">
            Streamline your support workflow with our intuitive ticket system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p>
              Our ticket management system helps teams track, prioritize, and
              solve customer support tickets efficiently. Manage your team's
              workload, track progress, and improve customer satisfaction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Track Issues</h3>
                  <p className="text-sm text-muted-foreground">
                    Organize and prioritize support tickets in one place
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Collaborate</h3>
                  <p className="text-sm text-muted-foreground">
                    Work together with your team to resolve tickets faster
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Monitor Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    Get insights into performance and resolution times
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Button size="lg" asChild>
              <Link href="/tickets">Get Started</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
