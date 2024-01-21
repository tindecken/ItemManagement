CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`userName` text NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_userName_unique` ON `users` (`userName`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_password_unique` ON `users` (`password`);