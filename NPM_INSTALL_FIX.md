# 🔧 Fix: Angular Version Conflict

## 🚨 Problem
NPM is trying to install different patch versions of Angular packages:
- `@angular/core@20.3.13` (already installed)
- `@angular/forms@20.3.15` (trying to install)

This causes a peer dependency conflict.

## ✅ Solution

### Option 1: Use --legacy-peer-deps (Recommended)

Run this command in your project root:

```bash
npm install --legacy-peer-deps
```

This tells npm to ignore peer dependency conflicts and install packages anyway. This is safe for Angular projects where minor patch version differences don't cause issues.

### Option 2: Delete lock files and reinstall

If Option 1 doesn't work, try this:

```bash
# Delete package-lock.json
del package-lock.json

# Delete node_modules folder
rmdir /s /q node_modules

# Install with --legacy-peer-deps
npm install --legacy-peer-deps
```

### Option 3: Use exact versions

If you want all packages at exactly the same version, I can update package.json to use exact versions instead of `~20.3.0`.

---

## 🎯 Quick Fix Command

**Just run this in PowerShell:**

```powershell
cd E:\Projects\MedsoftX\hospital-management-system
npm install --legacy-peer-deps
```

---

## 📝 Why This Happens

The `~` in version numbers (like `~20.3.0`) allows npm to install any patch version (20.3.x). Sometimes different packages pull different patch versions, causing conflicts. Using `--legacy-peer-deps` tells npm to be more lenient with these conflicts.

---

## ✅ After Installation

Once `npm install --legacy-peer-deps` succeeds, run:

```bash
nx serve hms
```

Your appointment booking calendar and all features will be ready to use!

---

## 🆘 If Still Having Issues

Try this nuclear option:

```bash
# Clean npm cache
npm cache clean --force

# Delete everything
del package-lock.json
rmdir /s /q node_modules

# Reinstall
npm install --legacy-peer-deps
```

---

**Status**: Ready to fix
**Action**: Run `npm install --legacy-peer-deps`
**Time**: ~2-3 minutes

