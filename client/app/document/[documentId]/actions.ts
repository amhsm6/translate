"use server";

export async function updateTarget(sourceId: string, targetId: string | null, targetText: string) {
    let resp: Response;
    if (targetId) {
        resp = await fetch(
            process.env.NODE_ENV === "production" ? `${process.env.URL}/api/target/${targetId}/` : `${process.env.API_URL}/api/target/${targetId}/`,
            {
                method: "PUT",
                body: JSON.stringify({ "text": targetText }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    } else {
        resp = await fetch(
            process.env.NODE_ENV === "production" ? `${process.env.URL}/api/source/${sourceId}/translate/` : `${process.env.API_URL}/api/source/${sourceId}/translate/`,
            {
                method: "POST",
                body: JSON.stringify({ "text": targetText }),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    if (resp.ok) { return; }

    console.log(await resp.text());

    // TODO: return and process error
}
