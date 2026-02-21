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

export const metadata: Metadata = {
  metadataBase: new URL("https://five-countries-route.jmusial.dev"),
  title: "Five Countries Route | Villach → Bratislava Bikepacking",
  description:
    "821 km across 5 countries in 14 days. Austria, Slovenia, Croatia, Hungary, Slovakia — Villach to Bratislava by bike. Late May 2026.",
  openGraph: {
    title: "Five Countries Route | Villach → Bratislava Bikepacking",
    description:
      "821 km across 5 countries in 14 days. Austria, Slovenia, Croatia, Hungary, Slovakia — Villach to Bratislava by bike. Late May 2026.",
    type: "website",
    url: "https://five-countries-route.jmusial.dev",
    siteName: "Five Countries Route",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Five Countries Route — Villach to Bratislava bikepacking",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Five Countries Route | Villach → Bratislava Bikepacking",
    description:
      "821 km across 5 countries in 14 days. Austria, Slovenia, Croatia, Hungary, Slovakia — Villach to Bratislava by bike.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Five Countries Route — Villach to Bratislava bikepacking",
      },
    ],
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
