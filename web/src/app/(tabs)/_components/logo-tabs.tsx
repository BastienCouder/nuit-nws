"use client";

import Image from "next/image";

export default function LogoLayout() {
  return (
    <div className="flex flex-row items-center justify-center pt-5">
      <Image
        src="/images/logo-layout.svg"
        alt="Logo"
        width={400}
        height={200}
        className="w-72"
      />
    </div>
  );
}
