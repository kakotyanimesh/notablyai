/*
  Warnings:

  - Added the required column `imageSrc` to the `Notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "imageSrc" TEXT NOT NULL;
