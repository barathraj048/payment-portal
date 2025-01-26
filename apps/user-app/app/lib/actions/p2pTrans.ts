'use server'

import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
export const P2pTrans = async ({number, amount}: {
   number: string,
   amount: number
}) => {
   const session = await getServerSession(authOptions)

   if (!session) {
      return { message: 'Unauthenticated Access' }
   }

   const sender = await prisma.user.findFirst({
      where: { id: Number(session.user.id) }
   })

   const receiver = await prisma.user.findFirst({
      where: { number }
   })

   if (!sender || !receiver) {
      return { message: 'Invalid sender or receiver' }
   }

   const senderBalance = await prisma.balance.findUnique({
      where: { userId: sender.id }
   })

   const receiverBalance = await prisma.balance.findUnique({
      where: { userId: receiver.id }
   })

   if (!senderBalance || !receiverBalance) {
      return { message: 'Invalid balance information' }
   }

   if (senderBalance.amount < amount * 100) {
      return { message: 'Insufficient balance' }
   }

   try {
      await prisma.$transaction([
         prisma.balance.update({
            where: { id: senderBalance.id },
            data: { amount: { decrement: amount * 100 } }
         }),
         prisma.balance.update({
            where: { id: receiverBalance.id },
            data: { amount: { increment: amount * 100 } }
         })
      ])

      return { message: 'Transaction successful' }
   } catch(error) {
      console.error('Error in P2P transaction', error)
      return { message: 'Transaction failed' }
   }
}