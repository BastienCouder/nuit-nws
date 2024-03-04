"use client";

import { API_URL } from "@/lib/utils";

export default function ButtonGenerate() {
  const submit = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/generate-pdf`, {
        cache: "no-store",
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "app-nuit-qrcodes.pdf"; // Nom du fichier à télécharger
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      } else {
        console.error("Failed to download PDF");
      }
    } catch {
      console.error("Failed to fetch qrcodes");
    }
  };

  return (
    <button
      onClick={submit}
      className="rounded-md text-background px-4 py-2 bg-primary font-fugazone"
    >
      Générer les qrcodes
    </button>
  );
}
