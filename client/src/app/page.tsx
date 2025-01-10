import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function Page() {
    const session = await getServerSession(authOptions);
    console.log(session);
    return (
        <h1>Index</h1>
    );
}
