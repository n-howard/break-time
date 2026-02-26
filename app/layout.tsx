import type { Metadata } from "next";

import "./globals.css";



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
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
