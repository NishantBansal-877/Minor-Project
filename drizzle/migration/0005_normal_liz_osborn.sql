ALTER TABLE `otps` RENAME COLUMN `number` TO `email`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(255) NOT NULL;