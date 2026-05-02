ALTER TABLE `doctors` DROP FOREIGN KEY `doctors_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `labs` DROP FOREIGN KEY `labs_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `patients` DROP FOREIGN KEY `patients_user_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `reports` MODIFY COLUMN `patient_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `reports` MODIFY COLUMN `lab_id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_doctor_id_users_user_id_fk` FOREIGN KEY (`doctor_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `labs` ADD CONSTRAINT `labs_lab_id_users_user_id_fk` FOREIGN KEY (`lab_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `patients` ADD CONSTRAINT `patients_patient_id_users_user_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `doctors` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `labs` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `patients` DROP COLUMN `user_id`;