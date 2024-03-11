"use client";
import { User } from "@/types";
import React, { MouseEventHandler } from "react";

interface logoutProps {
  deletingCookies: (userId: string) => void;
  user: User;
}
export default function Logout({ deletingCookies, user }: logoutProps) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    deletingCookies(String(user.id));
  };
  return (
    <button
      onClick={handleClick}
      className={`mt-5 p-2 border-2 border-primary rounded opacity-80 hover:opacity-100`}
    >
      <p className={`text-lg text-center text-primary`}>Déconnexion</p>
    </button>
  );
}
