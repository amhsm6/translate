"use server";

import { Translation } from "./context";

export async function updateTarget(segmentId: string, translationLang: string, targetId: string | null, targetText: string): Promise<Translation> {
    let resp: Response;
    if (targetId) {
        resp = await fetch(
            process.env.NODE_ENV === "production" ? `${process.env.URL}/api/translation/${targetId}/` : `${process.env.API_URL}/api/translation/${targetId}/`,
            {
                method: "PUT",
                body: JSON.stringify({ "target": targetText, "lang": translationLang }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    } else {
        resp = await fetch(
            process.env.NODE_ENV === "production" ? `${process.env.URL}/api/segment/${segmentId}/translate/${translationLang}/` : `${process.env.API_URL}/api/segment/${segmentId}/translate/${translationLang}/`,
            {
                method: "POST",
                body: JSON.stringify({ "target": targetText }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    if (!resp.ok) {
        throw new Error(await resp.text());
    } 

    return await resp.json();
}
