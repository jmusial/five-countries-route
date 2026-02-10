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
  title: "Let's Go Slovenia! | West Loop Bikepacking Adventure",
  description:
    "Join us for a 2-week bikepacking adventure through Slovenia's stunning West Loop — emerald rivers, Julian Alps, medieval towns, and world-class gravel riding.",
  openGraph: {
    title: "Let's Go Slovenia! | West Loop Bikepacking Adventure",
    description:
      "2 weeks. 530 km. Julian Alps, Soča Valley, Lake Bled, and more. Late May 2026.",
    type: "website",
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
