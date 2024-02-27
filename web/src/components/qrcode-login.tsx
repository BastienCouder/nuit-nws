"use client";

import React from "react";
import CameraComponent from "@/components/camera";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";

export default function QrCodeLogin() {
  const router = useRouter();

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    try {
      await login(data);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  //   const simulateScan = () => {
  //     // Simuler les données d'un QR code scanné
  //     const simulatedData =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvdWRlcmJhc3RpZW5AZ21haWwuY29tIiwiaWF0IjoxNzA3MTY2NzQzLCJleHAiOjE3Mzg3MDI3NDN9.USIpd8UmP2Y2XtyiaEstjJRg_DovhbTgSJglGdqg8jw";
  //     handleBarCodeScanned({ data: simulatedData });
  //   };

  return (
    <div className="flex flex-1 flex-col items-center justify-start gap-5 p-14">
      <div className="flex flex-col items-center justify-center p-5 w-[18rem] border-2 border-primary rounded-lg gap-4">
        <p className="font-fugazone text-2xl">Profil</p>
        <CameraComponent handleBarCodeScanned={handleBarCodeScanned} />
        {/* <button
          onClick={simulateScan}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Simuler Scan QR Code
        </button> */}
      </div>
      <p className="text-2xl text-center px-5 font-firasansbold">
        Scannez votre QR Code pour participer
      </p>
    </div>
  );
}
