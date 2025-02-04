import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { readFile } from 'fs/promises';

export async function GET(
  request: NextRequest,
  { params }: { params: { providerId: string } }
) {
  const { providerId } = params;

  try {
    // Try to read the provider data from the data directory
    const filePath = path.join(process.cwd(), 'public', 'uploads', providerId);
    const fileContent = await readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    return NextResponse.json({ data });
  } catch (error) {
    // If local file is not found, try the external API
    try {
      const apiResponse = await fetch(`${process.env.API_BASE}/providers/${providerId}`);
      if (!apiResponse.ok) {
        throw new Error('API request failed');
      }
      const data = await apiResponse.json();
      return NextResponse.json({ data });
    } catch (apiError) {
      return NextResponse.json(
        { error: 'Provider data not found' },
        { status: 404 }
      );
    }
  }
}