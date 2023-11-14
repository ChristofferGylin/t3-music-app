import { TRPCError } from "@trpc/server";
import { tree } from "next/dist/build/templates/app-page";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  getUserProjects: protectedProcedure.query(({ ctx }) => {
    if (ctx.session.user.role !== "admin") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return ctx.db.project.findMany({
      orderBy: { created: "asc" },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });
  }),

  getProjectById: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      if (ctx.session.user.role !== "admin") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return ctx.db.project.findUnique({
        where: { id: input.id },
        include: {
          drumsKits: true,
        },
      });
    }),
  deleteProject: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      if (ctx.session.user.role !== "admin") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return ctx.db.project.delete({
        where: { id: input.id },
      });
    }),

  getAllUsers: protectedProcedure.query(({ ctx }) => {
    if (ctx.session.user.role !== "admin") {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return ctx.db.user.findMany({
      orderBy: { created: "asc" },
    });
  }),

  getUserById: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(({ ctx, input }) => {
      if (ctx.session.user.role !== "admin") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return ctx.db.user.findUnique({
        where: { id: input.id },
        include: {
          projects: {
            select: {
              id: true,
              name: true,
              created: true,
              updated: true,
            },
          },
        },
      });
    }),

  deleteUser: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      if (ctx.session.user.role !== "admin") {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return ctx.db.user.delete({
        where: { id: input.id },
      });
    }),
});
