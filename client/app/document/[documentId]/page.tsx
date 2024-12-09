import React from "react";
import { ContextProvider, Document } from "./context";
import Header from "./components/Header";
import SegmentEditor from "./components/SegmentEditor";
import Sidepanel from "./components/Sidepanel";
import styles from "./page.module.css";

type Props = {
    params: Promise<{ documentId: number }>
};

export default async function Page({ params }: Props) {
    const { documentId } = await params;

    const resp = await fetch(process.env.NODE_ENV === "production" ? `${process.env.URL}/api/document/${documentId}/` : `${process.env.API_URL}/api/document/${documentId}/`);
    const document: Document = await resp.json();

    return (
        <ContextProvider document={ document }>
            <Header />
            <div className={ `flex justify-between mt-5 pb-20 ${styles.content}` }>
                <SegmentEditor />
                <Sidepanel />
            </div>
        </ContextProvider>
    );
}
