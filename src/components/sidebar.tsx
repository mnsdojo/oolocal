"use client";

import React from "react";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { PlusIcon, MessageSquareIcon } from "lucide-react";
import Link from "next/link";
type Conversation = {
  id: string;
  title: string;
};

function Sidebar({ conversations }: { conversations: Conversation[] }) {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-gray-300 h-screen flex flex-col">
      <div className="p-4">
        <Button className="w-full justify-start" asChild variant="ghost">
          <Link href="/">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Chat
          </Link>
        </Button>
        <nav className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/chat/${conversation.id}`}
              className={`flex items-center px-4 py-2 text-sm ${
                pathname === `/chat/${conversation.id}`
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              <MessageSquareIcon className="mr-2 h-4 w-4" />
              <span className="truncate">{conversation.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
