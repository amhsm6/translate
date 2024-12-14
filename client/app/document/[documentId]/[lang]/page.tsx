import React from "react";
import { ContextProvider, Document } from "./context";
import Header from "./components/Header";
import SegmentEditor from "./components/SegmentEditor";
import Sidepanel from "./components/Sidepanel";
import styles from "./page.module.css";

type Props = {
    params: Promise<{ documentId: number, lang: string }>
};

export default async function Page({ params }: Props) {
    const { documentId, lang } = await params;

    const resp = await fetch(process.env.NODE_ENV === "production" ? `${process.env.URL}/api/document/${documentId}/${lang}` : `${process.env.API_URL}/api/document/${documentId}/${lang}`);
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
