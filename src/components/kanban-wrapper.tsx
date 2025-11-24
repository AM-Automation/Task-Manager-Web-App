"use client";

import dynamic from "next/dynamic";
import { Task } from "@/types";

const KanbanBoard = dynamic(
    () => import("@/components/kanban-board").then((mod) => ({ default: mod.KanbanBoard })),
    {
        ssr: false,
        loading: () => (
            <div className="p-8 text-center text-muted-foreground">
                Loading board...
            </div>
        ),
    }
);

interface KanbanWrapperProps {
    tasks: Task[];
}

export function KanbanWrapper({ tasks }: KanbanWrapperProps) {
    return <KanbanBoard tasks={tasks} />;
}
