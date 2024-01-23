import { sqliteTable, text, integer, blob} from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	userName: text("userName").notNull().unique(),
	name: text("name"),
	email: text("email").notNull().unique(),
	password: text("password").notNull().unique(),
});

export const projects = sqliteTable("projects", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	name: text("name").notNull(),
	description: text("description"),
	createdByUserId: integer("createdByUserId").notNull().references(() => users.id),
})

export const roles = sqliteTable("roles", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	code: text("code").notNull().unique(),
	name: text("name").notNull().unique(),
})

export const userProjectRole = sqliteTable("userProjectRole", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("userId").references(() => users.id),
	projectId: integer("projectId").references(() => projects.id),
	roleId: integer("roleId").notNull().references(() => roles.id),
})


export const containers = sqliteTable("containers", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	name: text("name").notNull(),
	description: text("description"),
	status: text("status"),
	screenshot1: blob('screenshot1'),
	screenshot2: blob('screenshot2'),
	screenshot3: blob('screenshot3'),
	screenshot4: blob('screenshot4'),
	screenshot5: blob('screenshot5'),
	screenshot6: blob('screenshot6'),
	projectId: integer("projectId").notNull().references(() => projects.id),
})

export const subContainers = sqliteTable("subContainers", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	name: text("name"),
	description: text("description"),
	status: text("status"),
	screenshot1: blob('screenshot1'),
	screenshot2: blob('screenshot2'),
	screenshot3: blob('screenshot3'),
	screenshot4: blob('screenshot4'),
	screenshot5: blob('screenshot5'),
	screenshot6: blob('screenshot6'),
	containerId: integer("containerId").notNull().references(() => containers.id),
})

export const items = sqliteTable("items", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	name: text("name").notNull(),
	description: text("description"),
	boughtDate: integer('boughtDate', { mode: 'timestamp' }), // Date
	expiredDate: integer('expiredDate', { mode: 'timestamp' }), // Date
	status: text("status"),
	screenshot1: blob('screenshot1'),
	screenshot2: blob('screenshot2'),
	screenshot3: blob('screenshot3'),
	screenshot4: blob('screenshot4'),
	screenshot5: blob('screenshot5'),
	screenshot6: blob('screenshot6'),
	subContainerId: integer("subContainerId").references(() => subContainers.id),
	containerId: integer("containerId").references(() => containers.id),
})