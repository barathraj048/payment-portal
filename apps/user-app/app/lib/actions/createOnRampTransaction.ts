'use server';

import db from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';

export const CreateOnRampTransaction = async ({
  provider,
  amount,
}: {
  provider: string;
  amount: number;
}) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return { error: "Un-authenticated Request" };
    }

    if (!session?.user) {
      return "Un-authenticated Request";
    }

    const token = (Math.random()*100).toString()
    if(!provider || !amount ){
      return 'invalid provider or amount'
    }

    await db.onRampTransaction.create({
      data: {
        provider ,
        status: "Processing",
        startTime: new Date(),
        token:token,
        userId: Number(session.user.id), 
        amount: amount * 100,
      },
    }
  );

    return "On-ramp transaction created successfully";
  } catch (error) {
    console.log("Error while creating on-ramp transaction:", error);
  }
};
