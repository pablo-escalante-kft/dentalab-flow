
import DashboardLayout from "@/components/layout/DashboardLayout";
import NewOrderModal from "@/components/modals/NewOrderModal";

const NewOrderPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">New Order</h1>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <NewOrderModal />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewOrderPage;
