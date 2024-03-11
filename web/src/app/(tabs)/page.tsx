import { API_URL } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Logout from "./_components/logout";

async function getUserDetails() {
  const cookieStore = cookies();
  const token = cookieStore.get("userToken");
  const res = await fetch(`${API_URL}/user/${token?.value}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch user");
  }

  return res.json();
}

async function deletingCookies(userId: string) {
  "use server";
  cookies().delete("userToken");
  cookies().delete("userDetails");

  try {
    const res = await fetch(`${API_URL}/auth/deleteSession/${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Failed to fetch user");
    }
    redirect("/login");
  } catch (error) {
    console.error("Failed to fetch user");
  }
}

export default async function Home() {
  const user = await getUserDetails();

  return (
    <div
      className={`flex flex-1 flex-col items-center justify-start pt-10 text-background pb-14`}
    >
      <div
        className={`flex flex-col items-center justify-center p-5 gap-4 w-4/5 text-foreground border-2 border-primary rounded-lg bg-background max-w-[450px]`}
      >
        <p className={`font-bold text-2xl`}>Profil</p>
        {user ? (
          <>
            <div className="self-stretch flex flex-col items-start mt-5 gap-y-2 capitalize text-lg">
              <p>{user?.prenom}</p>
              <p>{user?.nom}</p>
              <p>{user?.entreprise}</p>
              <p>{user?.poste}</p>
            </div>
            <div
              className={`self-stretch border-b-2 text-primary border-primary`}
            ></div>
            <div className="flex flex-col items-center justify-center w-full py-1 font-fugazone rounded-lg bg-primary">
              <p className={`uppercase text-xl text-background`}>Score</p>
              <p className={`text-lg text-background`}>
                {user?.score} {user && user?.score > 1 ? "points" : "point"}
              </p>
            </div>
            <p className={`text-lg text-background`}>
              {user?.count}{" "}
              {user && user?.count > 1
                ? "personnes déjà scannées"
                : "personne déjà scannée"}
            </p>
          </>
        ) : (
          <p className={`uppercase text-lg text-primary`}>Aucun utilisateur</p>
        )}
      </div>
      {/* Commenté car vous avez mentionné de ne pas inclure le bouton de déconnexion pour l'instant */}
      <Logout deletingCookies={deletingCookies} user={user} />
      <p className=" text-sm w-full fixed flex justify-center bottom-[5rem]">
        Réalisé par les étudiants de la nws
      </p>
    </div>
  );
}
