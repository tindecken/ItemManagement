import { sqliteTable, AnySQLiteColumn, foreignKey, integer, text, uniqueIndex } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const containers = sqliteTable("containers", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	status: text("status"),
	projectId: integer("projectId").notNull().references(() => projects.id),
	positionId: integer("positionId").references(() => positions.id),
});

export const items = sqliteTable("items", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	status: text("status"),
	subContainerId: integer("subContainerId").references(() => subContainers.id),
	containerId: integer("containerId").references(() => containers.id),
});

export const positions = sqliteTable("positions", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	projectId: integer("projectId").notNull().references(() => projects.id),
});

export const projects = sqliteTable("projects", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	createdByUserId: integer("createdByUserId").notNull().references(() => users.id),
});

export const roles = sqliteTable("roles", {
	id: integer("id").primaryKey().notNull(),
	code: text("code").notNull(),
	name: text("name").notNull(),
},
(table) => {
	return {
		nameUnique: uniqueIndex("roles_name_unique").on(table.name),
		codeUnique: uniqueIndex("roles_code_unique").on(table.code),
	}
});

export const subContainers = sqliteTable("subContainers", {
	id: integer("id").primaryKey().notNull(),
	name: text("name"),
	description: text("description"),
	status: text("status"),
	containerId: integer("containerId").notNull().references(() => containers.id),
});

export const userProjectRole = sqliteTable("userProjectRole", {
	id: integer("id").primaryKey().notNull(),
	userId: integer("userId").references(() => users.id),
	projectId: integer("projectId").references(() => projects.id),
	roleId: integer("roleId").notNull().references(() => roles.id),
});

export const users = sqliteTable("users", {
	id: integer("id").primaryKey().notNull(),
	userName: text("userName").notNull(),
	name: text("name"),
	email: text("email").notNull(),
	password: text("password").notNull(),
},
(table) => {
	return {
		passwordUnique: uniqueIndex("users_password_unique").on(table.password),
		emailUnique: uniqueIndex("users_email_unique").on(table.email),
		userNameUnique: uniqueIndex("users_userName_unique").on(table.userName),
	}
});