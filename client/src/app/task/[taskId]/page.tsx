import React from "react";
import { fetchapi } from "@/actions";
import { ContextProvider } from "./context";
import type { Task } from "@/types";
import Header from "@/components/Header";
import SegmentEditor from "./components/SegmentEditor";
import Sidepanel from "./components/Sidepanel";
import styles from "./page.module.css";

type Props = {
    params: Promise<{ taskId: string }>
};

export default async function Page({ params }: Props) {
    const { taskId } = await params;
    const task: Task = await fetchapi(`/api/task/${taskId}`, "GET");

    return (
        <ContextProvider task={ task }>
            <Header type="editor" title={ task.document.title } />
            <div className={ `flex justify-between mt-5 pb-20 ${styles.content}` }>
                <SegmentEditor />
                <Sidepanel />
            </div>
        </ContextProvider>
    );
}
