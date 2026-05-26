CREATE TABLE `lab_patients` (
	`lab_id` varchar(255) NOT NULL,
	`patient_id` varchar(255) NOT NULL,
	CONSTRAINT `lab_patients_lab_id_patient_id_pk` PRIMARY KEY(`lab_id`,`patient_id`)
);
--> statement-breakpoint
ALTER TABLE `otps` MODIFY COLUMN `temp_user_id` int;--> statement-breakpoint
ALTER TABLE `lab_patients` ADD CONSTRAINT `lab_patients_lab_id_labs_lab_id_fk` FOREIGN KEY (`lab_id`) REFERENCES `labs`(`lab_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lab_patients` ADD CONSTRAINT `lab_patients_patient_id_users_user_id_fk` FOREIGN KEY (`patient_id`) REFERENCES `users`(`user_id`) ON DELETE no action ON UPDATE no action;