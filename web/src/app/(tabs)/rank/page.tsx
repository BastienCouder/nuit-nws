import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Rank, User } from "@/types";
import { API_URL } from "@/lib/utils";
import { cookies } from "next/headers";

async function getRanks() {
  const res = await fetch(`${API_URL}/rank`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch ranks");
  }

  return res.json();
}

async function getUserDetails() {
  const cookieStore = cookies();
  const token = cookieStore.get("userToken");
  const res = await fetch(`${API_URL}/user/${token?.value}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch user");
  }

  return res.json();
}

export default async function RankingPage() {
  const ranks: Rank[] = await getRanks();
  const user: User = await getUserDetails();
  console.log(ranks);

  const userRank = ranks.find((rank: Rank) => rank.user.id === user?.id);

  return (
    <div className="flex flex-col items-center justify-start pt-10 bg-background text-foreground pb-14">
      <div className="flex flex-col items-center justify-center p-5 gap-4 w-4/5 border-2 border-primary rounded-lg bg-background max-w-[450px]">
        <Image src="/images/rank.svg" alt="Rank" width={80} height={80} />
        <h1 className="font-fugazone text-2xl">Classement</h1>
        <div className="space-y-2">
          {ranks.slice(0, 3).map((item: Rank) => (
            <div
              key={item.id}
              className="flex flex-row items-center justify-start gap-4 px-4 py-2 border border-primary rounded-full my-1"
            >
              <span className="font-fugazone text-lg">{item.position}</span>
              <span className="text-lg">
                {item.user.nom} {item.user.prenom}
              </span>
            </div>
          ))}
        </div>
        <div className="w-44 flex flex-row items-center justify-start gap-4 px-4 py-2 mt-4 rounded-full my-1 bg-secondary">
          <span className="font-fugazone text-lg">{userRank?.position}</span>
          <span className="text-lg">vous</span>
        </div>
      </div>
    </div>
  );
}
