import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const royalSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-royal-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rangam Silk Sarees",
  description: "Saree storefront + admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={royalSerif.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

