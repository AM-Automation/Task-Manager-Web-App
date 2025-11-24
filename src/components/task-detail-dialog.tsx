"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Task, TaskStatus } from "@/types";
import { EditTaskDialog } from "./edit-task-dialog";
import { deleteTask } from "@/app/actions";
import { Trash2, Calendar } from "lucide-react";

interface TaskDetailDialogProps {
    task: Task;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TaskDetailDialog({ task, open, onOpenChange }: TaskDetailDialogProps) {
    const statusColors = {
        [TaskStatus.TODO]: "bg-slate-500",
        [TaskStatus.IN_PROGRESS]: "bg-blue-500",
        [TaskStatus.DONE]: "bg-green-500",
    };

    async function handleDelete() {
        const formData = new FormData();
        formData.append("id", String(task.id));
        await deleteTask(formData);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-start justify-between gap-4">
                        <DialogTitle className="text-xl">{task.title}</DialogTitle>
                        <Badge className={statusColors[task.status]}>
                            {task.status.replace("_", " ")}
                        </Badge>
                    </div>
                    {task.due_date && (
                        <DialogDescription className="flex items-center gap-2 pt-2">
                            <Calendar className="h-4 w-4" />
                            Due: {new Date(task.due_date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </DialogDescription>
                    )}
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div>
                        <h4 className="text-sm font-semibold mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {task.description || "No description provided."}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-2 border-t pt-4">
                    <EditTaskDialog task={task} />
                    <form action={handleDelete}>
                        <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
