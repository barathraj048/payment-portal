import { PrismaClient } from "@repo/db/client";
import { NextResponse } from "next/server";

let client =new PrismaClient()

export const GET=async ()=> {
   await client.user.create({
      data:{
         email:"kljsdjvniijkfvnkjvvvnj",
         name:"ieijvfj",
         number:'83449898',
         password:"kncclknlknckjn"

      }
   })
   return NextResponse.json({
      "message":"user is created sucessfully!!..."
   })
}