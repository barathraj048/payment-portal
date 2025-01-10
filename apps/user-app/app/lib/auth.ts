import db  from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials: any) {
            const password=await bcrypt.hash(credentials.password, 10)
            let existinguser=await db.user.findFirst({
              where:{
                number:credentials.phone
              }
            })

            if(existinguser){
              let validation=await bcrypt.compare(existinguser.password,password)
              if(validation){
                return {
                  id:existinguser.id.toString(),
                  name:existinguser.name,
                  number:existinguser.number,
                  email:existinguser.email
                }
              }else{
                try{
                  const user=await db.user.create({
                    data:{
                      number:credentials.number,
                      password:credentials.password
                    }
                  })
                  return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.number
                }
                }
                catch(e) {
                  console.error(e);
                  return null
              }
              }
            }
          },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        }
    }
  }
 