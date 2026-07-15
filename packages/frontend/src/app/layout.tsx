import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Figtree } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/lib/providers";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/brand";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteTitle = `${SITE_NAME} - AI Token Usage Tracker & Leaderboard`;

export const metadata: Metadata = {
  title: siteTitle,
  description: SITE_TAGLINE,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: siteTitle,
    description: SITE_TAGLINE,
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - AI Token Usage Tracker`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: SITE_TAGLINE,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${figtree.variable} ${jetbrainsMono.variable}`}>
      <body className={figtree.className}>
        <NextTopLoader color="#3B82F6" showSpinner={false} />
        <Providers>
          {children}
        </Providers>
        <ToastContainer position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
