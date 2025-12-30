import type { Metadata } from "next";
import { Inter, Playfair_Display, VT323 } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const vt323 = VT323({ weight: '400', subsets: ["latin"], variable: '--font-lcd', display: 'swap' });

export const metadata: Metadata = {
  title: "Street - We Invented ERC-S",
  description: "Deploy equity-grade tokens without it being a security.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${vt323.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}