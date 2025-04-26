/*
  Warnings:

  - You are about to drop the column `path` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the `Library` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('vi', 'en');

-- DropForeignKey
ALTER TABLE "Library" DROP CONSTRAINT "Library_albumId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "path",
DROP COLUMN "type",
ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "images" TEXT,
ADD COLUMN     "videos" TEXT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'vi';

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'vi';

-- DropTable
DROP TABLE "Library";
