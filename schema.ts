import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	userName: text("userName").notNull().unique(),
	name: text("name"),
	email: text("email").notNull().unique(),
	password: text("password").notNull().unique(),
});

export const projects = sqliteTable("projects", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	name: text("name").notNull().unique(),
	description: text("description"),
	logo: blob('logo'),
	createdDate: integer('createdDate', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`), // Date
	createdByUserId: integer("createdByUserId").notNull().references(() => users.id),
})

export const roles = sqliteTable("roles", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	code: text("code").notNull().unique(),
	name: text("name").notNull().unique(),
})

export const itemTypes = sqliteTable("itemTypes", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	code: text("code").notNull().unique(),
	name: text("name").notNull().unique(),
})

export const containerTypes = sqliteTable("containerTypes", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	code: text("code").notNull().unique(),
	name: text("name").notNull().unique(),
})

export const userProjectRoleConfigure = sqliteTable("userProjectRoleConfigure", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	userId: integer("userId").references(() => users.id),
	projectId: integer("projectId").references(() => projects.id),
	roleId: integer("roleId").notNull().references(() => roles.id),
	isDefault: integer('id', { mode: 'boolean' }).default(false)
})

export const projectItemTypes = sqliteTable("projectItemTypes", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	projectId: integer("projectId").references(() => projects.id),
	itemTypeId: integer("itemTypeId").references(() => itemTypes.id),
})

export const projectContainerTypes = sqliteTable("projectContainerTypes", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	projectId: integer("projectId").references(() => projects.id),
	containerTypeId: integer("containerTypeId").references(() => containerTypes.id),
})


export const containers = sqliteTable("containers", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	name: text("name").notNull().unique(),
	description: text("description"),
	status: text("status"),
	screenshot1: blob('screenshot1'),
	screenshot2: blob('screenshot2'),
	screenshot3: blob('screenshot3'),
	screenshot4: blob('screenshot4'),
	screenshot5: blob('screenshot5'),
	screenshot6: blob('screenshot6'),
	createdDate: integer('createdDate', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`), // Date
	projectId: integer("projectId").notNull().references(() => projects.id),
	containerTypeId: integer("containerTypeId").references(() => containerTypes.id),
})

export const subContainers = sqliteTable("subContainers", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	name: text("name").unique(),
	description: text("description"),
	status: text("status"),
	screenshot1: blob('screenshot1'),
	screenshot2: blob('screenshot2'),
	screenshot3: blob('screenshot3'),
	screenshot4: blob('screenshot4'),
	screenshot5: blob('screenshot5'),
	screenshot6: blob('screenshot6'),
	createdDate: integer('createdDate', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`), // Date
	containerId: integer("containerId").notNull().references(() => containers.id),
	containerTypeId: integer("containerTypeId").references(() => containerTypes.id),
})

export const items = sqliteTable("items", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	name: text("name").notNull().unique(),
	description: text("description"),
	boughtDate: integer('boughtDate', { mode: 'timestamp' }), // Date
	expiredDate: integer('expiredDate', { mode: 'timestamp' }), // Date
	status: text("status"),
	price: integer("price"),
	screenshot1: blob('screenshot1'),
	screenshot2: blob('screenshot2'),
	screenshot3: blob('screenshot3'),
	screenshot4: blob('screenshot4'),
	screenshot5: blob('screenshot5'),
	screenshot6: blob('screenshot6'),
	createdDate: integer('createdDate', { mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`), // Date
	subContainerId: integer("subContainerId").references(() => subContainers.id),
	containerId: integer("containerId").references(() => containers.id),
	itemTypeId: integer("itemTypeId").references(() => itemTypes.id),
})