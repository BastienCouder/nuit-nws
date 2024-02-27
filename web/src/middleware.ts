import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("userToken"); // Utilisation correcte pour obtenir les cookies

  // Construction de l'URL absolue pour la redirection
  // Assurez-vous que 'login' se trouve bien à cet emplacement sur votre serveur
  const loginUrl = new URL("/login", req.url).toString();

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
