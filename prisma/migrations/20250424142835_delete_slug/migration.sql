/*
  Warnings:

  - You are about to drop the column `slug` on the `Page` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Page_slug_key";

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "slug";
