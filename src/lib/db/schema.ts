import { relations } from "drizzle-orm";
import { int } from "drizzle-orm/mysql-core";
import { pgTable, text, serial, integer, boolean, real  } from "drizzle-orm/pg-core";

export const list = pgTable("list", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  content: text("content"),
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
  purchased_date: text("purchased_date").default(""),
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
  author: integer("author").default(0),
  list_id: integer("list_id").references(() => list.id, { onDelete: 'cascade' }),
});

// many-to-many relations:

export const user_list = pgTable("user_list", {
  user_id: integer("user_id").references(() => user.id, { onDelete: 'cascade' }).notNull(),
  list_id: integer("list_id").references(() => list.id, { onDelete: 'cascade' }).notNull(),
});

export const user_storage = pgTable("user_storage", {
  user_id: integer("user_id").references(() => user.id, { onDelete: 'cascade' }).notNull(),
  storage_id: integer("storage_id").references(() => storage.id, { onDelete: 'cascade' }).notNull(),
});


// Drizzle relations for queries:

export const user_relations = relations(user, ({ many }) => ({
	user_list: many(user_list),
}));

export const list_relations = relations(list, ({ many }) => ({
	user_list: many(user_list),
}));

export const user_to_list_relations = relations(user_list, ({ one }) => ({
	list: one(list, {
		fields: [user_list.list_id],
		references: [list.id],
	}),
	user: one(user, {
		fields: [user_list.user_id],
		references: [user.id],
	}),
}));

