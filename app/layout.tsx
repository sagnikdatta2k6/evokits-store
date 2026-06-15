import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import JerseyModal from "@/components/JerseyModal";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EVOKITS — Authentic Football Jerseys | Premium Quality, Best Prices",
  description:
    "EVOKITS brings football fans closer to the game with authentic jerseys from teams around the world. Premium quality at unbeatable prices. Founded by Arnesh Jana & Samanway Roy.",
  keywords: [
    "football jerseys",
    "authentic jerseys",
    "EVOKITS",
    "football kits",
    "soccer jerseys",
    "premium jerseys",
  ],
  authors: [{ name: "Arnesh Jana" }, { name: "Samanway Roy" }],
  openGraph: {
    title: "EVOKITS — Authentic Football Jerseys",
    description:
      "Premium football jerseys from teams around the world. Unbeatable quality and prices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`}>
      <body>
        <Navbar />
        <JerseyModal />
        <main className="main-content">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
