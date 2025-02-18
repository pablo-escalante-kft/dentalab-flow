
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import OrdersPage from "./pages/dashboard/orders";
import NewOrderPage from "./pages/dashboard/orders/new";
import LearningHubPage from "./pages/dashboard/learning";
import MessagesPage from "./pages/dashboard/messages";
import NotFound from "./pages/NotFound";
import OrderDetailsPage from "./pages/dashboard/orders/[id]";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/orders/new" element={<NewOrderPage />} />
          <Route path="/dashboard/orders/:id" element={<OrderDetailsPage />} />
          <Route path="/dashboard/orders" element={<OrdersPage />} />
          <Route path="/dashboard/learning" element={<LearningHubPage />} />
          <Route path="/dashboard/messages" element={<MessagesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
