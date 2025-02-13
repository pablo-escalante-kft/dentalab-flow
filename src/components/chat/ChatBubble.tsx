
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageSquare, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
          size="icon"
        >
          <MessageSquare />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 h-96 p-0"
        side="top"
        align="end"
        sideOffset={20}
      >
        <div className="flex flex-col h-full">
          <div className="p-3 border-b bg-primary text-primary-foreground">
            <h3 className="font-semibold">Chat Support</h3>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                Hello! How can we help you today?
              </div>
            </div>
          </div>
          <div className="p-3 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Handle message send
                setMessage("");
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChatBubble;
