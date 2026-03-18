import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalanjali Frontend Blueprint",
  description: "Frontend structure and component planning for a Kalanjali-inspired storefront clone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
