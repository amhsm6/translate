"use client";

import React, { useContext } from "react";
import context from "../context";
import Segment from "./Segment";

export default function SegmentEditor() {
    const { state } = useContext(context);

    return (
        <div className="w-full h-full px-5 mr-6">
            <div className="w-11/12 ml-5 mb-3 flex justify-center">
            <div className="w-11/12 flex">
                <div className="w-1/3 mr-24 text-center">
                    <strong className="text-lg">Source</strong>
                </div>
                <div className="w-1/3 text-center">
                    <strong className="text-lg">Target</strong>
                </div>
            </div>
            </div>
            <div className="scroll-left w-full h-full flex justify-end overflow-scroll">
                <div className="w-11/12">
                    { state?.document.segments.map(seg => <Segment segment={ seg } key={ seg.id } />) }
                </div>
            </div>
        </div>
    );
}
