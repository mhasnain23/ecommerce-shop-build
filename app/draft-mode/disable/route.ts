import { NextRequest, NextResponse } from "next/server";
import { draftMode } from "next/headers";


export async function GET(request: NextRequest) {
    await (await draftMode()).disable();
    return NextResponse.redirect(new URL("/", request.url));

}