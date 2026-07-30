import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Newsletter from "@/components/ui/Newsletter";
import CookieConsent from "@/components/ui/CookieConsent";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-playfair" });

export const metadata: Metadata = { 
  title: "ApexTech | Luxury Tech", 
  description: "The future of gadgets." 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased bg-[#0A0A0A] text-white font-sans">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        <div className="max-w-7xl mx-auto px-6">
          <Newsletter />
        </div>
        <CookieConsent />
      </body>
    </html>
  );
}