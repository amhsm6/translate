"use client";

import React, { useContext } from "react";
import context from "../context";

export default function Header() {
    const ctx = useContext(context);
    if (!ctx) { throw new Error("Context is undefined"); }
    const { state } = ctx;

    return (
        <div className="w-full h-10 border-b-2 border-black flex items-center px-6">
            <div>
                <strong className="text-2xl mr-8">Translate</strong>
                <span className="text-xl mb-1">{ state.document.title }</span>
            </div>
        </div>
    );
}
