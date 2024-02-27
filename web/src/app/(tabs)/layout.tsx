"use client";
import LogoLayout from "@/app/(tabs)/_components/logo-tabs";
import Navbar from "./_components/navbar";
import FloatingLink from "@/app/(tabs)/_components/floating";
import { usePathname } from "next/navigation";

export default function TabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <main className="h-full firasans mb-96">
      <LogoLayout />
      {children}
      {!pathname.startsWith("/user") && <FloatingLink />}
      <Navbar />
    </main>
  );
}
