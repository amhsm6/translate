import React from "react";
import type Document from "./state";
import Header from "./components/Header";
import SegmentEditor from "./components/SegmentEditor";
import Sidepanel from "./components/Sidepanel";

type Props = {
    params: Promise<{ documentId: number }>
};

export default async function Page({ params }: Props) {
    const { documentId } = await params;

    const resp = await fetch(process.env.NODE_ENV === "production" ? `${process.env.URL}/api/document/${documentId}` : `${process.env.API_URL}/api/document/${documentId}`);
    const document: Document = await resp.json();

    return (
        <div>
            <Header />
            <div className="flex justify-between mt-3">
                <SegmentEditor />
                <Sidepanel />
            </div>
        </div>
    );
}
