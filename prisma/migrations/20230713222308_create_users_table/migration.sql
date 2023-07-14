-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `confirmation_token` VARCHAR(255) NULL,
    `confirmation_token_sent_at` DATETIME(3) NULL,
    `confirmed_at` DATETIME(3) NULL,
    `reset_password_token` VARCHAR(255) NULL,
    `reset_password_token_sent_at` DATETIME(3) NULL,
    `unconfirmed` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
