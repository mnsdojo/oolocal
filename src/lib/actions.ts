"use server";

import { revalidatePath } from "next/cache";
import prisma from "./db";

export async function editConversation(id: string, newTitle: string) {
  await prisma.conversation.update({
    where: { id },
    data: { title: newTitle },
  });
  revalidatePath("/"); // Revalidate the home page to update the sidebar
}

export async function deleteConversation(id: string) {
  await prisma.conversation.delete({
    where: { id },
  });
  revalidatePath("/"); // Revalidate the home page to update the sidebar
}
