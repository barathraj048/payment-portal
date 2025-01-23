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

    // Check if user is authenticated
    if (!session?.user) {
      return "Un-authenticated Request";
    }

    // Generate a secure token
    const token = crypto.randomUUID();

    // Create transaction in database
    await db.onRampTransaction.create({
      data: {
        provider,
        status: "Processing",
        startTime: new Date(),
        token,
        userId: Number(session.user.id), // Ensure userId is a number
        amount: amount * 100, // Convert to smallest currency unit
      },
    });

    return "On-ramp transaction created successfully";
  } catch (error) {
    console.error("Error while creating on-ramp transaction:", error);
    throw error;
  }
};
