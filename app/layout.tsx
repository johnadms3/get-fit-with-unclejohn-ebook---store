import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "./context/ThemeContext"


const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Get Fit With Uncle John",
  description: "Your No-Nonsense guide to getting in the shape you want",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
    <html lang="en">
      <body className={geistSans.className}>
        <ThemeProvider>
        <CartProvider>
          {children}
        </CartProvider>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
