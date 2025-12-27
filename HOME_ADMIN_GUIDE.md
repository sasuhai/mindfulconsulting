# Home Page Admin Setup Guide

## Overview
The home page now supports dynamic content editing through the admin dashboard. This guide explains how to set up and use the home page editor.

## Features

### Editable Sections
1. **Hero Section**
   - Badge text
   - Main title
   - Two subtitle paragraphs
   - Button text

2. **Trust Indicators Section**
   - Section heading text
   - (Industry cards are fixed and managed separately)

3. **Training Programs Section**
   - Section title
   - Subtitle
   - (Training programs are managed in the Training Programs admin)

4. **Video Testimonials Section**
   - Video title
   - Description text
   - Closing statement (italic text)

5. **Call to Action Section**
   - CTA title
   - Description text
   - Button text

## Initial Setup

### Option 1: Manual Setup via Firebase Console
1. Go to Firebase Console → Firestore Database
2. Create a collection called `pages`
3. Create a document with ID `home`
4. Add the following fields:

```json
{
  "heroBadge": "Leadership Development",
  "heroTitle": "Growth with Presence",
  "heroSubtitle1": "Mindful Consulting partners with organizations and individuals to develop conscious, effective leadership grounded in presence, clarity, and human connection.",
  "heroSubtitle2": "We believe leadership is not a fixed destination, but a continuous process of growth—shaped by awareness, thoughtful dialogue, and purposeful action. Our work integrates mindfulness with practical business realities, helping leaders navigate complexity while staying grounded, empathetic, and decisive.",
  "heroButtonText": "Our Mission",
  "trustIndicatorsText": "TRUSTED BY LEADING INDUSTRIES",
  "trainingProgramsTitle": "Our Training Programs",
  "trainingProgramsSubtitle": "Tailored programs to elevate your organization's potential.",
  "videoTitle": "The Ten Voices That Define the Experience",
  "videoDescription": "We've asked AI to analyze from thousands of participants to distill the essence of their experience. These are 10 testimonials represent the most powerful and consistent themes that emerge time and again: practical application, masterful facilitation, and profound personal transformation.",
  "videoClosing": "These are their words!",
  "ctaTitle": "Ready to transform your leadership?",
  "ctaDescription": "Join the hundreds of leaders who have elevated their impact with Mindful Consulting.",
  "ctaButtonText": "Request a Proposal"
}
```

### Option 2: Use the Admin Interface
1. Navigate to `/admin/home` in your browser
2. The page will load with default values
3. Click "Save All Changes" to create the initial document in Firebase
4. The content will be saved and immediately reflected on the home page

## How to Edit Content

1. **Access the Admin Panel**
   - Go to `/admin` in your browser
   - Click on the "Home Page" card

2. **Edit Content**
   - Update any text fields as needed
   - All changes are reflected in real-time in the form
   - No need to worry about formatting - the page handles that automatically

3. **Save Changes**
   - Click the "💾 Save All Changes" button at the bottom
   - Wait for the success message
   - Changes will be immediately visible on the home page

4. **Preview Changes**
   - Open the home page in a new tab to see your changes
   - Refresh the page if needed

## Technical Details

### Data Structure
- **Collection**: `pages`
- **Document ID**: `home`
- **Fields**: 14 text fields (see above)

### File Locations
- **Admin Page**: `/src/app/admin/home/page.tsx`
- **Home Page**: `/src/app/page.tsx`
- **Admin Dashboard**: `/src/app/admin/page.tsx`

### How It Works
1. The home page fetches content from Firebase on load
2. If no content exists, it uses default fallback values
3. The admin page allows editing all fields
4. Changes are saved to Firebase and immediately reflected on the home page

## Notes

- **Industry Cards**: The industry logos and labels (Oil & Gas, Finance, etc.) are fixed and cannot be edited through this interface
- **Training Programs**: The actual training program cards are managed through the "Training Programs" admin section
- **Video**: The YouTube video ID is hardcoded in the page. To change the video, you'll need to edit the page code directly
- **Images**: Background images and logos are static files and cannot be changed through the admin interface

## Troubleshooting

### Content Not Showing
- Check Firebase Console to ensure the `pages/home` document exists
- Check browser console for any errors
- Ensure you're logged in with proper Firebase permissions

### Changes Not Saving
- Check your internet connection
- Verify Firebase permissions
- Check browser console for error messages

### Default Content Showing
- This means the Firebase document doesn't exist yet
- Use Option 2 above to create it by saving from the admin interface

## Future Enhancements

Potential improvements for the future:
- Image upload capability for hero background
- Video URL editor
- Industry cards editor
- Preview mode before saving
- Version history
- Undo/redo functionality
