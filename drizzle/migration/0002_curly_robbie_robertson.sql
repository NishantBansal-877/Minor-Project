CREATE TABLE `id_sequence` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('PID','DID','LID') NOT NULL,
	`seq` int NOT NULL DEFAULT 0,
	CONSTRAINT `id_sequence_id` PRIMARY KEY(`id`),
	CONSTRAINT `id_sequence_type_unique` UNIQUE(`type`)
);
