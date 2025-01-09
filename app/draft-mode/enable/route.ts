import { NextRequest } from "next/server";
import { client } from "@/sanity/lib/client";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { validatePreviewUrl } from "@sanity/preview-url-secret"

const token = process.env.SANITY_API_READ_TOKEN

export async function GET(request: NextRequest) {
    const { isValid, redirectTo = "/" } = await validatePreviewUrl(
        client.withConfig({ token }),
        request.url,
    );

    if (!isValid) {
        return new Response("Invalid Secret", { status: 400 });
    }

    await (await draftMode()).enable();

    return redirect(redirectTo);
}
