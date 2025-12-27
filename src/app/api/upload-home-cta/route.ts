import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const publicPath = path.join(process.cwd(), 'public', 'cta_bg.png');
        fs.writeFileSync(publicPath, buffer);

        return NextResponse.json({ success: true, message: 'CTA background image saved successfully' });
    } catch (error) {
        console.error('Error saving CTA background image:', error);
        return NextResponse.json({ success: false, error: 'Failed to save image' }, { status: 500 });
    }
}
