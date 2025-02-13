
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileUp,
  ClipboardList,
  BookOpen,
  MessageSquare,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "New Order", href: "/dashboard/orders/new", icon: FileUp },
  { name: "Orders", href: "/dashboard/orders", icon: ClipboardList },
  { name: "Learning Hub", href: "/dashboard/learning", icon: BookOpen },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="lg:hidden fixed inset-0 z-40 flex">
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="text-xl font-semibold text-primary">Dentalab</span>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
