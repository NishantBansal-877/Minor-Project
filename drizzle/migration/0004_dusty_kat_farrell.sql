CREATE TABLE `otps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`otp` varchar(10) NOT NULL,
	`number` varchar(20),
	`expires_at` timestamp NOT NULL,
	CONSTRAINT `otps_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `temp_users` MODIFY COLUMN `expires_at` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `temp_users` DROP COLUMN `created_at`;