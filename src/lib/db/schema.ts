import { pgTable, text, serial, integer, boolean, decimal, real, date,  } from "drizzle-orm/pg-core";

export const list = pgTable("list", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content"),
  user_id: integer("user_id").references(() => user.id, { onDelete: 'cascade' }),
  is_main: boolean("is_main").default(false),
});

export const item = pgTable("item", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  amount: integer("amount").default(0),
  list_id: integer("list_id").references(() => list.id, { onDelete: 'cascade' }),
  unit: text("unit").default(""),
  prize: real("prize").default(0.0),
  ticked: boolean("ticked").default(false),
  storage_id: integer("storage_id").references(() => storage.id, { onDelete: 'cascade' }),
  amount_in_storage: integer("amount_in_storage").default(0),
  show_in_list: boolean("show_in_list").default(false),
  purchased_date: text("purchased_date").default("")
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
  list_id: integer("list_id").references(() => list.id, { onDelete: 'cascade' }),
  user_id: integer("user_id").references(() => user.id, { onDelete: 'cascade' }),
})