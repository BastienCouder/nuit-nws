import React, { useState, useEffect } from "react";

const QRCodeAuth = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [sessionId, setSessionId] = useState("");

  // Appeler l'API pour obtenir le QR code et le sessionId
  useEffect(() => {
    fetch("http://localhost:5000/auth/qr")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur réseau lors de la récupération du QR code");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        setQrCodeUrl(data.qrCodeUrl);
        setSessionId(data.sessionId);
        startPolling(data.sessionId);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération du QR code:", error)
      );
  }, []);

  // Fonction pour démarrer le polling
  const startPolling = (sessionId: string) => {
    const intervalId = setInterval(() => {
      fetch(`http://localhost:5000/auth/poll/${sessionId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur réseau lors du polling");
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === "authenticated") {
            clearInterval(intervalId);
            // Stocker le authToken pour maintenir l'état de connexion
            localStorage.setItem("authToken", data.authToken);
            // Rediriger l'utilisateur vers une page sécurisée ou mettre à jour l'état
            console.log("Utilisateur authentifié!");
            // window.location.href = '/dashboard'; // Ou utiliser un routeur React
          }
        })
        .catch((error) => console.error("Erreur lors du polling:", error));
    }, 5000); // Poll toutes les 5 secondes
  };

  return (
    <div>
      <h1>Scannez le QR Code pour vous connecter</h1>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
    </div>
  );
};

export default QRCodeAuth;
