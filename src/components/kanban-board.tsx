"use client";

import {
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    closestCorners,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { Task, TaskStatus } from "@/types";
import { useState } from "react";
import { updateTask } from "@/app/actions";
import { KanbanTaskCard } from "./kanban-task-card";
import { TaskDetailDialog } from "./task-detail-dialog";
import { Badge } from "./ui/badge";

interface KanbanBoardProps {
    tasks: Task[];
}

const COLUMNS = [
    { id: TaskStatus.TODO, title: "To Do", color: "bg-slate-100 dark:bg-slate-900" },
    { id: TaskStatus.IN_PROGRESS, title: "In Progress", color: "bg-blue-50 dark:bg-blue-950" },
    { id: TaskStatus.DONE, title: "Done", color: "bg-green-50 dark:bg-green-950" },
];

export function KanbanBoard({ tasks }: KanbanBoardProps) {
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3,
            },
        })
    );

    function handleDragStart(event: DragStartEvent) {
        const task = tasks.find((t) => t.id === Number(event.active.id));
        if (task) {
            setActiveTask(task);
        }
    }

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const taskId = Number(active.id);
        const newStatus = over.id as TaskStatus;
        const task = tasks.find((t) => t.id === taskId);

        if (!task || task.status === newStatus) return;

        // Update task status via Server Action
        const formData = new FormData();
        formData.append("id", String(taskId));
        formData.append("title", task.title);
        formData.append("description", task.description || "");
        formData.append("status", newStatus);
        if (task.due_date) {
            formData.append("due_date", task.due_date);
        }

        await updateTask(formData);
    }

    const getTasksForColumn = (status: TaskStatus) => {
        return tasks.filter((task) => task.status === status);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COLUMNS.map((column) => (
                    <KanbanColumn
                        key={column.id}
                        column={column}
                        tasks={getTasksForColumn(column.id)}
                    />
                ))}
            </div>

            <DragOverlay>
                {activeTask ? (
                    <div className="opacity-50 rotate-3">
                        <KanbanTaskCard task={activeTask} />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

interface KanbanColumnProps {
    column: { id: TaskStatus; title: string; color: string };
    tasks: Task[];
}

function KanbanColumn({ column, tasks }: KanbanColumnProps) {
    const { useDroppable } = require("@dnd-kit/core");
    const { setNodeRef } = useDroppable({
        id: column.id,
    });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{column.title}</h3>
                <Badge variant="secondary">{tasks.length}</Badge>
            </div>

            <div
                ref={setNodeRef}
                className={`flex flex-col gap-3 p-4 rounded-lg min-h-[500px] ${column.color} border-2 border-dashed border-border/50`}
            >
                {tasks.map((task) => (
                    <DraggableTask key={task.id} task={task} />
                ))}
                {tasks.length === 0 && (
                    <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                        No tasks
                    </div>
                )}
            </div>
        </div>
    );
}

interface DraggableTaskProps {
    task: Task;
}

function DraggableTask({ task }: DraggableTaskProps) {
    const { useDraggable } = require("@dnd-kit/core");
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id,
    });
    const [detailOpen, setDetailOpen] = useState(false);

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
        : undefined;

    const handleClick = () => {
        if (!isDragging) {
            setDetailOpen(true);
        }
    };

    return (
        <>
            <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
                <KanbanTaskCard task={task} onClick={handleClick} />
            </div>
            <TaskDetailDialog
                task={task}
                open={detailOpen}
                onOpenChange={setDetailOpen}
            />
        </>
    );
}
