"use server";

import { createClient } from "@/lib/supabase/server";
import { createTaskSchema, updateTaskSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Task } from "@/types";

export async function getTasks(): Promise<Task[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }

    return data as Task[];
}

export async function createTask(formData: FormData) {
    const supabase = await createClient();

    const rawData = {
        title: formData.get("title"),
        description: formData.get("description"),
        due_date: formData.get("due_date") || null,
        status: formData.get("status"),
    };

    const validatedFields = createTaskSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { error } = await supabase
        .from("tasks")
        .insert({
            ...validatedFields.data,
        });

    if (error) {
        return {
            message: "Database Error: Failed to create task.",
        };
    }

    revalidatePath("/");
    return { message: "Success" };
}

export async function updateTask(formData: FormData) {
    const supabase = await createClient();

    const rawData = {
        id: Number(formData.get("id")),
        title: formData.get("title"),
        description: formData.get("description"),
        status: formData.get("status"),
        due_date: formData.get("due_date") || null,
    };

    // Filter out null/undefined values to allow partial updates if needed, 
    // but for now we validate the whole object structure for safety
    const validatedFields = updateTaskSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { error } = await supabase
        .from("tasks")
        .update({
            title: validatedFields.data.title,
            description: validatedFields.data.description,
            status: validatedFields.data.status,
            due_date: validatedFields.data.due_date,
        })
        .eq("id", validatedFields.data.id);

    if (error) {
        return {
            message: "Database Error: Failed to update task.",
        };
    }

    revalidatePath("/");
    return { message: "Success" };
}

export async function deleteTask(formData: FormData) {
    const id = Number(formData.get("id"));
    const supabase = await createClient();

    const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", id);

    if (error) {
        return {
            message: "Database Error: Failed to delete task.",
        };
    }

    revalidatePath("/");
    return { message: "Success" };
}
