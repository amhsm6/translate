"use client";

import React, { useContext } from "react";
import context from "../context";
import Segment from "./Segment";

export default function SegmentEditor() {
    const { state } = useContext(context);

    return (
        <div className="w-full h-full px-7 mr-6">
            <div className="flex mb-3">
                <div className="w-1/3 mr-24 text-center">
                    <strong className="text-lg">Source</strong>
                </div>
                <div className="w-1/3 text-center">
                    <strong className="text-lg">Target</strong>
                </div>
            </div>
            <div className="w-full h-full overflow-scroll">
                { state?.document.segments.map(seg => <Segment segment={ seg } key={ seg.id } />) }
            </div>
        </div>
    );
}
