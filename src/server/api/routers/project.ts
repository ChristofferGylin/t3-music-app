import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          instruments: "[]",
          scenes: "[]",
        },
      });
    }),

  getUserProjects: protectedProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({
      orderBy: { created: "desc" },
      where: { userId: ctx.session.user.id },
    });
  }),

  getProjectById: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      return ctx.db.project.findUnique({
        where: { id: input.id, userId: ctx.session.user.id },
      });
    }),
});
