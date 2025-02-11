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

  try {
     const transaction = await prisma.$transaction(async (prisma) => {

      await prisma.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session?.user?.id)} FOR UPDATE`;

        const sender = await prisma.user.findFirst({
           where: { id: Number(session.user.id) }
        })

        const receiver = await prisma.user.findFirst({
           where: { number }
        })

        if (!sender || !receiver) {
           return('Invalid sender or receiver')
        }

        const senderBalance = await prisma.balance.findUnique({
           where: { userId: sender.id }
        })

        const receiverBalance = await prisma.balance.findUnique({
           where: { userId: receiver.id }
        })

        if (!senderBalance || !receiverBalance) {
           return('Invalid balance information')
        }

        if (senderBalance.amount < amount * 100) {
           return('Insufficient balance')
        }

        await prisma.balance.update({
           where: { id: senderBalance.id },
           data: { amount: { decrement: amount * 100 } }
        })

        await prisma.balance.update({
           where: { id: receiverBalance.id },
           data: { amount: { increment: amount * 100 } }
        })

        return { message: 'Transaction successful' }
     })

     return transaction
  } catch(error) {
     return { 
        message: error instanceof Error ? error.message : 'Transaction failed' 
     }
  }
}