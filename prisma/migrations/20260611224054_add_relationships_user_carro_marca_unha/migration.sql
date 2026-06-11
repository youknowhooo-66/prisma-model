/*
  Warnings:

  - You are about to drop the column `marca` on the `carro` table. All the data in the column will be lost.
  - Added the required column `marcaId` to the `carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `carro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `unha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `carro` DROP COLUMN `marca`,
    ADD COLUMN `marcaId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `unha` ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `carro` ADD CONSTRAINT `carro_marcaId_fkey` FOREIGN KEY (`marcaId`) REFERENCES `marcas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carro` ADD CONSTRAINT `carro_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unha` ADD CONSTRAINT `unha_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
