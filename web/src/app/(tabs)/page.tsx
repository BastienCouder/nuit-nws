import { API_URL } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Logout from "./_components/logout";
import { revalidatePath } from "next/cache";
import Profil from "./_components/profil";

async function getUserDetails() {
  const cookieStore = cookies();
  const token = cookieStore.get("userToken");
  const res = await fetch(`${API_URL}/user/${token?.value}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch user");
  }
  revalidatePath("/");
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
    revalidatePath("/");
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
        <Profil user={user} />
      </div>
      {/* Commenté car vous avez mentionné de ne pas inclure le bouton de déconnexion pour l'instant */}
      <Logout deletingCookies={deletingCookies} user={user} />
    </div>
  );
}
