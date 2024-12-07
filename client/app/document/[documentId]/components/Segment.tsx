import React from "react";
import type { Segment } from "../context";

type Props = {
    segment: Segment
};

export default function Segment({ segment }: Props) {
    return (
        <div className="p-3 border-b-2 border-b-gray-300 flex justify-between">
            <div
                className="w-1/3 min-h-20 break-words border-2"
                contentEditable
            />

            <div
                className="w-1/3 min-h-20 border-2"
                contentEditable
            />
        </div>
    );
}
