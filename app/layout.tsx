import type { Metadata } from "next";
import { TASA_Explorer } from "next/font/google";

import "./globals.css";

const tasaExplorer = TASA_Explorer({
  variable: "--font-tasa-explorer",
  subsets: ["latin"],
  weight: '400',
});

export const metadata: Metadata = {
  title: "Break Time",
  description: "A Study Timer That Lets You Take a Break",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tasaExplorer.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
