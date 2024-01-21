import { sqliteTable, text, integer} from "drizzle-orm/sqlite-core"

export const movies = sqliteTable("movies", {
    id: integer("id").primaryKey(),
    title: text("name"),
    releaseYear: integer("release_year"),
})

export const users = sqliteTable("users", {
	id: integer("id").primaryKey().notNull(),
	userName: text("userName").notNull().unique(),
	name: text("name"),
	email: text("email").notNull().unique(),
	password: text("password").notNull().unique(),
});

export const projects = sqliteTable("projects", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
})

export const roles = sqliteTable("roles", {
	id: integer("id").primaryKey().notNull(),
	code: text("code").notNull().unique(),
	name: text("name").notNull().unique(),
	description: text("description"),
})

export const userProjectRole = sqliteTable("userProjectRole", {
	id: integer("id").primaryKey().notNull(),
	userId: integer("userId").references(() => users.id),
	projectId: integer("projectId").references(() => projects.id),
	roleId: integer("roleId").references(() => roles.id),
})

export const positions = sqliteTable("positions", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	projectId: integer("projectId").references(() => projects.id)
})

export const containers = sqliteTable("containers", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	projectId: integer("projectId").references(() => projects.id),
	positionId: integer("positionId").references(() => positions.id)
})

export const subContainers = sqliteTable("subContainers", {
	id: integer("id").primaryKey().notNull(),
	name: text("name"),
	description: text("description"),
	containerId: integer("containerId").references(() => containers.id),
})

export const items = sqliteTable("items", {
	id: integer("id").primaryKey().notNull(),
	name: text("name"),
	description: text("description"),
	subContainerId: integer("subContainerId").references(() => subContainers.id),
	containerId: integer("containerId").references(() => containers.id),
})