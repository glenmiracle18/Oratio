import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// all the queries for the workspaces table


// create a new worksspace
export const create = mutation({
  args: {
    name: v.string(),
  },

  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    
    if (!userId) {
      throw new Error("Unauthorized");
    }
    
    const joinCode = "12345";
    
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });
    
    return workspaceId;
  },
});

// get all workspaces
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("workspaces").collect();
  },
});

// get workspaces by Id
export const getById = query({
  args: {id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if(!userId){
      throw new Error("Unauthorized")
    }

    // return the workpaces based on the id
    return await ctx.db.get(args.id);
  }
})