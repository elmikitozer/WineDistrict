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

## SumUp Integration (OAuth)

The WineDistrict application now supports OAuth integration with SumUp to synchronize wine stock data.

### Setup

1. **Register your application with SumUp**:
   - Visit [SumUp Developer Portal](https://developer.sumup.com/)
   - Create a new application
   - Note your Client ID and Client Secret
   - Set the OAuth redirect URI to: `http://localhost:3000/api/integrations/sumup/callback`

2. **Configure environment variables**:
   - Copy `.env.example` to `.env.local`
   - Fill in your SumUp credentials:
     ```bash
     SUMUP_CLIENT_ID=your-sumup-client-id
     SUMUP_CLIENT_SECRET=your-sumup-client-secret
     SUMUP_REDIRECT_URI=http://localhost:3000/api/integrations/sumup/callback
     ```

3. **Run database migrations**:
   ```bash
   npm run db:migrate:dev
   ```

### Using the Integration

1. Log in as a caviste user
2. Navigate to the dashboard at `/dashboard/caviste`
3. Click "Connecter SumUp" in the SumUp Integration section
4. Authorize the application with your SumUp account
5. You'll be redirected back to the dashboard with a success message

The OAuth tokens are securely stored in the database and will be automatically refreshed when needed.

### API Endpoints

We added the following routes for SumUp integration:

- `GET /api/integrations/sumup/connect` → Initiates OAuth flow (requires authentication)
- `GET /api/integrations/sumup/callback?code=...&state=...` → Handles OAuth callback and stores tokens

### Database Schema

The integration uses two new tables:

- `IntegrationConnection`: Stores OAuth tokens and connection metadata
- `ExternalProductMapping`: Maps wine products to external provider IDs (for future use)

### Notes

- Inventory/catalog endpoints are not publicly documented; an API partner program may be required
- This implementation focuses on OAuth/token exchange first
- Future enhancements will include stock import functionality once SumUp API access is confirmed

