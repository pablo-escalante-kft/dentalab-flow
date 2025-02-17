
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Search, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

const messages = [
  {
    id: 1,
    sender: "Dr. Sarah Wilson",
    message: "Can you check the latest scan I sent?",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    sender: "Lab Team",
    message: "Order #1234 is ready for review",
    time: "9:45 AM",
    unread: false,
  },
  {
    id: 3,
    sender: "Dr. Michael Chen",
    message: "Updated the treatment plan",
    time: "Yesterday",
    unread: false,
  },
];

const MessagesPage = () => {
  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Contacts Sidebar */}
        <Card className="w-80 flex flex-col border-r">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search messages..." className="pl-8" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className="p-4 border-b hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium">{message.sender}</h4>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">{message.message}</p>
                {message.unread && (
                  <div className="w-2 h-2 bg-primary rounded-full absolute right-4" />
                )}
              </div>
            ))}
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b bg-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Dr. Sarah Wilson</h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`flex ${
                    i % 2 === 0 ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      i % 2 === 0
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <span className="text-xs opacity-70 mt-1 block">
                      10:{i * 10} AM
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
