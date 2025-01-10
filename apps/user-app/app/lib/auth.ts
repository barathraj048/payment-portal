import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone number", type: "text", placeholder: "1231231231" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // Check if user exists
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });

        if (!existingUser) {
          const newUser=await db.user.create({
            data:{
              number:credentials.phone,
              password:await bcrypt.hash(credentials.password,10)
            }
          })
          return {
            id: newUser.id.toString(),
            name: newUser.name,
            number: newUser.number,
            email: newUser.email,
          }
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(credentials.password, existingUser.password);
        if (!isValidPassword) {
          throw new Error("Invalid phone number or password.");
        }

        // Return user data
        return {
          id: existingUser.id.toString(),
          name: existingUser.name,
          number: existingUser.number,
          email: existingUser.email,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};