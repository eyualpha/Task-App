import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getTasks = query({
    handler: async (ctx) => {
        const tasks = await ctx.db.query("tasks").order("desc").collect();
        return tasks;
    }
});

export const addTask = mutation({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("tasks", {
      title: args.title,
      isCompleted: false,
    });

    return taskId;
  },
});

export const toggleTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) throw new ConvexError("Task not found");

    await ctx.db.patch(args.id, {
      isCompleted: !task.isCompleted,
    });
  },
});

export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      title: args.title,
    });
  },
});

export const clearAllTasks = mutation({
  handler: async (ctx) => {
    const tasks = await ctx.db.query("tasks").collect();

    // Delete all tasks
    for (const task of tasks) {
      await ctx.db.delete(task._id);
    }

    return { deletedCount: tasks.length };
  },
});