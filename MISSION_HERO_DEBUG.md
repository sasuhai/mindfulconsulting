# Mission Page Troubleshooting

## Issue
Hero section appears blank after loading

## Checklist

1. **Check if image loads**:
   - Open: `http://localhost:3000/mission-hero.png`
   - Should show the hero image

2. **Check browser console**:
   - Press F12 or right-click > Inspect
   - Go to Console tab
   - Look for any errors (red text)

3. **Check if content is there but invisible**:
   - Right-click on the blank hero area
   - Click "Inspect Element"
   - Look for the `<section>` with the hero content
   - Check if the `<img>` tag is there
   - Check the computed styles

4. **Common issues**:
   - Image not loading (404 error)
   - Z-index stacking issue
   - CSS conflict
   - Animation not triggering

## Quick Fix
If the sections below the hero are showing correctly, the data is fine. The issue is likely:
- Image path
- CSS/styling
- Animation timing

Try refreshing with Cmd+Shift+R (hard refresh) to clear cache.
