# EchoFeed Landing Page

React + Vite conversion of the EchoFeed landing page, ready to deploy on Vercel.

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
vercel
```

### Option B — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy** ✓

## Connecting a Real Waitlist Backend

The `SignupForm` component in `src/App.jsx` logs emails to the console by default.
To capture real signups, replace the `console.log` line (~line 90) with a `fetch` call:

```js
await fetch("/api/waitlist", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: trimmed }),
});
```

Popular options: [Resend](https://resend.com), [Loops](https://loops.so), [ConvertKit](https://convertkit.com), or a simple Vercel serverless function.
