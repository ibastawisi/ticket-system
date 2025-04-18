import { CheckCircle, UserX } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const users = [
  {
    name: "Harry Green",
    job: "QA Engineer",
    isAvailable: false,
  },
  {
    name: "Trudy Torres",
    job: "Project Manager",
    isAvailable: true,
  },
  {
    name: "Alice Ling",
    job: "Software Engineer",
    isAvailable: false,
  },
];

export default function UserList() {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Job</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.name}>
                  <TableCell className={!user.isAvailable ? "text-red-500" : ""}>
                    {user.isAvailable ? <CheckCircle className="inline mr-2 text-green-500 h-4 w-4" /> : <UserX className="inline mr-2 text-red-500 h-4 w-4" />} 
                    {user.name}
                  </TableCell>
                  <TableCell>{user.job}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
