import { sendContactEmail } from "@/lib/email-service";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest){

    const data = await req.json();

    await sendContactEmail(data.from,data.name,data.subject,data.message);

    return NextResponse.json({
        data:"Found details"
    });

}