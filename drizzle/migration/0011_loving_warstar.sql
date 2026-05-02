ALTER TABLE `reports` DROP INDEX `reports_report_id_unique`;--> statement-breakpoint
ALTER TABLE `reports` ADD `values` json NOT NULL;--> statement-breakpoint
ALTER TABLE `report_values` ADD CONSTRAINT `report_values_report_id_reports_id_fk` FOREIGN KEY (`report_id`) REFERENCES `reports`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reports` ADD CONSTRAINT `reports_patient_id_users_user_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reports` ADD CONSTRAINT `reports_lab_id_users_user_id_fk` FOREIGN KEY (`lab_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reports` DROP COLUMN `report_id`;