ALTER TABLE `users` RENAME COLUMN `phone` TO `number`;--> statement-breakpoint
ALTER TABLE `users` DROP INDEX `users_phone_unique`;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_number_unique` UNIQUE(`number`);