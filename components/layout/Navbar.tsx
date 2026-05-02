import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { logoutUser } from "@/features/auth/logout/logout-action";
import { toast } from "sonner";
import { resetUser } from "@/lib/store/slices/user-slice";

export const Navbar = () => {
  const { name } = useSelector((state: any) => state.user.user);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      console.log("done");

      const res = await logoutUser();

      if (res.status === "SUCCESS") {
        toast.success(res.message);
        dispatch(resetUser());
        return router.push("/login");
      } else {
        return toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="w-full border-b border-white/10 bg-[#020617]/85 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href={
            name
              ? pathname.startsWith("/admin")
                ? "/admin/dashboard"
                : "/dashboard"
              : "/"
          }
          className="flex items-center gap-2 font-semibold text-lg text-white"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
          LIS
        </Link>

        {name && pathname !== "/" && !pathname.startsWith("/admin/upload") && (
          <h2 className="text-white text-center flex">
            Welcome &nbsp; <span className="font-bold">{name}</span> 👋
          </h2>
        )}

        {pathname === "/admin/upload" && (
          <div className="text-sm text-gray-400">
            Step <span className="text-white font-medium">1</span> of 3
          </div>
        )}
        {pathname === "/admin/upload/tests" && (
          <div className="text-sm text-gray-400">
            Step <span className="text-white font-medium">2</span> of 3
          </div>
        )}

        {name && pathname !== "/" ? (
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href={
                name
                  ? pathname.startsWith("/admin")
                    ? "/admin/profile"
                    : "/profile"
                  : "/"
              }
              className="px-4 py-1.5 rounded-md bg-emerald-500/10 text-emerald-400"
            >
              Profile
            </Link>
            <Button
              onClick={handleLogout}
              className="px-4 py-1.5 rounded-md bg-emerald-500/10 text-emerald-400 hover:cursor-pointer "
            >
              Logout
            </Button>
          </nav>
        ) : (
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-md bg-emerald-500/10 text-emerald-400"
            >
              Login
            </Link>
            <Link href="/register" className="text-gray-400 hover:text-white">
              Register
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};
