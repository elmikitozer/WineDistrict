// /lib/csrf.ts
export async function getCsrfToken(): Promise<string> {
  const res = await fetch("/api/csrf", { cache: "no-store" });
  if (!res.ok) throw new Error("CSRF fetch failed");
  const { csrfToken } = await res.json();
  return csrfToken;
}
