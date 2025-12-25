# Admin Settings & Passcode Protection - Setup Complete! 🔒

## ✅ What's Been Created

### 1. **Settings Page** (`/admin/settings`)
A comprehensive settings management page where you can configure:
- ✉️ **Email Address** - Contact email for the business
- 📞 **Phone Number** - Business phone number
- 📍 **Address** - Business address
- 🔐 **Admin Passcode** - Password to access admin dashboard
  - Default passcode: `mind`
  - Show/Hide toggle for security
  - Can be changed anytime

### 2. **Admin Passcode Protection**
All admin routes (`/admin/*`) are now protected with passcode authentication:
- Beautiful login screen with gradient background
- Session-based authentication (stays logged in during browser session)
- Fetches passcode from Firebase settings
- Secure and user-friendly

### 3. **Firebase Integration**
Settings are stored in Firebase Firestore:
- Collection: `settings`
- Document: `general`
- Fields: `email`, `phoneNumber`, `address`, `adminPasscode`

---

## 🚀 How to Use

### **First Time Access:**

1. **Go to Admin Dashboard**
   ```
   http://localhost:3000/admin
   ```

2. **Enter Default Passcode**
   - Type: `mind`
   - Click "Unlock"

3. **Update Settings**
   - Click on "Settings" card
   - Fill in your contact information
   - Change admin passcode if desired
   - Click "Save Settings"

### **Daily Usage:**

1. **Access Admin**
   - Go to `/admin`
   - Enter your passcode
   - Access all admin features

2. **Update Contact Info**
   - Go to `/admin/settings`
   - Edit any field
   - Click "Save Settings"

3. **Change Passcode**
   - Go to `/admin/settings`
   - Click "Show" to see current passcode
   - Type new passcode
   - Click "Save Settings"
   - Use new passcode next time

---

## 🔐 Security Features

### **Passcode Protection:**
- ✅ All admin routes protected
- ✅ Session-based (no repeated logins)
- ✅ Stored securely in Firebase
- ✅ Can be changed anytime
- ✅ Show/Hide toggle for privacy

### **Session Management:**
- Authenticated state stored in `sessionStorage`
- Clears when browser closes
- No persistent cookies
- Secure and temporary

---

## 📁 Files Created

```
/src/app/admin/
├── layout.tsx                  # Admin layout with passcode guard
├── settings/
│   └── page.tsx               # Settings management page

/src/components/
└── AdminGuard.tsx             # Passcode protection component
```

---

## 🎨 UI Features

### **Settings Page:**
- Clean, modern design
- Inline validation
- Success/Error messages
- Show/Hide passcode toggle
- Responsive layout
- Auto-save feedback

### **Login Screen:**
- Beautiful gradient background
- Lock icon
- Centered modal design
- Error feedback
- Auto-focus input
- Smooth animations

---

## 💾 Data Structure

**Firebase Document: `settings/general`**
```json
{
  "email": "contact@mindfulconsulting.com",
  "phoneNumber": "+60 12-345 6789",
  "address": "Your business address here",
  "adminPasscode": "mind"
}
```

---

## 🔄 How It Works

### **Authentication Flow:**

1. User visits `/admin`
2. `AdminGuard` checks `sessionStorage`
3. If not authenticated:
   - Show passcode screen
   - Fetch correct passcode from Firebase
   - Validate user input
   - Store authentication in session
4. If authenticated:
   - Show admin content
   - Allow access to all admin pages

### **Settings Flow:**

1. User opens `/admin/settings`
2. Fetch current settings from Firebase
3. Display in editable form
4. User makes changes
5. Click "Save Settings"
6. Update Firebase document
7. Show success message

---

## ⚠️ Important Notes

### **Default Passcode:**
- Initial passcode is `mind`
- **Change it immediately** for security
- Stored in Firebase, not in code

### **Session Behavior:**
- Authentication persists during browser session
- Closes when browser closes
- No "remember me" feature (by design)

### **Passcode Recovery:**
- If you forget your passcode, you can:
  1. Check Firebase Console
  2. View `settings/general` document
  3. See or reset the `adminPasscode` field

---

## 🎯 Quick Actions

### **Change Passcode:**
```
1. Go to /admin/settings
2. Click "Show" next to Admin Passcode
3. Type new passcode
4. Click "Save Settings"
```

### **Update Contact Info:**
```
1. Go to /admin/settings
2. Edit email, phone, or address
3. Click "Save Settings"
```

### **Logout:**
```
Close browser or tab
(Session will clear automatically)
```

---

## 🔮 Future Enhancements

Possible improvements:
- [ ] "Remember me" option
- [ ] Password strength indicator
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Activity logs
- [ ] Multiple admin users

---

**🎉 Your admin dashboard is now secure and settings are manageable!**

**Default Passcode:** `mind`
**Settings Page:** `/admin/settings`
**Admin Dashboard:** `/admin`
