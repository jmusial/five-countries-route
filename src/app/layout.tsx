import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const OG_IMAGE =
  "https://d2exd72xrrp1s7.cloudfront.net/www/1e/1egfo8mnlin0knrtbr51tka53v9aq0pc-p175678407-full/17b2ad11817?width=1200&crop=false&q=70";

export const metadata: Metadata = {
  title: "Let's Go Slovenia! | Ljubljana → Rijeka Bikepacking",
  description:
    "2 weeks, ~550 km, 3 countries. Julian Alps, Soča Valley, Trieste, Parenzana trail, and the Adriatic coast. Late May 2026.",
  openGraph: {
    title: "Let's Go Slovenia! | Ljubljana → Rijeka Bikepacking",
    description:
      "2 weeks, ~550 km, 3 countries. Julian Alps, Soča Valley, Trieste, Parenzana trail, and the Adriatic coast. Late May 2026.",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Bikepacking through Slovenia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Let's Go Slovenia! | Ljubljana → Rijeka Bikepacking",
    description:
      "2 weeks, ~550 km, 3 countries. Julian Alps, Soča Valley, Trieste, Parenzana trail, and the Adriatic coast.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
