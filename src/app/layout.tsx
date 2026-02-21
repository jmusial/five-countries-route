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
  "https://s3.ap-southeast-2.amazonaws.com/eh-media/2021%2F11%2FSlovakia-Bratislava-Cycling_with_Bratislava_Castle_in_the_Background.jpg";

export const metadata: Metadata = {
  title: "The Poor Man's Slovenia | Villach → Bratislava Bikepacking",
  description:
    "821 km across 5 countries in 14 days. Austria, Slovenia, Croatia, Hungary, Slovakia — Villach to Bratislava by bike. Late May 2026.",
  openGraph: {
    title: "The Poor Man's Slovenia | Villach → Bratislava Bikepacking",
    description:
      "821 km across 5 countries in 14 days. Austria, Slovenia, Croatia, Hungary, Slovakia — Villach to Bratislava by bike. Late May 2026.",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Cycling with Bratislava Castle in the background" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Poor Man's Slovenia | Villach → Bratislava Bikepacking",
    description:
      "821 km across 5 countries in 14 days. Austria, Slovenia, Croatia, Hungary, Slovakia — Villach to Bratislava by bike.",
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
