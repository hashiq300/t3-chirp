import { clerkClient, type User } from "@clerk/nextjs/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany();
    const userId = posts.map(post => post.authorId);
    const users = await clerkClient.users.getUserList({ userId });

    return posts.map(post => ({
      author: filterUserDetails(users.find(user => user.id === post.authorId) ?? null),
      ...post
    }))
  }),
});


function filterUserDetails(user: User | null) {
  let username = "Anonymous";
  if (user?.firstName && user.lastName) {
    username = `${user.firstName} ${user.lastName}`
  }
  return {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    username,
    profileImageUrl: user?.profileImageUrl ?? "/userimage.jpg",
    id: user?.id ?? crypto.randomUUID()
  }
}