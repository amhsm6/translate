import React from "react";
import { fetchapi } from "@/actions";
import Header from "@/components/Header";
import TaskTable, { TaskHeader } from "./components/table";

export default async function Page() {
    const tasks: TaskHeader[] = await fetchapi("/api/tasks", "GET");

    return (
        <div className="flex flex-col items-center">
            <Header type="index" tasks={ tasks.length } />
            <div className="w-full mt-4 px-3">
                <TaskTable tasks={ tasks } />
            </div>
        </div>
    );
}
