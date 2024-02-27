"use client";

import Link from "next/link";

export default function FloatingLink() {
  return (
    <div className="fixed bottom-[5.5rem] right-7">
      <Link
        href="/modal"
        className="flex items-center justify-center w-12 h-12 bg-secondary font-fugazone text-lg rounded-full hover:opacity-50 transition-opacity"
      >
        ?
      </Link>
    </div>
  );
}
