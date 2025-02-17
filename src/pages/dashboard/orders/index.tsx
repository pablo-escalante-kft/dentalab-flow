
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileUp, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const OrdersPage = () => {
  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          patients (
            first_name,
            last_name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <div className="flex gap-4">
            <Button asChild>
              <Link to="/dashboard/orders/new" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Order
              </Link>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileUp className="h-4 w-4" />
              Upload Files
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id.slice(0, 8)}</TableCell>
                  <TableCell>
                    {order.patients.first_name} {order.patients.last_name}
                  </TableCell>
                  <TableCell>{order.type}</TableCell>
                  <TableCell>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {order.due_date
                      ? new Date(order.due_date).toLocaleDateString()
                      : "Not set"}
                  </TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
