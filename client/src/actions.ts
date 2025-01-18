"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function fetchapi(url: string, method: string, body?: any): Promise<any> {
    const session = await getServerSession(authOptions);
    if (!session) { throw new Error("Session undefined"); }

    const init: RequestInit = {
        method,
        headers: { "Authorization": `Bearer ${session.accessToken}` }
    };

    if (method !== "GET") {
        init.headers = { ...init.headers, "Content-Type": "application/json" };
        init.body = JSON.stringify(body);
    }

    const resp = await fetch(`${process.env.API_URL}${url}/`, init);
    const data = await resp.json();

    if (!resp.ok) {
        throw new Error(JSON.stringify(data));
    }

    return data;
}
