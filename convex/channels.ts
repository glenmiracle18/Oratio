
import { v } from "convex/values";
import { query } from "./_generated/server";
import { auth } from "./auth";


export const get = query({
    args: {
        workspaceId: v.id("workspaces"),
    },
    handler: async(ctx, args)  =>  {
        const userId = await auth.getUserId(ctx);

        if(!userId) {
            return []
        }

        const members = await ctx.db
        .query("members")
        .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", args.workspaceId).eq("userId", userId))
        .unique();

        if(!members) {
            return []
        }

        const channels = await ctx.db.query("channels").collect();
        return channels;

    }
})