import { sqliteTable, AnySQLiteColumn, numeric, text, integer } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {
	id: numeric("id").primaryKey(),
	hash: text("hash").notNull(),
	createdAt: numeric("created_at"),
});

export const movies = sqliteTable("movies", {
	id: integer("id").primaryKey().notNull(),
	name: text("name"),
	releaseYear: integer("release_year"),
});