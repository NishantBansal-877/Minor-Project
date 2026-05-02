ALTER TABLE `users` DROP INDEX `users_number_unique`;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);