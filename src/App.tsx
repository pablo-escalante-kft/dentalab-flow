
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import OrdersPage from "./pages/dashboard/orders";
import MessagesPage from "./pages/dashboard/messages";
import LearningPage from "./pages/dashboard/learning";
import NewOrderPage from "./pages/dashboard/orders/new";
import OrderDetailsPage from "./pages/dashboard/orders/[id]";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/orders",
    element: <OrdersPage />,
  },
  {
    path: "/dashboard/orders/new",
    element: <NewOrderPage />,
  },
  {
    path: "/dashboard/orders/:id",
    element: <OrderDetailsPage />,
  },
  {
    path: "/dashboard/messages",
    element: <MessagesPage />,
  },
  {
    path: "/dashboard/learning",
    element: <LearningPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
