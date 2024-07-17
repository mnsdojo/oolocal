import { cn } from "@/lib/utils";
import { Message } from "ai";
import { Bot, User } from "lucide-react";
import React from "react";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MemoizedReactMarkdown } from "./markdown";
import { CodeBlock } from "./ui/code-block";
import { Components } from "react-markdown";

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message, ...props }: ChatMessageProps) {
  const components: Components = {
    p({ children }) {
      return <p className="mb-2 last:mb-0">{children}</p>;
    },
    code({ node, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const lang = match && match[1];

      return (
        <CodeBlock
          key={Math.random()}
          language={(lang as string) || ""}
          value={String(children).replace(/\n$/, "")}
          {...props}
        />
      );
    },
  };

  return (
    <div
      className={cn(
        "flex items-start gap-4 py-4",
        message.role === "user" ? "justify-end" : "justify-start"
      )}
      {...props}
    >
      <div
        className={cn(
          "rounded-full p-2",
          message.role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {message.role === "user" ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      <div
        className={cn(
          "flex flex-col space-y-2 max-w-[80%]",
          message.role === "user" ? "items-end" : "items-start"
        )}
      >
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={components}
        >
          {message.content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}

export default ChatMessage;
