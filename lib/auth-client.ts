export function authHeaders(): HeadersInit {
  // Auth.js stores the session in an HTTP-only cookie. Same-origin fetch calls
  // include that cookie automatically; no Authorization header is required.
  return {};
}
