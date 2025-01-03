"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getUserFromCookie(){
    const cookiesStore = await cookies();
    const cookie = cookiesStore.get("recipioapp")?.value;

    if(cookie){
        try{
            const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
            return decoded;
        }catch(e){
            return null;
        }
    }
}