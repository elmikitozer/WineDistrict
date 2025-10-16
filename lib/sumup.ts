// Minimal SumUp OAuth helper
// You need to define these env vars in .env.local
// SUMUP_CLIENT_ID=...
// SUMUP_CLIENT_SECRET=...
// SUMUP_REDIRECT_URI=http://localhost:3000/api/integrations/sumup/callback

const SUMUP_AUTH_URL = "https://api.sumup.com/authorize";
const SUMUP_TOKEN_URL = "https://api.sumup.com/token";

export function getSumUpAuthorizeUrl(state: string, scope = "transactions.history payments") {
  const clientId = process.env.SUMUP_CLIENT_ID;
  const redirectUri = process.env.SUMUP_REDIRECT_URI;
  if (!clientId || !redirectUri) {
    throw new Error("Missing SUMUP_CLIENT_ID or SUMUP_REDIRECT_URI env vars");
  }
  const url = new URL(SUMUP_AUTH_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scope);
  url.searchParams.set("state", state);
  return url.toString();
}

export async function exchangeCodeForTokens(code: string) {
  const clientId = process.env.SUMUP_CLIENT_ID;
  const clientSecret = process.env.SUMUP_CLIENT_SECRET;
  const redirectUri = process.env.SUMUP_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Missing SUMUP_CLIENT_ID/SUMUP_CLIENT_SECRET/SUMUP_REDIRECT_URI env vars");
  }
  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("code", code);
  body.set("redirect_uri", redirectUri);
  body.set("client_id", clientId);
  body.set("client_secret", clientSecret);

  const res = await fetch(SUMUP_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    // SumUp token endpoint is public on the internet
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SumUp token exchange failed: ${res.status} ${text}`);
  }
  return (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    token_type: string;
    expires_in?: number;
    scope?: string;
  };
}

export async function refreshAccessToken(refreshToken: string) {
  const clientId = process.env.SUMUP_CLIENT_ID;
  const clientSecret = process.env.SUMUP_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Missing SUMUP_CLIENT_ID/SUMUP_CLIENT_SECRET env vars");
  }
  const body = new URLSearchParams();
  body.set("grant_type", "refresh_token");
  body.set("refresh_token", refreshToken);
  body.set("client_id", clientId);
  body.set("client_secret", clientSecret);
  const res = await fetch(SUMUP_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SumUp token refresh failed: ${res.status} ${text}`);
  }
  return (await res.json()) as {
    access_token: string;
    refresh_token?: string;
    token_type: string;
    expires_in?: number;
    scope?: string;
  };
}
