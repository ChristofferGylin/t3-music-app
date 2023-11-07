import { z } from "zod";
import { TRPCError } from "@trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { kits } from "~/instruments/drums/kits";

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
        include: {
          drumsKits: true,
        },
      });
    }),

  save: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        instruments: z.string().min(1),
        scenes: z.string().min(1),
        kits: z.array(z.object({ id: z.string().min(1) })),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.update({
        where: { id: input.id },
        data: {
          instruments: input.instruments,
          scenes: input.scenes,
          drumsKits: {
            set: [],
            connect: input.kits,
          },
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
        include: {
          drumsKits: true,
        },
      });
    }),
});