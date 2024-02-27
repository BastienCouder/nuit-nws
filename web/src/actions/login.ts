"use server";

import { API_URL } from "@/lib/utils";
import { cookies } from "next/headers";

export async function login(data: string) {
  const response = await fetch(`${API_URL}/auth/login/qr`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qrToken: data }),
  });

  if (!response.ok) {
    throw new Error(`HTTP status ${response.status}`);
  }
  const res = await response.json();

  cookies().set({
    name: "userDetails",
    value: res.user,
  });
  cookies().set({
    name: "userToken",
    value: data,
  });
}
