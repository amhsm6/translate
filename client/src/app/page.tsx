import React from "react";
import { fetchapi } from "@/actions";
import Header from "@/components/Header";
import type { Task } from "@/types";

export default async function Page() {
    const tasks: Task[] = await fetchapi("/api/tasks", "GET");
    console.log(tasks)

    return (
        <div>
            <Header type="index" tasks={ tasks.length } />
            <h1>Index</h1>
        </div>
    );
}
