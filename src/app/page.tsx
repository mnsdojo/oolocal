import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Welcome to Ollama Chat</h1>
      </header>
      <Button asChild size="lg">
        <Link href="/chat/new">
          <PlusIcon className="mr-2 h-5 w-5" />
          Start New Conversation
        </Link>
      </Button>
    </div>
  );
}
