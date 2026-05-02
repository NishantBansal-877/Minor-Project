CREATE TABLE `temp_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`number` varchar(20) NOT NULL,
	`password` varchar(255) NOT NULL,
	`email` varchar(255),
	`gender` enum('male','female','other') NOT NULL,
	`role` enum('lab','patient','doctor') NOT NULL,
	`expires_at` timestamp DEFAULT '2026-04-24 09:50:04.992',
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `temp_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `temp_users_number_unique` UNIQUE(`number`)
);
