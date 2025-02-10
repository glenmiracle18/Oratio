import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

// generate random invitation code
const generateCode = () => {
  const code = Array.from(
    {length: 6},
    () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("")
  return code
};

// all the queries for the workspaces table∏

// create a new worksspace and and current user as admin
export const create = mutation({
  args: {
    name: v.string(),
  },

  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      return []
    }

    const joinCode = generateCode()

    // because the response after mutating(creating) any convex document, by default is just returns the id
    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    // create current user as admin member
    await ctx.db.insert("members", {
      userId,
      workspaceId,
      role: "admin",
    });

    // create a default channel
    await ctx.db.insert("channels", {
      name: "general",
      workspaceId,
    });
    

    return workspaceId;
  },
});

// get all workspaces based on the currently logged in user
export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);

    if (!userId) {
      return [];
    }

    // get all the workspaces that this user is a member of and store in members array
    const members = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    // an array of all the workpaceId's that the member belongs to
    const workspaceIds = members.map((member) => member.workspaceId);

    const workspaces = [];

    for (const workpaceId of workspaceIds) {
      const workspace = await ctx.db.get(workpaceId);

      if (workspace) {
        workspaces.push(workspace);
      }
    }

    return workspaces;
  },
});

// get workspaces by Id
export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();

    if (!member) {
      return null;
    }

    // return the workpaces based on the id
    return await ctx.db.get(args.id);
  },
});


// creating a mutation to update the name of workspace
export const update = mutation({
  args: { id: v.id('workspaces'), name: v.string() },
  handler: async (ctx, args ) => {

    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // making sure only the admin can perform this.
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();

      if(!member || member.role === 'member') {
        throw new Error("Unauthorized");
      }

      await ctx.db.patch( args.id, { name: args.name } );
      console.log('done')

      return args.id;
  }
})


// deleting the workspace
export const remove = mutation({
  args: { id: v.id('workspaces') },
  handler: async (ctx, args ) => {

    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();

      if(!member || member.role === 'member') {
        throw new Error("Unauthorized");
      }

      // collecting all the members associated to that workspace
      const [members] = await Promise.all([
        ctx.db.query('members')
        .withIndex('by_workspace_id', (q) => q.eq('workspaceId', args.id))
        .collect()
      ])

      // deleting each one of them
      for (const member of members){
        await ctx.db.delete(member._id)
      }

      // deletion of workspace
      await ctx.db.delete( args.id );

      return args.id;
  }
})