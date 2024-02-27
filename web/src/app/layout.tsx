import type { Metadata, Viewport } from "next";
import { Fira_Sans, Fugaz_One } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

const fira_sans = Fira_Sans({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-firasans",
});
const fira_sans_bold = Fira_Sans({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-firasansbold",
});
const fugaz_one = Fugaz_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fugazone",
});

export const metadata: Metadata = {
  title: "Nuit NWS",
  description: "La nuit de la nws",
  generator: "Next.js",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#04061F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${fugaz_one.variable} ${fira_sans.variable}  ${fira_sans_bold.variable}`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
