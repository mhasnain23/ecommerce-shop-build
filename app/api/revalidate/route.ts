import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Handler for POST requests
export async function POST(req: NextRequest) {
    try {
        // Parse the request body and validate the signature
        const { body, isValidSignature } = await parseBody<{
            _type: string;
            slug?: string | undefined;
        }>(req, process.env.SANITY_HOOK_SECRET);

        // If the signature is invalid, respond with 401 Unauthorized
        if (!isValidSignature) {
            return new Response("Invalid Signature", { status: 401 });
        }

        // If the type is missing, respond with 400 Bad Request
        if (!body?._type) {
            return new Response("Bad Request", { status: 400 });
        }

        // Revalidate the cache for the given tag
        revalidateTag(body._type);
        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            body,
        });
    } catch (error: any) {
        // Log the error and respond with 500 Internal Server Error
        console.error(error);
        return new Response(error.message, { status: 500 });
    }
}