"use client";

import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task, TaskStatus } from "@/types";

interface KanbanTaskCardProps {
    task: Task;
    onClick?: () => void;
}

export function KanbanTaskCard({ task, onClick }: KanbanTaskCardProps) {
    const statusColors = {
        [TaskStatus.TODO]: "bg-slate-500",
        [TaskStatus.IN_PROGRESS]: "bg-blue-500",
        [TaskStatus.DONE]: "bg-green-500",
    };

    return (
        <Card
            className="cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
            onClick={onClick}
        >
            <CardHeader className="p-3 space-y-0">
                <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm font-medium leading-tight line-clamp-2">
                        {task.title}
                    </CardTitle>
                    <Badge className={`${statusColors[task.status]} text-xs shrink-0`}>
                        {task.status === TaskStatus.IN_PROGRESS ? "IP" : task.status === TaskStatus.TODO ? "TD" : "✓"}
                    </Badge>
                </div>
                {task.due_date && (
                    <p className="text-xs text-muted-foreground pt-1">
                        {new Date(task.due_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric"
                        })}
                    </p>
                )}
            </CardHeader>
        </Card>
    );
}
