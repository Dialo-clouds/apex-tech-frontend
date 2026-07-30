// Helper to get the cookie on the client side (with safe parsing)
export function getToken(): string | null {
  if (typeof window === 'undefined') return null; // Safety check for SSR

  const match = document.cookie.match(/apex_token=([^;]+)/);
  return match ? match[1] : null;
}

// Helper to get the user email from cookie
export function getEmail(): string | null {
  if (typeof window === 'undefined') return null;

  const match = document.cookie.match(/apex_email=([^;]+)/);
  return match ? match[1] : null;
}

// Helper to clear the token (logout)
export function clearToken() {
  document.cookie = 'apex_token=; path=/; max-age=0';
  document.cookie = 'apex_email=; path=/; max-age=0';
}