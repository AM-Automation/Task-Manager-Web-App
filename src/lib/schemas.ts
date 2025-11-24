import { z } from "zod";
import { TaskStatus } from "@/types";

export const createTaskSchema = z.object({
    title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
    description: z.string().max(500, "Description must be 500 characters or less").optional(),
    status: z.nativeEnum(TaskStatus).default(TaskStatus.TODO),
    due_date: z.string().optional().nullable(),
});

export const updateTaskSchema = createTaskSchema.partial().extend({
    id: z.number(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
