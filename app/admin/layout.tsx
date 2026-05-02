import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("access_token")?.value;
  if (!accessToken) {
    return redirect("/login");
  }

  const user = decodeJwt(accessToken);

  if (!user) {
    return redirect("/login");
  }
  console.log(user.role);
  if (user.role !== "lab") {
    return redirect("/dashboard");
  }

  return <>{children}</>;
}
