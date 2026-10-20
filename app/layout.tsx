
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LHIMF | Custom Website Development",
  description:
    "LHIMF creates affordable, responsive, and customized websites for businesses, organizations, events, and personal brands. Explore projects and request a custom quote.",

  applicationName: "LHIMF",

  icons: {
    icon: "/images/hehe.png",
    shortcut: "/images/hehe.png",
    apple: "/images/hehe.png",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LHIMF",
  },

  manifest: "/manifest.json",

  openGraph: {
    title: "LHIMF | Custom Website Development",
    description: "Need a customized website? Let's build one for you.",
    siteName: "LHIMF",
    type: "website",
    url: "https://www.lhimf.online",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
