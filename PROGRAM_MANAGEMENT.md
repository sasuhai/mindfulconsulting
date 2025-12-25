# Program Pages Management System

## Overview
This system allows you to dynamically edit the content of the three program pages:
- Leadership Development (`/programs/leadership`)
- Executive Coaching (`/programs/executive`)
- Team Effectiveness (`/programs/team`)

All content is stored in Firebase and can be edited through an admin interface.

## Setup Instructions

### 1. Access the Admin Panel
Navigate to `/admin/programs` in your browser

### 2. Seed Initial Data (REQUIRED - First Time Only)
- Click the **"🌱 Seed Initial Data"** button
- This will transfer all the hardcoded data from your three program pages into Firebase
- **You MUST do this before the program pages will work**
- You only need to do this once

### 3. Verify Data
After seeding, you should see three program cards:
- Leadership Development
- Executive Coaching
- Team Effectiveness

## How to Edit Programs

### 1. Select a Program
Click **"Edit Program"** on any of the three program cards

### 2. Edit Content
A modal will open with all editable fields organized into sections:

#### **Hero Section**
- **Title**: Main page heading (e.g., "Leadership Development")
- **Badge Text**: Category badge with emoji (e.g., "🎯 Professional Development")
- **Hero Description**: Subtitle/tagline below the title
- **Primary CTA Button Text**: Text for the main call-to-action button

#### **Stats Section** (4 items)
- **Value**: The number or metric (e.g., "3-6", "100%", "24/7")
- **Label**: Description of the stat (e.g., "Months Duration", "Customizable")

#### **Main Content Section**
- **Section Title**: Heading for the main content area
- **Section Description**: Paragraph describing the program

#### **Features Section** (6 items)
- **Features Title**: Section heading (e.g., "What You'll Learn", "Coaching Focus Areas")
- For each feature:
  - **Icon**: Emoji icon
  - **Title**: Feature name
  - **Description**: Brief explanation

#### **Details Section** (3 items)
- **Details Title**: Section heading (e.g., "Program Details")
- For each detail:
  - **Icon**: Emoji icon
  - **Label**: Detail category (e.g., "Duration", "Format")
  - **Value**: Detail value (e.g., "3-6 months", "In-person & Virtual")

#### **Call-to-Action Section**
- **CTA Title**: Final section heading
- **CTA Description**: Compelling text to encourage action
- **CTA Button Text**: Text for the final CTA button

### 3. Save Changes
- Click **"Save Changes"** to update the program
- Changes are immediately reflected on the public-facing program pages
- No page refresh needed - just navigate to the program page to see updates

## Data Structure

### Firebase Collection
- **Collection**: `programs`
- **Documents**: 
  - `leadership` - Leadership Development program
  - `executive` - Executive Coaching program
  - `team` - Team Effectiveness program

### Document Fields
Each program document contains:
```typescript
{
  programId: string;           // 'leadership', 'executive', or 'team'
  title: string;               // Page title
  badge: string;               // Badge text with emoji
  heroDescription: string;     // Hero subtitle
  heroGradient: string;        // CSS gradient (auto-set, don't edit)
  primaryCTA: string;          // Primary button text
  stats: Array<{               // 4 stats
    value: string;
    label: string;
  }>;
  sectionTitle: string;        // Main section heading
  sectionDescription: string;  // Main section text
  featuresTitle: string;       // Features section heading
  features: Array<{            // 6 features
    icon: string;
    title: string;
    description: string;
  }>;
  detailsTitle: string;        // Details section heading
  details: Array<{             // 3 details
    label: string;
    value: string;
    icon: string;
  }>;
  ctaTitle: string;            // CTA heading
  ctaDescription: string;      // CTA text
  ctaButtonText: string;       // CTA button text
}
```

## Features

✅ **Reverse Process**: Existing page data automatically transferred to Firebase  
✅ **Same Structure**: All 3 programs use identical data structure  
✅ **Easy Editing**: User-friendly interface organized by sections  
✅ **Real-time Updates**: Changes immediately visible on public pages  
✅ **Loading States**: Graceful loading and error handling  
✅ **Premium Design**: Maintains all visual styling and animations  

## Troubleshooting

### "Program data not found" Error
- Go to `/admin/programs`
- Click "Seed Initial Data"
- Wait for success message
- Refresh the program page

### Changes Not Showing
- Clear browser cache
- Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check browser console for errors

### Firebase Permission Errors
- Ensure Firestore rules allow read/write to `programs` collection
- Check that Firebase is properly configured in `/lib/firebase.ts`

## Tips

- **Emojis**: Use native emojis for icons (copy from emojipedia.org)
- **Text Length**: Keep descriptions concise for better mobile display
- **Consistency**: Maintain similar structure across all three programs
- **Preview**: Always check the public page after making changes
