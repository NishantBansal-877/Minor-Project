import { GENDER, ROLE } from "@/lib/constants-types";
import {
  boolean,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),

  userId: varchar("user_id", { length: 255 }).notNull().unique(),

  name: varchar("name", { length: 255 }).notNull(),
  number: varchar("number", { length: 20 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),

  gender: mysqlEnum("gender", GENDER).notNull(),
  address: text("address"),
  details: text("details"),

  role: mysqlEnum("role", ROLE).notNull(),

  isVerified: boolean("is_verified").default(false),
  expiresAt: timestamp("expires_at"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const labs = mysqlTable("labs", {
  id: int("id").autoincrement().primaryKey(),
  labId: varchar("lab_id", { length: 255 })
    .notNull()
    .unique()
    .references(() => users.userId),
  labName: varchar("lab_name", { length: 255 }).notNull(),
  labOwnerName: varchar("lab_owner_name", { length: 255 }),

  avatarUrl: varchar("avatar_url", { length: 255 }),
});

export const doctors = mysqlTable("doctors", {
  id: int("id").autoincrement().primaryKey(),
  doctorId: varchar("doctor_id", { length: 255 })
    .notNull()
    .unique()
    .references(() => users.userId),
  designation: varchar("designation", { length: 255 }),
});

export const patients = mysqlTable("patients", {
  id: int("id").autoincrement().primaryKey(),
  patientId: varchar("patient_id", { length: 255 })
    .notNull()
    .unique()
    .references(() => users.userId),
});

export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),

  patientId: varchar("patient_id", { length: 255 })
    .notNull()
    .references(() => users.userId),
  labId: varchar("lab_id", { length: 255 })
    .notNull()
    .references(() => users.userId),

  panelKey: varchar("panel_key", { length: 50 }).notNull(),
  panelTitle: varchar("panel_title", { length: 255 }).notNull(),

  clinicalCategory: varchar("clinical_category", { length: 255 }),
  specimenType: varchar("specimen_type", { length: 255 }),

  values: json("values").notNull(),

  status: varchar("status", { length: 50 }).default("pending"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const reportValues = mysqlTable("report_values", {
  id: int("id").autoincrement().primaryKey(),

  reportId: int("report_id")
    .notNull()
    .references(() => reports.id),

  testKey: varchar("test_key", { length: 100 }).notNull(),
  testName: varchar("test_name", { length: 255 }).notNull(),

  value: text("value"),
  unit: varchar("unit", { length: 50 }),

  dataType: varchar("data_type", { length: 50 }),

  referenceRange: text("reference_range"),

  interpretation: varchar("interpretation", { length: 100 }),

  createdAt: timestamp("created_at").defaultNow(),
});

export const idSequence = mysqlTable("id_sequence", {
  id: int("id").autoincrement().primaryKey(),

  type: mysqlEnum("type", ["PID", "DID", "LID"]).notNull().unique(),

  seq: int("seq").notNull().default(0),
});

export const tempUsers = mysqlTable("temp_users", {
  id: int("id").autoincrement().primaryKey(),

  name: varchar("name", { length: 255 }).notNull(),
  number: varchar("number", { length: 20 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),

  gender: mysqlEnum("gender", GENDER).notNull(),
  role: mysqlEnum("role", ROLE).notNull(),

  expiresAt: timestamp("expires_at").notNull(),
});

export const otps = mysqlTable("otps", {
  id: int("id").autoincrement().primaryKey(),
  tempUserId: int("temp_user_id").references(() => tempUsers.id, {
    onDelete: "cascade",
  }),
  otp: varchar("otp", { length: 10 }).notNull(),
  email: varchar("email", { length: 255 }),

  expiresAt: timestamp("expires_at").notNull(),
});
