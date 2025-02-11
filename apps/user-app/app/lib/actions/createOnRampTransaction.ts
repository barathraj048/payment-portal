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
    console.log(`provider:${provider},amount:${amount}`);
    const session = await getServerSession(authOptions);
    
    if (!session || !provider || !amount) {
      return {
        success: false,
        message: 'Encountering error while processing. Please provide valid info'
      };
    }

    const token = Math.random();
    await db.onRampTransaction.create({
      data: {
        provider,
        status: 'Processing',
        token: token.toString(),
        amount,
        startTime: new Date(),
        userId: session.user.id
      }
    });

    return {
      success: true,
      message: "On-ramp transaction created successfully"
    };

  } catch (error) {
    // Properly handle the error object
    console.error("Error while creating on-ramp transaction:");

    return {
      success: false,
      message: "Failed to create transaction"
    };
  }
};