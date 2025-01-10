import NextAuth from "next-auth";
import { authOptions } from "../../../lib/auth";

const handiler= NextAuth(authOptions)

export {handiler as GET,handiler as POST}

