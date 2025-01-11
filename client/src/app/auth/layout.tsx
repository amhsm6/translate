"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

// TODO: extract similar parts from login and register pages

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <SessionProvider>
            { children }
        </SessionProvider>
    );
}
