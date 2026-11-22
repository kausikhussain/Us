# K & N — DEPLOYMENT & HOSTING GUIDE
*Deploying Your Private Digital Keepsake Safely*

---

## 1. QUICK START (LOCAL RUN)

To run the experience locally on your machine:
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. PRODUCTION BUILD & VERIFICATION

To verify the production build and test suites:
```bash
# 1. Run typecheck & production build
npm run build

# 2. Start production server locally
npm run start

# 3. Run automated tests (Playwright & Unit tests)
npm run test
```

---

## 3. DEPLOYING TO VERCEL (RECOMMENDED)

Vercel is the recommended hosting platform for Next.js:

1. Push this repository to a **Private** GitHub repository.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your private repository.
4. Framework Preset: **Next.js**.
5. Click **Deploy**.
6. In **Settings → Deployment Protection**, you can optionally enable Vercel Authentication or Password Protection for an additional security perimeter.

---

## 4. SECURING WITH PASSWORD ACCESS GATE

Before sharing the link with your partner:
1. Open `/content/site.ts`.
2. Set `enablePasscodeGate: true`.
3. Set `accessPasscode: "YOUR_SECRET_CODE"` (e.g. your anniversary date `23112020` or a private inside word).
4. Deploy the update. The website will require this code before revealing intimate letters and memories.

---

## 5. PERMANENT OFFLINE ARCHIVAL (USB KEEPSAKE)

If you wish to preserve K & N permanently as an offline physical gift (e.g., on a luxury engraved USB drive or private local drive):
1. In `next.config.js`, set `output: 'export'`.
2. Run `npm run build`.
3. The resulting `/out` directory contains a 100% self-contained static website that can be opened locally in any modern browser without an active internet connection.
