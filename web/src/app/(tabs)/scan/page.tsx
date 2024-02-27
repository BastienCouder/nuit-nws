"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CameraComponent from "@/components/camera";

export default function TabScanScreen() {
  const router = useRouter();

  const handleBarCodeScanned = async ({ data }: any) => {
    router.push(`/user/${data}`);
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-start gap-5 pt-10">
      <div className="flex flex-col items-center justify-center p-5 w-[20rem] border-2 border-primary rounded-lg gap-4">
        <p className="font-fugazone text-2xl">Profil</p>
        <CameraComponent handleBarCodeScanned={handleBarCodeScanned} />
      </div>
      <p className="text-2xl text-center px-5 font-firasansbold">
        Scannez le QR Code d&apos;une personne
      </p>
    </div>
  );
}
