'use server';

import db from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';

export const CreateOnRampTransaction = async ({
  provider,
  amount,
}: {
  provider: any;
  amount: number;
}) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return "Un-authenticated Request";
    }

    const token = (Math.random()*100).toString()

    await db.onRampTransaction.create({
      data: {
        provider,
        status: "Processing",
        startTime: new Date(),
        token,
        userId: Number(session.user.id), 
        amount: amount * 100,
      },
    });

    return "On-ramp transaction created successfully";
  } catch (error) {
    console.error("Error while creating on-ramp transaction:", error);
    throw error;
  }
};
