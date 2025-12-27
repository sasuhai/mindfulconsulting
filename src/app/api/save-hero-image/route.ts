import { NextRequest, NextResponse } from 'next/server';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
    try {
        // Get the download URL from Firebase Storage
        const storageRef = ref(storage, 'hero.png');
        const downloadURL = await getDownloadURL(storageRef);

        // Download the image
        const response = await fetch(downloadURL);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Save to public folder
        const publicPath = path.join(process.cwd(), 'public', 'hero.png');
        fs.writeFileSync(publicPath, buffer);

        return NextResponse.json({ success: true, message: 'Image saved to public folder' });
    } catch (error) {
        console.error('Error saving image:', error);
        return NextResponse.json({ success: false, error: 'Failed to save image' }, { status: 500 });
    }
}
