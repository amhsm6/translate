import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Translate",
    description: "A Translation System",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
    return (
        <html className="h-full" lang="en">
            <body className="m-0 p-0 h-full">
                { children }
            </body>
        </html>
    );
}
