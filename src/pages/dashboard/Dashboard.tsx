
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewOrderModal from "@/components/modals/NewOrderModal";
import UploadScanModal from "@/components/modals/UploadScanModal";
import ChatBubble from "@/components/chat/ChatBubble";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
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
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NewOrderModal />
          <UploadScanModal />
          <Button variant="outline" className="flex items-center gap-2 h-auto py-4" size="lg">
            <Clock className="h-5 w-5" />
            View Active Orders
          </Button>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Patient</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-6 py-4">#{order.id.slice(0, 8)}</td>
                      <td className="px-6 py-4">{order.type}</td>
                      <td className="px-6 py-4">
                        {order.patients.first_name} {order.patients.last_name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {order.due_date
                          ? new Date(order.due_date).toLocaleDateString()
                          : "Not set"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {orders?.filter((o) => o.status === "pending").length || 0}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {orders?.filter((o) => o.status === "completed").length || 0}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {orders?.filter((o) => o.due_date).length || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chat Bubble */}
        <ChatBubble />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
