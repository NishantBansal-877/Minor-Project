CREATE TABLE `doctors` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`doctor_id` varchar(255) NOT NULL,
	`designation` varchar(255),
	CONSTRAINT `doctors_id` PRIMARY KEY(`id`),
	CONSTRAINT `doctors_doctor_id_unique` UNIQUE(`doctor_id`)
);
--> statement-breakpoint
CREATE TABLE `labs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`lab_id` varchar(255) NOT NULL,
	`lab_name` varchar(255) NOT NULL,
	`lab_owner_name` varchar(255),
	`avatar_url` varchar(255),
	CONSTRAINT `labs_id` PRIMARY KEY(`id`),
	CONSTRAINT `labs_lab_id_unique` UNIQUE(`lab_id`)
);
--> statement-breakpoint
CREATE TABLE `patients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`patient_id` varchar(255) NOT NULL,
	CONSTRAINT `patients_id` PRIMARY KEY(`id`),
	CONSTRAINT `patients_patient_id_unique` UNIQUE(`patient_id`)
);
--> statement-breakpoint
CREATE TABLE `report_values` (
	`id` int AUTO_INCREMENT NOT NULL,
	`report_id` int NOT NULL,
	`test_key` varchar(100) NOT NULL,
	`test_name` varchar(255) NOT NULL,
	`value` text,
	`unit` varchar(50),
	`data_type` varchar(50),
	`reference_range` text,
	`interpretation` varchar(100),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `report_values_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`report_id` varchar(255) NOT NULL,
	`patient_id` int NOT NULL,
	`lab_id` int NOT NULL,
	`panel_key` varchar(50) NOT NULL,
	`panel_title` varchar(255) NOT NULL,
	`clinical_category` varchar(255),
	`specimen_type` varchar(255),
	`status` varchar(50) DEFAULT 'pending',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reports_id` PRIMARY KEY(`id`),
	CONSTRAINT `reports_report_id_unique` UNIQUE(`report_id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`password` varchar(255) NOT NULL,
	`email` varchar(255),
	`gender` enum('male','female','other') NOT NULL,
	`address` text,
	`details` text,
	`role` enum('lab','patient','doctor') NOT NULL,
	`is_verified` boolean DEFAULT false,
	`expires_at` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_user_id_unique` UNIQUE(`user_id`),
	CONSTRAINT `users_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `labs` ADD CONSTRAINT `labs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `patients` ADD CONSTRAINT `patients_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;