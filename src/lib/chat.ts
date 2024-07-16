import prisma from "./db";

export async function createConversations(title: string) {
  return prisma.conversation.create({
    data: { title },
  });
}

export async function getConveration(id: string) {
  return prisma.conversation.findUnique({
    where: { id },
    include: { messages: true },
  });
}

export async function updateConversation(id: string, data: { title: string }) {
  return prisma.conversation.update({
    where: { id },
    data,
  });
}

export async function deleteConversation(id: string) {
  return prisma.conversation.delete({
    where: { id },
  });
}
