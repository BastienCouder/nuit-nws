import React from "react";
import { cookies } from "next/headers";
import { API_URL } from "@/lib/utils";
import CommonPoints from "./_components/common-point";
import { CommonPoint, User } from "@/types";

async function getUserDetails(params: { token: string }) {
  const res = await fetch(`${API_URL}/user/${params.token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.error("Failed to fetch user");

  return res.json();
}

async function getUserCurrentDetails() {
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

async function getCommonPoints() {
  const res = await fetch(`${API_URL}/commonPoint`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  return res.json();
}

export default async function userScreen({
  params,
}: {
  params: { token: string };
}) {
  const user: User = await getUserCurrentDetails();
  const commonPoints: CommonPoint[] = await getCommonPoints();
  const userDetails: User = await getUserDetails(params);

  return (
    <div
      className={`flex flex-1 flex-col items-center justify-start pt-5 pb-14 overflow-y-auto h-[40rem]`}
    >
      {userDetails ? (
        <div
          className={`flex flex-col items-center justify-center p-5 mt-4 w-4/5 border-primary border-2 rounded-lg max-w-md`}
        >
          <p className={`font-bold text-2xl`}>Profil</p>
          <div className="self-stretch flex flex-col items-start mt-5 gap-y-2 capitalize text-lg">
            <p>{userDetails?.prenom}</p>
            <p>{userDetails?.nom}</p>
            <p>{userDetails?.entreprise}</p>
            <p>{userDetails?.poste}</p>
          </div>
          <div className={`self-stretch border-b-2 border-primary mt-2`}></div>
          <CommonPoints
            commonPoints={commonPoints}
            user={user}
            userDetails={userDetails}
          />
          <div className="flex flex-col items-center justify-center space-y-5"></div>
        </div>
      ) : (
        <p className={`text-center text-primary px-5`}>
          Aucun détail d&apos;utilisateur trouvé.
        </p>
      )}
    </div>
  );
}
