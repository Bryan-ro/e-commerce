/*
  Warnings:

  - You are about to drop the column `card_number` on the `credit_cards` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `credit_cards` table. All the data in the column will be lost.
  - You are about to drop the column `cvv` on the `credit_cards` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `credit_cards` table. All the data in the column will be lost.
  - You are about to drop the column `validity` on the `credit_cards` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cardToken]` on the table `credit_cards` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardToken` to the `credit_cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `credit_cards` DROP COLUMN `card_number`,
    DROP COLUMN `cpf`,
    DROP COLUMN `cvv`,
    DROP COLUMN `name`,
    DROP COLUMN `validity`,
    ADD COLUMN `cardToken` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `credit_cards_cardToken_key` ON `credit_cards`(`cardToken`);
