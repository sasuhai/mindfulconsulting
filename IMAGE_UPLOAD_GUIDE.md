# Image Upload Implementation Guide

## API Endpoints Created ✅
- `/api/upload-programs-hero` → saves to `/public/programs-hero.jpg`
- `/api/upload-calendar-hero` → saves to `/public/calendar-hero.png`
- `/api/upload-gallery-hero` → saves to `/public/gallery-hero.jpg`
- `/api/upload-contact-hero` → saves to `/public/contact-hero.jpg`

## For Each Admin Page, Add:

### 1. State Variables (after existing state declarations)
```tsx
const [uploadingImage, setUploadingImage] = useState(false);
const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());
```

### 2. Upload Handler Function (after handleSave function)
```tsx
const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        setMessage('❌ Please select an image file');
        return;
    }

    setUploadingImage(true);
    setMessage('');

    try {
        const formData = new FormData();
        formData.append('file', file);
        
        // CHANGE THIS URL FOR EACH PAGE:
        // Programs: '/api/upload-programs-hero'
        // Calendar: '/api/upload-calendar-hero'
        // Gallery: '/api/upload-gallery-hero'
        // Contact: '/api/upload-contact-hero'
        const response = await fetch('/api/upload-PAGENAME-hero', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Failed to upload image');
        }
        
        setImageRefreshKey(Date.now());
        setMessage('✅ Hero image uploaded successfully!');
    } catch (error) {
        console.error('Error uploading image:', error);
        setMessage('❌ Failed to upload image. Please try again.');
    } finally {
        setUploadingImage(false);
    }
};
```

### 3. UI Section (add at the top of the form, after the page title)
```tsx
<div>
    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>
        Hero Background Image
    </label>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ 
            border: '2px dashed #d2d2d7', 
            borderRadius: '8px', 
            padding: '16px',
            background: '#f9f9f9'
        }}>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Current Image:</p>
            <img 
                src={`/IMAGENAME.jpg?${imageRefreshKey}`}
                alt="Hero Background" 
                style={{ 
                    width: '100%', 
                    maxHeight: '200px', 
                    minHeight: '200px',
                    objectFit: 'cover', 
                    borderRadius: '6px',
                    marginBottom: '8px',
                    display: 'block',
                    backgroundColor: '#e5e5e5'
                }} 
            />
            <p style={{ fontSize: '12px', color: '#999' }}>/IMAGENAME.jpg</p>
        </div>

        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                style={{ display: 'none' }}
                id="heroImageUpload"
            />
            <label
                htmlFor="heroImageUpload"
                style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    background: uploadingImage ? '#ccc' : '#3b82f6',
                    color: '#fff',
                    borderRadius: '6px',
                    cursor: uploadingImage ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                }}
            >
                {uploadingImage ? '⏳ Uploading...' : '📤 Upload New Image'}
            </label>
        </div>
    </div>
</div>
```

## Image Names for Each Page:
- **Programs**: `programs-hero.jpg`
- **Calendar**: `calendar-hero.png`
- **Gallery**: `gallery-hero.jpg`
- **Contact**: `contact-hero.jpg`

## Summary
All API endpoints are ready. You just need to add the state, handler, and UI to each admin page following the template above.
