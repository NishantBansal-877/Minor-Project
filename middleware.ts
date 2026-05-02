import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const refreshToken = req.cookies.get("refresh_token")?.value;
  const accessToken = req.cookies.get("access_token")?.value;

  let isValidRefresh = null;
  let isValidAccess = null;

  if (!refreshToken) {
    return NextResponse.next();
  }

  try {
    if (refreshToken) {
      const { payload } = await jwtVerify(refreshToken, secret, {
        issuer: "lis",
        audience: "users",
      });
      isValidRefresh = payload;
    }

    if (accessToken) {
      const { payload } = await jwtVerify(accessToken, secret, {
        issuer: "lis",
        audience: "users",
      });
      isValidAccess = payload;
    }
  } catch (error) {
    console.log(error);
  }

  if (!isValidRefresh) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("refresh_token");
    res.cookies.delete("access_token");
    return res;
  }

  if (!isValidAccess) {
    const { userId, role } = isValidRefresh as any;

    const newAccessToken = await new SignJWT({ userId, role })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer("lis")
      .setAudience("users")
      .setExpirationTime("1h")
      .sign(secret);

    const res = NextResponse.redirect(new URL("/dashboard", req.url));

    res.cookies.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return res;
  }

  // 🔁 Block auth pages when logged in
  if (
    isValidAccess &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register"],
};
