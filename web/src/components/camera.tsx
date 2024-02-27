import dynamic from "next/dynamic";
import React from "react";

// Interface pour les props de Camera
interface CameraProps {
  handleBarCodeScanned?: ({ data }: { data: string }) => Promise<void>;
}

// Importation dynamique du composant QrScanner avec ssr désactivé
const QrScannerDynamic = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.QrScanner),
  {
    ssr: false,
  }
);

export default function Camera({ handleBarCodeScanned }: CameraProps) {
  const handleDecode = (result: string) => {
    console.log(result);

    if (handleBarCodeScanned) {
      handleBarCodeScanned({ data: result }).catch((error) => {
        console.error(
          "Erreur lors du traitement du résultat du scan QR:",
          error
        );
      });
    }
  };

  const handleError = (error: Error) => {
    console.log(error?.message);
  };

  return (
    <QrScannerDynamic
      onDecode={handleDecode}
      onError={handleError}
      audio={false}
    />
  );
}
