"use client";
import { appLinks } from "@/config/links";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-row justify-evenly items-center gap-x-4 w-full h-[4rem] fixed bg-primary bottom-0">
      {appLinks.map((link, index) => (
        <Link key={index} href={link.route}>
          <link.icon className="h-7 w-7 text-background" />
        </Link>
      ))}
    </nav>
  );
}
