"use client";

import React from "react";
import { ClimbingBoxLoader } from "react-spinners";

export default function Loading() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <ClimbingBoxLoader />
        </div>
    );
}
