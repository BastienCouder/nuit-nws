import { API_URL } from "@/lib/utils";
import Image from "next/image";

async function getQrcodes() {
  const res = await fetch(`${API_URL}/auth/qrcodes`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Failed to fetch qrcodes");
  }
  return res.json();
}

export default async function qrCodesScreen() {
  const qrcodes = await getQrcodes();

  return (
    <section className="p-20 w-full">
      {qrcodes ? (
        <ul className="flex gap-12 flex-wrap">
          {qrcodes.map((qrcode: any, index: string) => {
            const myBase64Image = qrcode.qrCodeUrl;
            return (
              <li key={index} className="flex flex-col gap-4">
                <Image
                  src={myBase64Image}
                  alt="qrcode"
                  width={500}
                  height={200}
                  className="w-44"
                />
                <div className="flex flex-col font-fugazone text-primary">
                  <p>{qrcode.nom}</p>
                  <p>{qrcode.prenom}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={`uppercase text-lg text-primary`}>Aucun utilisateur</p>
      )}
    </section>
  );
}
