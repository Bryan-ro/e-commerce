/*
  Warnings:

  - You are about to drop the column `asaasId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `users_asaasId_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `asaasId`,
    ADD COLUMN `stripeId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_stripeId_key` ON `users`(`stripeId`);
