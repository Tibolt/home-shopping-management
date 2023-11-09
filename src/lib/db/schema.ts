import { pgTable, text, serial, integer, boolean, decimal, real,  } from "drizzle-orm/pg-core";

export const list = pgTable("list", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content"),
  user_id: integer("user_id").references(() => user.id),
  is_main: boolean("is_main")
});

export const item = pgTable("item", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount").default(0),
  list_id: integer("list_id").references(() => list.id),
  unit: text("unit").default(""),
  prize: real("prize").default(0.0),
  ticked: boolean("ticked").default(false),

});

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  name: text("name").notNull(),
});

export const storage = pgTable("storage", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  list_id: integer("list_id").references(() => list.id),
  user_id: integer("user_id").references(() => user.id),
})