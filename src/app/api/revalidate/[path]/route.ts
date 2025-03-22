import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,

    {params}:{params:Promise<{path:string}>}
){

    const {path} = await params;

    if(path === "index"){
        console.log(path)
        revalidatePath("/");
    }else{
        revalidatePath(path);
    }

    return NextResponse.json({
        message:`${path} was revalidated`
    });

}