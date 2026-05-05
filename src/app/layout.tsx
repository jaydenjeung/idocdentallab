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
    default: "IDOC Dental Lab — Precision Dental Prosthetics",
    template: "%s | IDOC Dental Lab",
  },
  description:
    "Full-service dental laboratory in Orange, CA. In-house CAD/CAM milling, 3D printing, and digital workflows. Serving 500+ practices nationwide since 2001.",
  keywords: [
    "dental lab",
    "dental laboratory",
    "CAD/CAM",
    "dental crowns",
    "implant prosthetics",
    "California dental lab",
    "Orange CA dental lab",
  ],
  openGraph: {
    title: "IDOC Dental Lab",
    description: "Precision dental prosthetics. People first.",
    url: "https://idocdentallab.com",
    siteName: "IDOC Dental Lab",
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
      <body className={`${dmSerif.variable} ${dmSans.variable} overflow-x-hidden`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}