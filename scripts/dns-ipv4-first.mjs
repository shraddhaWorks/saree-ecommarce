/**
 * Prefer IPv4 when resolving hostnames (helps when IPv6 DNS is broken and causes ENOTFOUND).
 * Loaded via: node --import ./scripts/dns-ipv4-first.mjs …
 */
import dns from "node:dns";

if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}
