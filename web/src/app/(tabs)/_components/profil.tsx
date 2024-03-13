"use client";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { User } from "@/types";
import { API_URL } from "@/lib/utils";

const socket = io(`${API_URL}`);

interface ProfilProps {
  user: User;
}

export default function Profil({ user }: ProfilProps) {
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);

  useEffect(() => {
    // Écouter les mises à jour de profil
    socket.on("profil update", (updatedUserInfo: User) => {
      setUpdatedUser(updatedUserInfo);
    });

    return () => {
      socket.off("profil update");
    };
  }, []);

  const currentUser = updatedUser || user;

  return (
    <>
      {currentUser ? (
        <>
          <div className="self-stretch flex flex-col items-start mt-5 gap-y-2 capitalize text-lg">
            <p>{currentUser?.prenom}</p>
            <p>{currentUser?.nom}</p>
            <p>{currentUser?.entreprise}</p>
            <p>{currentUser?.poste}</p>
          </div>
          <div className="self-stretch border-b-2 text-primary border-primary"></div>
          <div className="flex flex-col items-center justify-center w-full py-1 font-fugazone rounded-lg bg-primary">
            <p className="uppercase text-xl text-background">Score</p>
            <p className="text-lg text-background">
              {currentUser?.score}{" "}
              {currentUser && currentUser?.score > 1 ? "points" : "point"}
            </p>
          </div>
          <p className="text-lg text-foreground">
            {currentUser?.count}{" "}
            {currentUser && currentUser?.count > 0
              ? currentUser?.count > 1
                ? "personnes déjà scannées"
                : "personne déjà scannée"
              : "personne scannée"}
          </p>
        </>
      ) : (
        <p className="uppercase text-lg text-primary">Aucun utilisateur</p>
      )}
    </>
  );
}
