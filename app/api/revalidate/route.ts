import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');
  const pathToRevalidate = req.headers.get('x-path-to-revalidate');

  if (apiKey !== process.env.CURTA_SITE_API_KEY) {
    return NextResponse.json({ error: { message: 'Unauthorized.' } }, { status: 401 });
  }

  if (!pathToRevalidate || typeof pathToRevalidate !== 'string') {
    return NextResponse.json(
      { error: { message: 'Missing path to revalidate.' } },
      { status: 400 },
    );
  }

  try {
    revalidatePath(pathToRevalidate);
    return NextResponse.json({ revalidated: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Error validating.' }, { status: 500 });
  }
}
