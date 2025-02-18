
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Download, Printer } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const OrderSteps = {
  pending: 1,
  "in-progress": 2,
  "under-review": 3,
  completed: 4,
  cancelled: -1,
} as const;

const OrderStepLabels = {
  pending: "Pending",
  "in-progress": "In Progress",
  "under-review": "Under Review",
  completed: "Completed",
  cancelled: "Cancelled",
} as const;

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          patient:patients(*),
          scans(*)
        `)
        .eq("id", id)
        .single();

      if (error) {
        toast({
          title: "Error fetching order",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  const handleExport = () => {
    if (!order) return;

    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(20);
    pdf.text(`Order Details - #${order.id.slice(0, 8)}`, 20, 20);
    
    // Add order information
    pdf.setFontSize(12);
    autoTable(pdf, {
      head: [['Order Information']],
      body: [
        ['Type', order.type],
        ['Status', OrderStepLabels[order.status as keyof typeof OrderStepLabels]],
        ['Created At', format(new Date(order.created_at), "PPP pp")],
        ['Due Date', order.due_date ? format(new Date(order.due_date), "PPP") : "Not set"],
      ],
      startY: 30,
      theme: 'striped',
    });

    // Add patient information
    autoTable(pdf, {
      head: [['Patient Information']],
      body: [
        ['Name', `${order.patient.first_name} ${order.patient.last_name}`],
        ['Email', order.patient.email || 'Not provided'],
        ['Phone', order.patient.phone || 'Not provided'],
        ['Date of Birth', order.patient.date_of_birth ? format(new Date(order.patient.date_of_birth), "PPP") : 'Not provided'],
      ],
      startY: pdf.lastAutoTable.finalY + 10,
      theme: 'striped',
    });

    // Add additional information
    autoTable(pdf, {
      head: [['Additional Information']],
      body: [[order.additional_info || 'No additional information provided.']],
      startY: pdf.lastAutoTable.finalY + 10,
      theme: 'striped',
    });

    // Add scans if any
    if (order.scans && order.scans.length > 0) {
      autoTable(pdf, {
        head: [['Scan File', 'Uploaded At']],
        body: order.scans.map(scan => [
          scan.file_path,
          format(new Date(scan.uploaded_at), "PPP pp")
        ]),
        startY: pdf.lastAutoTable.finalY + 10,
        theme: 'striped',
      });
    }

    // Save PDF
    pdf.save(`order-${order.id.slice(0, 8)}.pdf`);

    toast({
      title: "Export successful",
      description: "Order details have been exported as PDF.",
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">Loading order details...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!order) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">Order not found</div>
        </div>
      </DashboardLayout>
    );
  }

  const currentStep = OrderSteps[order.status as keyof typeof OrderSteps];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/orders">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute top-4 w-full h-1 bg-gray-200">
                <div 
                  className="absolute h-full bg-primary transition-all"
                  style={{ 
                    width: `${Math.max(0, Math.min(100, (currentStep / 4) * 100))}%`,
                    display: order.status === 'cancelled' ? 'none' : 'block'
                  }}
                />
              </div>
              <div className="relative flex justify-between">
                {Object.entries(OrderStepLabels).map(([key, label], index) => {
                  if (key === 'cancelled') return null;
                  const stepNumber = OrderSteps[key as keyof typeof OrderSteps];
                  const isActive = currentStep >= stepNumber;
                  const isCurrent = currentStep === stepNumber;
                  
                  return (
                    <div key={key} className="flex flex-col items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-gray-200 text-gray-500'
                        } ${
                          isCurrent 
                            ? 'ring-4 ring-primary/30' 
                            : ''
                        }`}
                      >
                        {stepNumber}
                      </div>
                      <span className={`mt-2 text-sm ${
                        isActive ? 'text-primary font-medium' : 'text-gray-500'
                      }`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {order.status === 'cancelled' && (
              <div className="mt-8 p-4 bg-destructive/10 text-destructive rounded-lg">
                <p className="text-center font-medium">This order has been cancelled</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                <p>{order.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <p className="capitalize">{order.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <p className="capitalize">{OrderStepLabels[order.status as keyof typeof OrderStepLabels]}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Created At</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p>{format(new Date(order.created_at), "PPP")}</p>
                  <Clock className="h-4 w-4 ml-2 text-muted-foreground" />
                  <p>{format(new Date(order.created_at), "p")}</p>
                </div>
              </div>
              {order.due_date && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p>{format(new Date(order.due_date), "PPP")}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p>{order.patient.first_name} {order.patient.last_name}</p>
              </div>
              {order.patient.email && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{order.patient.email}</p>
                </div>
              )}
              {order.patient.phone && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{order.patient.phone}</p>
                </div>
              )}
              {order.patient.date_of_birth && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p>{format(new Date(order.patient.date_of_birth), "PPP")}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{order.additional_info || "No additional information provided."}</p>
          </CardContent>
        </Card>

        {order.scans && order.scans.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Scans</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Path</TableHead>
                      <TableHead>Uploaded At</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.scans.map((scan) => (
                      <TableRow key={scan.id}>
                        <TableCell>{scan.file_path}</TableCell>
                        <TableCell>{format(new Date(scan.uploaded_at), "PPP")}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default OrderDetailsPage;
