import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "Prevalence Map - Pathways",
  description: "View data visualisations that communicate the prevalence of population segments in different parts of the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
