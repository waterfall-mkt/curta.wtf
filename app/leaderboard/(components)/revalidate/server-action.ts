'use server';

import { revalidatePath } from 'next/cache';

export default async function action(lastUpdated: Date) {
  if (lastUpdated.getTime() <= Date.now() - 60_000) {
    revalidatePath('/leaderboard');
  }
}
