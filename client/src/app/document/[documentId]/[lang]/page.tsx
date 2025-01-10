import React from "react";
import { fetchapi } from "@/actions";
import { ContextProvider } from "./context";
import Header from "./components/Header";
import SegmentEditor from "./components/SegmentEditor";
import Sidepanel from "./components/Sidepanel";
import styles from "./page.module.css";

type Props = {
    params: Promise<{ documentId: number, lang: string }>
};

export default async function Page({ params }: Props) {
    const { documentId, lang } = await params;
    const document = await fetchapi(`/api/document/${documentId}/${lang}`, "GET");

    return (
        <ContextProvider document={ document } translationLang={ lang }>
            <Header />
            <div className={ `flex justify-between mt-5 pb-20 ${styles.content}` }>
                <SegmentEditor />
                <Sidepanel />
            </div>
        </ContextProvider>
    );
}
