/*
  Warnings:

  - Added the required column `balance` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "balance" DECIMAL(14,2) NOT NULL;
