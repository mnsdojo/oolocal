import { Bot } from "lucide-react";



const EmptyChat = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-2xl w-full px-4">
        <div className="flex flex-col gap-4 rounded-lg border bg-background p-8 text-center">
          <Bot className="w-12 h-12 mx-auto text-primary" />
          <h1 className="text-2xl font-semibold">
            Welcome to Next.js AI Chatbot!
          </h1>
          <p className="text-muted-foreground">
            This is an open source AI chatbot app template built with Next.js,
            React, and Tailwind CSS.
          </p>
          <p className="text-sm text-muted-foreground">
            Start by typing a message below to begin your conversation.
          </p>
        </div>
      </div>
    </div>
  );
};
export default EmptyChat;
