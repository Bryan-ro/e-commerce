/*
  Warnings:

  - You are about to drop the column `payment_data` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `stack` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `stripeId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `credit_cards` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orderId` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPrice` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `credit_cards` DROP FOREIGN KEY `credit_cards_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_userId_fkey`;

-- DropIndex
DROP INDEX `users_stripeId_key` ON `users`;

-- AlterTable
ALTER TABLE `order_items` DROP COLUMN `payment_data`,
    DROP COLUMN `payment_method`,
    DROP COLUMN `stack`,
    DROP COLUMN `userId`,
    ADD COLUMN `orderId` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `unitPrice` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `stripeId`;

-- DropTable
DROP TABLE `credit_cards`;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deliveryPrice` DOUBLE NOT NULL,
    `totalAmount` DOUBLE NOT NULL,
    `paymentId` INTEGER NULL,
    `paymentStatus` ENUM('PENDING', 'APPROVED', 'REGECTED', 'REFUNDED') NOT NULL,
    `deliveryStatus` ENUM('PREPARING', 'TRAVELING', 'DELIVERED') NOT NULL,
    `addressId` INTEGER NOT NULL,

    UNIQUE INDEX `orders_paymentId_key`(`paymentId`),
    UNIQUE INDEX `orders_addressId_key`(`addressId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderAddress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cep` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `neighborhood` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `complement` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `OrderAddress`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
