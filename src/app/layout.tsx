import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers";
import CartDrawer from "@/components/cart/CartDrawer";
import { Toaster } from "sonner"; // ✅ ADD THIS

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meaning of Quality — Industrial Adhesives & Sealants",
  description:
    "Static B2B company profile with product categories for adhesives, sealants, foams and spray solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />

          {/* ✅ Beautiful alerts live here */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            expand
          />
        </Providers>
      </body>
    </html>
  );
}
