# Firebase Cloud Functions Setup Complete! 🎉

## ✅ What's Been Set Up

Your contact form now uses **Firebase Cloud Functions** which works perfectly with Firebase Hosting!

---

## 🔧 Setup Steps

### **1. Add Environment Variables to Functions**

You need to copy your email credentials to the functions directory:

```bash
cd functions
echo "EMAIL_USER=mindfulconsulting.my@gmail.com" > .env
echo "EMAIL_PASSWORD=your-gmail-app-password" >> .env
```

**Or manually create** `functions/.env`:
```env
EMAIL_USER=mindfulconsulting.my@gmail.com
EMAIL_PASSWORD=your-gmail-app-password-here
```

### **2. Deploy the Cloud Function**

```bash
firebase deploy --only functions
```

This will deploy the `sendContactEmail` function to Firebase.

### **3. Test the Contact Form**

After deployment:
1. Go to your live site: https://mindfulconsulting-538b9.web.app/contact
2. Fill in the contact form
3. Click "Send Message"
4. Check your Gmail for the message!

---

## 📁 What Was Created

```
/functions/
├── src/
│   └── index.ts           # Cloud Function for sending emails
├── package.json           # Dependencies (nodemailer, etc.)
├── tsconfig.json          # TypeScript config
└── .env                   # Environment variables (you need to create this)
```

---

## 🔐 Environment Variables

The function needs these variables in `functions/.env`:

```env
EMAIL_USER=mindfulconsulting.my@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
```

**Get your app password from:**
1. Google Account → Security → 2-Step Verification
2. App passwords → Generate
3. Copy the 16-character password
4. Add to `functions/.env`

---

## 🚀 How It Works

### **Development (localhost):**
```
Contact Form → /api/contact → Nodemailer → Gmail
```

### **Production (Firebase):**
```
Contact Form → Cloud Function → Nodemailer → Gmail
```

The contact page automatically detects the environment and uses the correct endpoint!

---

## 📝 Deployment Commands

### **Deploy Everything:**
```bash
npm run build
firebase deploy
```

### **Deploy Only Functions:**
```bash
firebase deploy --only functions
```

### **Deploy Only Hosting:**
```bash
npm run build
firebase deploy --only hosting
```

---

## ✨ Benefits of Cloud Functions

- ✅ **Works with Firebase Hosting** (static hosting)
- ✅ **Serverless** - No server to maintain
- ✅ **Auto-scaling** - Handles any traffic
- ✅ **Free tier** - 2M invocations/month
- ✅ **Secure** - Environment variables protected
- ✅ **CORS enabled** - Works from your domain

---

## 🎯 Next Steps

1. **Create `functions/.env`** with your email credentials
2. **Deploy functions**: `firebase deploy --only functions`
3. **Test on production**: Visit your live site and send a test message
4. **Check Gmail**: You should receive the email!

---

## 🆘 Troubleshooting

### **Function not deploying:**
- Make sure you're in the project root directory
- Run `firebase login` if needed
- Check `functions/.env` exists with correct values

### **Email not sending:**
- Check Firebase Console → Functions → Logs
- Verify Gmail app password is correct
- Make sure 2FA is enabled on Gmail
- Check spam folder

### **CORS errors:**
- The function has CORS enabled by default
- If issues persist, check browser console

---

**🎉 Your contact form is ready to work on Firebase!**

Just add the `.env` file and deploy!
