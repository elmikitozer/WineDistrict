This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## SumUp Integration (OAuth scaffold)

We added minimal routes to kick off a SumUp OAuth flow without persisting tokens yet:

- GET `/api/integrations/sumup/connect?cavisteId=123` → redirects to SumUp authorization URL.
- GET `/api/integrations/sumup/callback?code=...&state=...` → exchanges code for tokens and returns JSON.

Required env vars in `.env.local`:

```bash
SUMUP_CLIENT_ID=...
SUMUP_CLIENT_SECRET=...
SUMUP_REDIRECT_URI=http://localhost:3000/api/integrations/sumup/callback
```

Notes:
- Inventory/catalog endpoints are not publicly documented; an API partner program may be required. This scaffold focuses on OAuth/token exchange first.
- Next steps: persist tokens into `IntegrationConnection`, implement a `SumUpProvider` to call inventory/catalog endpoints if available, or fall back to a manual import.
