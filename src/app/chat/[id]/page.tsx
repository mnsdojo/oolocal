"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef } from "react";

import { SendIcon, Bot, Upload } from "lucide-react";
import { useChat } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "@/components/chat-message";

const EmptyChat = () => {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to Next.js AI Chatbot!
        </h1>
        <p className="leading-normal text-muted-foreground">
          This is an open source AI chatbot app template built with{" "}
        </p>
      </div>
    </div>
  );
};

function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const scrollableContentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <EmptyChat />
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${"bg-gray-200 text-black"}`}
              >
                <ChatMessage message={message} />
              </div>
            </div>
          ))
        )}
        <div ref={scrollableContentRef} />
      </ScrollArea>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : <SendIcon className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Page;
