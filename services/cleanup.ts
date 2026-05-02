import "dotenv/config";
import cron from "node-cron";
import { lt } from "drizzle-orm";
import { otps, tempUsers } from "@/drizzle/schema";
import { db } from "@/config/drizzle/db";

export const startCleanupJob = () => {
  cron.schedule("*/10 * * * *", async () => {
    try {
      await db
        .delete(tempUsers)
        .where(lt(tempUsers.expiresAt, new Date(Date.now())));
      await db.delete(otps).where(lt(otps.expiresAt, new Date(Date.now())));
      console.log("🧹 TTL cleanup executed");
    } catch (err) {
      console.error("Cleanup error:", err);
    }
  });
};
