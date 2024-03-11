import React from "react";
import Image from "next/image";
import { Rank } from "@/types";
import { API_URL } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

async function getRanks() {
  const res = await fetch(`${API_URL}/rank`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Failed to fetch ranks");
  }

  return res.json();
}

function capitaliserPremiereLettre(texte: string) {
  return texte
    .toLowerCase()
    .split(" ")
    .map((mot) => mot.charAt(0).toUpperCase() + mot.slice(1))
    .join(" ");
}

export default async function RankingPage() {
  const ranks: Rank[] = await getRanks();
  const topThreeRanks = ranks.slice(0, 3);
  const remainingRanks = ranks.slice(3);

  return (
    <div className="flex flex-col items-center justify-start pt-10 px-12 bg-background text-foreground pb-14 h-full overflow-y-auto">
      <div className="flex flex-col items-center justify-center p-5 gap-4 w-full  border-2 border-primary rounded-lg bg-background">
        <h1 className="font-fugazone text-4xl">Classement</h1>
        {ranks && ranks.length > 0 ? (
          <>
            <div className="w-full space-y-6 flex flex-col">
              <div className="flex justify-evenly">
                {topThreeRanks.map((item, index) => (
                  <div
                    key={item.id}
                    className={`px-4 py-2 my-1 text-xl space-x-4 rounded-full ${
                      index === 0
                        ? "bg-[#ffd730] border-none text-background"
                        : index === 1
                        ? "bg-[#c0c0c0] border-none text-background"
                        : "bg-[#cd7f32] border-none text-background"
                    }`}
                  >
                    <span>{item.position}</span>
                    <span>
                      {capitaliserPremiereLettre(item.user.nom)}{" "}
                      {capitaliserPremiereLettre(item.user.prenom)}
                    </span>
                    <span>{item.user.score}</span>
                  </div>
                ))}
              </div>
              <div className="my-4">
                <Separator className="bg-primary" />
              </div>
              <div className="flex flex-wrap gap-2">
                {remainingRanks.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-2 my-1 space-x-4 rounded-full border border-primary"
                  >
                    <span>{item.position}</span>
                    <span>
                      {capitaliserPremiereLettre(item.user.nom)}{" "}
                      {capitaliserPremiereLettre(item.user.prenom)}
                    </span>
                    <span>{item.user.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className={`uppercase text-lg text-primary`}>Aucun classement</p>
        )}
      </div>
    </div>
  );
}
