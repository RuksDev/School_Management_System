import type { Metadata } from "next";
import { Gloock, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gloock", // Define a CSS variable for Gloock
});

export const metadata: Metadata = {
  title: "Ruks Dev School Management Dashboard",
  description: "Next.js School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gloock.variable}`}> {/* Apply Gloock font variable */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
