"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import QrCodeLogin from "@/components/qrcode-login";
export default function LoginScreen() {
  const [isScanning, setIsScanning] = useState(false);

  const handleStopScan = () => setIsScanning(false);
  const handleQRCodeScan = () => setIsScanning(true);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-10">
      {isScanning ? (
        <>
          <button onClick={handleStopScan} className="mt-5">
            <Image
              src="/images/logo-layout.svg"
              alt="Stop Scan"
              width={400}
              height={255}
              className="w-80"
            />
          </button>
          <QrCodeLogin />
        </>
      ) : (
        <>
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={500}
            height={500}
            className="w-4/5"
          />
          <div className="bg-secondary rounded-lg w-4/5">
            <button
              onClick={handleQRCodeScan}
              className="opacity-100 hover:opacity-90 transition-opacity font-fugazone text-2xl text-center py-5 w-full"
            >
              Connexion
            </button>
          </div>
          <p className="font-fugazone text-primary text-4xl">
            La nuit de la NWS
          </p>
        </>
      )}
    </div>
  );
}
