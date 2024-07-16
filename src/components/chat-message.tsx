import { cn } from "@/lib/utils";
import { Message } from "ai";
import { Bot, User } from "lucide-react";
import React from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MemoizedReactMarkdown } from "./markdown";
import { CodeBlock } from "./ui/code-block";

interface ChatMessageProps {
  message: Message;
}
function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div {...props}>
      {message.role === "user" ? <User /> : <Bot />}

      <MemoizedReactMarkdown
        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            return <p className="mb-2 last:mb-0">{children}</p>;
          },
        }}
      >
        {message.content}
      </MemoizedReactMarkdown>
    </div>
  );
}

export default ChatMessage;
