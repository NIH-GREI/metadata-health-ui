import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { writeFile, readFile } from 'fs/promises';
import { mkdir } from 'fs/promises';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    // Ensure the upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Save file
    const filePath = path.join(uploadDir, file.name);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, fileBuffer);

    // Also save the data to enable API access
    const jsonData = JSON.parse(fileBuffer.toString());
    const apiDataPath = path.join(process.cwd(), 'data', 'providers');
    await mkdir(apiDataPath, { recursive: true });
    await writeFile(
      path.join(apiDataPath, `${file.name}`),
      JSON.stringify(jsonData, null, 2)
    );

    return NextResponse.json({
      message: 'File uploaded',
      filePath: `/uploads/${file.name}`,
      providerId: file.name
    });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}