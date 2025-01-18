"use server";

import { fetchapi } from "@/actions";
import type { Translation } from "@/types";

export async function updateTarget(segmentId: string, translationLang: string, targetId: string | null, targetText: string): Promise<Translation> {
    if (targetId) {
        return fetchapi(`/api/translation/${targetId}`, "PATCH", { target: targetText });
    } else {
        return fetchapi(`/api/segment/${segmentId}/translate/${translationLang}`, "POST", { target: targetText });
    }
}
