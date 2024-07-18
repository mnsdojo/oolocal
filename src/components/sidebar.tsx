"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { PlusIcon, MessageSquareIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

type Conversation = {
  id: string;
  title: string;
};

function Sidebar({ conversations }: { conversations: Conversation[] }) {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-gray-300 h-screen flex flex-col">
      <div className="p-4 flex flex-col flex-grow">
        <Button className="w-full justify-start mb-4" asChild variant="ghost">
          <Link href="/">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Chat
          </Link>
        </Button>

        <nav className="flex-1 overflow-y-auto mb-4">
          {conversations.map((conversation) => (
            <Link
              key={conversation.id}
              href={`/chat/${conversation.id}`}
              className={`flex items-center px-4 py-2 text-sm mb-1 rounded ${
                pathname === `/chat/${conversation.id}`
                  ? "bg-gray-800 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <MessageSquareIcon className="mr-2 h-4 w-4" />
              <span className="truncate">{conversation.title}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex items-center justify-between">
          <Button asChild variant="ghost" size="icon" className="rounded-full">
            <Link href="/settings">
              <SettingsIcon className="h-5 w-5" />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
