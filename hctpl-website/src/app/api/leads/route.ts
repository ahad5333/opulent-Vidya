import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const leadsFilePath = path.join(process.cwd(), 'data', 'leads.json');

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const valid = payload && payload.name && payload.email && payload.language && payload.createdAt;
    if (!valid) {
      return NextResponse.json({ success: false, message: 'Invalid lead payload' }, { status: 400 });
    }

    await fs.mkdir(path.dirname(leadsFilePath), { recursive: true });

    const fileContents = await fs.readFile(leadsFilePath, 'utf-8').catch(() => '[]');
    const leads = Array.isArray(JSON.parse(fileContents)) ? JSON.parse(fileContents) : [];

    leads.push({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || 'Not provided',
      language: payload.language,
      source: payload.source || 'Chatbot',
      createdAt: payload.createdAt
    });

    await fs.writeFile(leadsFilePath, JSON.stringify(leads, null, 2), 'utf-8');

    return NextResponse.json({ success: true, message: 'Lead saved successfully' });
  } catch (error) {
    console.error('Lead creation failed:', error);
    return NextResponse.json({ success: false, message: 'Could not save lead' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const fileContents = await fs.readFile(leadsFilePath, 'utf-8').catch(() => '[]');
    const leads = Array.isArray(JSON.parse(fileContents)) ? JSON.parse(fileContents) : [];
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Lead read failed:', error);
    return NextResponse.json([], { status: 500 });
  }
}
