import { sqliteTable, text, integer} from "drizzle-orm/sqlite-core"

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
	createdByUserId: integer("createdByUserId").notNull().references(() => users.id),
})

export const roles = sqliteTable("roles", {
	id: integer("id").primaryKey().notNull(),
	code: text("code").notNull().unique(),
	name: text("name").notNull().unique(),
})

export const userProjectRole = sqliteTable("userProjectRole", {
	id: integer("id").primaryKey().notNull(),
	userId: integer("userId").references(() => users.id),
	projectId: integer("projectId").references(() => projects.id),
	roleId: integer("roleId").notNull().references(() => roles.id),
})


export const containers = sqliteTable("containers", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	status: text("status"),
	projectId: integer("projectId").notNull().references(() => projects.id),
})

export const subContainers = sqliteTable("subContainers", {
	id: integer("id").primaryKey().notNull(),
	name: text("name"),
	description: text("description"),
	status: text("status"),
	containerId: integer("containerId").notNull().references(() => containers.id),
})

export const items = sqliteTable("items", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	status: text("status"),
	subContainerId: integer("subContainerId").references(() => subContainers.id),
	containerId: integer("containerId").references(() => containers.id),
})