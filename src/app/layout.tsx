import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "iDOC Dental Lab — Precision Dental Prosthetics, Southern California",
    template: "%s | iDOC Dental Lab",
  },
  description:
    "Full-service dental laboratory in Cypress, CA. In-house CAD/CAM milling, 3D printing, and digital workflows. Serving 500+ dental practices since 2001.",
  keywords: [
    "dental lab",
    "dental laboratory",
    "CAD/CAM",
    "dental crowns",
    "implant prosthetics",
    "Southern California dental lab",
    "Cypress CA dental lab",
  ],
  openGraph: {
    title: "iDOC Dental Lab",
    description: "Precision dental prosthetics. People first.",
    url: "https://idocdentallab.com",
    siteName: "iDOC Dental Lab",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSerif.variable} ${dmSans.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}