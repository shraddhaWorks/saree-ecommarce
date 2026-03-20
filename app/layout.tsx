import type { Metadata } from "next";
import { CartProvider, WishlistProvider } from "@/components/cart";
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
      <body>
        <WishlistProvider>
          <CartProvider>{children}</CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
