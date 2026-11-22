# K & N — PRIVACY & SECURITY GUIDE
*Protecting a Private Personal Gift*

---

## 1. PRIVACY PRINCIPLES

This website is a deeply personal love story, not a public commercial showcase. The privacy and dignity of both individuals are safeguarded by strict engineering protocols:

1. **Zero Search Engine Indexing**:
   - `robots.txt` strictly set to `User-agent: * Disallow: /`.
   - `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />` embedded in the root HTML header.
   - `X-Robots-Tag: noindex, nofollow` HTTP headers served on all routes.
2. **Zero Third-Party Trackers**:
   - No Google Analytics, no Meta Pixel, no Hotjar, no tracking scripts.
   - All fonts (Cormorant Garamond, Inter, scripts) and assets are bundled locally; zero calls to Google Fonts or external CDNs that leak IP addresses.
3. **EXIF Metadata Stripping**:
   - All uploaded photos must have GPS location, device serials, and timestamp EXIF tags stripped prior to deployment.
4. **Access Gate & Password Protection**:
   - Built-in private gate component ensuring only the recipient (holding the secret passcode or personal anniversary key) can unlock and view the intimate letters and gallery.
   - Session-based persistence stored in secure, encrypted browser session memory.

---

## 2. HOW TO ROTATE OR CHANGE THE ACCESS PASSCODE

In your environment or `/content/site.ts`:
```typescript
export const SITE_CONFIG = {
  // Passcode required to enter the private story
  // (Recipient can enter anniversary date "23112020", "231126", or your private word)
  accessPasscode: "23112020",
  enablePasscodeGate: true,
  // ...
};
```

---

## 3. HOW TO TAKE THE WEBSITE DOWN OR ARCHIVE IT

- **Vercel / Netlify**: In the project settings, click **Delete Project** or set to **Password Protected** deployment.
- **Self-Hosted**: Stop the Node process (`pm2 stop k-and-n` or remove container).
- **Offline Archival**: Run `npm run build && npm run export` (or save the repository locally) to preserve a permanent, private offline keepsake on a USB drive.
