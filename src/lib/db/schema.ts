import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";

export const list = pgTable("list", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content"),
  user_id: integer("user_id")
});

export const item = pgTable("item", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount").default(0),
  list_id: integer("list_id").references(() => list.id)
});

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  name: text("name").notNull(),
});