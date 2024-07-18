"use client";
import React, { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendIcon } from "lucide-react";
import ChatMessage from "@/components/chat-message";
import EmptyChat from "@/components/empty-chat";
// chat/{id}.tsx page
function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const scrollableContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-2xl mx-auto">
          {messages.length === 0 ? (
            <EmptyChat />
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={scrollableContentRef} />
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t border-border bg-background p-4">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-1 bg-background text-foreground border-input"
            />
            <Button type="submit" disabled={isLoading} variant="default">
              {isLoading ? "Sending..." : <SendIcon className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
