"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Task, TaskStatus } from "@/types";
import { deleteTask } from "@/app/actions";
import { Trash2 } from "lucide-react";
import { EditTaskDialog } from "@/components/edit-task-dialog";

interface TaskCardProps {
    task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
    const statusColors = {
        [TaskStatus.TODO]: "bg-slate-500",
        [TaskStatus.IN_PROGRESS]: "bg-blue-500",
        [TaskStatus.DONE]: "bg-green-500",
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                    <CardTitle className="text-base font-semibold leading-none">
                        {task.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                        Due: {task.due_date ? new Date(task.due_date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        }) : "No date"}
                    </CardDescription>
                </div>
                <Badge className={statusColors[task.status]}>{task.status.replace("_", " ")}</Badge>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    {task.description || "No description provided."}
                </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <EditTaskDialog task={task} />
                <form
                    action={async (formData) => {
                        await deleteTask(formData);
                    }}
                >
                    <input type="hidden" name="id" value={task.id} />
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
