import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";
import { error } from "console";



export const GET=async ()=> {
   const session=await getServerSession(authOptions)

   if(session.user){
     return NextResponse.json({
      user:session.user
     })
   }else{
      console.log("user is not loged-in")
   }
}