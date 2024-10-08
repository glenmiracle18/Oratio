import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// all the queries for the workspaces table

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
  },
  hanlder: async (ctx, args) => {
    const userId = auth.getUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // TODO: fix method later
    const joinCode = "12345";

    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      joinCode,
      userId,
    });

    return workspaceId;
  },
});
