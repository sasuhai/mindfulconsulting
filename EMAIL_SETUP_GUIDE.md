# Email Setup Guide for Contact Form

## ✅ Contact Form Now Sends Direct Emails!

The contact form now sends emails directly to **mindfulconsulting.my@gmail.com** instead of storing in Firebase.

---

## 🔧 Setup Required

### **1. Gmail App Password Setup**

To send emails from your Gmail account, you need to create an **App Password**:

#### **Steps:**
1. Go to your Google Account: https://myaccount.google.com/
2. Click **Security** in the left menu
3. Under "How you sign in to Google", enable **2-Step Verification** (if not already enabled)
4. After enabling 2FA, go back to **Security**
5. Under "How you sign in to Google", click **App passwords**
6. Select:
   - **App**: Mail
   - **Device**: Other (Custom name) → Type "Mindful Consulting Website"
7. Click **Generate**
8. **Copy the 16-character password** (you won't see it again!)

---

### **2. Add to .env.local**

Add these two lines to your `.env.local` file:

```env
# Email Configuration
EMAIL_USER=mindfulconsulting.my@gmail.com
EMAIL_PASSWORD=your-16-character-app-password-here
```

**Example:**
```env
EMAIL_USER=mindfulconsulting.my@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

---

### **3. Restart Dev Server**

After adding the environment variables:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 📧 How It Works

### **User Flow:**
1. User fills contact form on `/contact`
2. Clicks "Send Message"
3. Form validates (name, email, message required)
4. Sends POST request to `/api/contact`
5. API sends email to `mindfulconsulting.my@gmail.com`
6. Success modal shows: "We'll get back to you at [email] soon"

### **Email Content:**
- **To**: mindfulconsulting.my@gmail.com
- **From**: mindfulconsulting.my@gmail.com
- **Reply-To**: User's email (so you can reply directly)
- **Subject**: "New Contact Form Message from [Name]"
- **Body**: Formatted HTML with name, email, and message

---

## 🎯 Email Template

The email you receive will look like:

```
New Contact Form Submission
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: John Doe
Email: john@example.com

Message:
┌─────────────────────────────────────┐
│ I'm interested in your leadership   │
│ development programs. Can we         │
│ schedule a consultation?             │
└─────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This message was sent from the Mindful Consulting website contact form.
Reply directly to: john@example.com
```

---

## ✅ Testing

### **Test the Contact Form:**

1. Go to `http://localhost:3000/contact`
2. Fill in:
   - Name: Test User
   - Email: your-test-email@gmail.com
   - Message: This is a test message
3. Click "Send Message"
4. Check `mindfulconsulting.my@gmail.com` inbox
5. You should receive the email!

---

## 🔒 Security Notes

### **Important:**
- ✅ App password is different from your Gmail password
- ✅ App password only works for this specific app
- ✅ You can revoke it anytime from Google Account settings
- ✅ Never commit `.env.local` to git (already in `.gitignore`)
- ✅ For production, add same variables to your hosting platform (Vercel, etc.)

### **Production Deployment:**

When deploying to production (e.g., Vercel):

1. Go to your project settings
2. Add Environment Variables:
   - `EMAIL_USER` = mindfulconsulting.my@gmail.com
   - `EMAIL_PASSWORD` = your-app-password
3. Redeploy

---

## 🚨 Troubleshooting

### **"Failed to send message" error:**

1. **Check .env.local exists** with correct variables
2. **Restart dev server** after adding env variables
3. **Verify App Password** is correct (16 characters)
4. **Check Gmail settings**:
   - 2FA is enabled
   - App password is active
   - "Less secure app access" is OFF (we use app passwords instead)

### **Email not received:**

1. Check spam/junk folder
2. Verify `EMAIL_USER` matches your Gmail
3. Check Gmail quota (Gmail has sending limits)
4. Check server logs for errors

---

## 📝 Files Modified

```
/src/app/api/contact/route.ts       # Email sending API
/src/app/contact/page.tsx           # Contact form (uses API)
/.env.local                         # Email credentials (you need to add)
```

---

## 🎉 Benefits

### **Why Direct Email > Firebase:**
- ✅ **Instant notification** - Get emails immediately
- ✅ **No admin dashboard needed** - Check your Gmail
- ✅ **Reply directly** - Email has Reply-To set to user's email
- ✅ **Professional** - Proper email formatting
- ✅ **No database costs** - No Firebase storage needed
- ✅ **Spam protection** - Gmail's built-in spam filtering

---

**Need help?** The contact form is ready to use once you add the email credentials to `.env.local`!
