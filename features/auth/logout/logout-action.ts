"use server";

import { cookies } from "next/headers";

export const logoutUser = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    return {
      status: "SUCCESS",
      message: "Logged out successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: "ERROR",
      message: "Something went wrong, please try again",
    };
  }
};
