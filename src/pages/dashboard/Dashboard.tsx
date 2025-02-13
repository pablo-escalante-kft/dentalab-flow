
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, Plus, Clock } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="flex items-center gap-2 h-auto py-4" size="lg">
            <Plus className="h-5 w-5" />
            New Order
          </Button>
          <Button variant="secondary" className="flex items-center gap-2 h-auto py-4" size="lg">
            <FileUp className="h-5 w-5" />
            Upload Scan
          </Button>
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
                  <tr className="border-b">
                    <td className="px-6 py-4">#001</td>
                    <td className="px-6 py-4">Crown</td>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        In Progress
                      </span>
                    </td>
                    <td className="px-6 py-4">2024-03-20</td>
                  </tr>
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
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
