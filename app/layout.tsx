import type { Metadata } from "next";
import { CartProvider, WishlistProvider } from "@/components/cart";
import { StorefrontNavbar } from "@/components/navbar/storefront-navbar";
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
      <body className="antialiased">
        <WishlistProvider>
          <CartProvider>
            <StorefrontNavbar />
            <div className="animate-page-entrance">
              {children}
            </div>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
