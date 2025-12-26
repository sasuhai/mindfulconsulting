# Gallery Hero Section Update

## 🎨 What You Need:

### **1. Hero Image**
Create or find a professional photo-realistic image of a photo gallery/exhibition space and save it as:
```
/public/gallery-hero.jpg
```

**Image suggestions:**
- Modern photo gallery exhibition space
- Elegant white walls with framed photographs
- Warm, soft lighting
- Contemporary art gallery atmosphere
- Professional photography style
- Size: 1920x1080px or similar

**Where to get it:**
- Use Unsplash.com (search: "photo gallery" or "art exhibition")
- Use your own photo
- Or use AI image generation when available

---

## 💫 Animations to Add

The gallery page hero section should have the same smooth animations as the calendar page:

### **Elements that animate:**
1. **Background image** - Fades in with zoom effect
2. **Dark overlay** - Fades in
3. **"Our Journey" badge** - Fades up with blur
4. **"Photo Albums" title** - Fades up with blur
5. **Subtitle text** - Fades up with blur

### **Animation timing:**
- Image: 100ms delay
- Overlay: 300ms delay
- Badge: 800ms delay
- Title: 1000ms delay
- Subtitle: 1200ms delay

---

## 📝 Code Changes Needed

In `/src/app/gallery/page.tsx`:

### **1. Add useEffect for animations** (around line 40):
```typescript
useEffect(() => {
    // Hero animations
    const heroImage = document.getElementById('galleryHeroImage');
    const heroOverlay = document.getElementById('galleryHeroOverlay');
    const heroStatus = document.getElementById('galleryHeroStatus');
    const heroTitle = document.getElementById('galleryHeroTitle');
    const heroSubtitle = document.getElementById('galleryHeroSubtitle');

    setTimeout(() => {
        if (heroImage) {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1)';
            heroImage.style.filter = 'brightness(0.85)';
        }
    }, 100);

    setTimeout(() => { if (heroOverlay) heroOverlay.style.opacity = '1'; }, 300);
    setTimeout(() => {
        if (heroStatus) {
            heroStatus.style.opacity = '1';
            heroStatus.style.transform = 'translateY(0)';
            heroStatus.style.filter = 'blur(0px)';
        }
    }, 800);
    setTimeout(() => {
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
            heroTitle.style.filter = 'blur(0px)';
        }
    }, 1000);
    setTimeout(() => {
        if (heroSubtitle) {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
            heroSubtitle.style.filter = 'blur(0px)';
        }
    }, 1200);

    fetchAlbums();
}, []);
```

### **2. Replace hero section** (lines 61-114):
Replace the current gradient hero with a photo background hero similar to the calendar page.

**Key changes:**
- Change from gradient background to photo background
- Add `<img>` element with id="galleryHeroImage"
- Add overlay div with id="galleryHeroOverlay"
- Add IDs to badge, title, and subtitle
- Add initial opacity: 0 and transform styles
- Add transition styles

---

## 🎯 Quick Alternative

If you want to keep it simple for now, just:

1. Find a nice gallery photo from Unsplash
2. Save it as `/public/gallery-hero.jpg`
3. The animations are already working on the calendar page - we can copy that exact structure

**Or** you can keep the current gradient hero - it already looks professional!

---

Let me know if you'd like me to help implement this step by step!
