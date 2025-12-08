/*
  Warnings:

  - You are about to drop the column `description` on the `Practitioner` table. All the data in the column will be lost.
  - You are about to drop the column `specialty` on the `Practitioner` table. All the data in the column will be lost.
  - Added the required column `consultationType` to the `Practitioner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Practitioner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experienceYears` to the `Practitioner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hourlyRate` to the `Practitioner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Practitioner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longBio` to the `Practitioner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberSince` to the `Practitioner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `satisfactionScore` to the `Practitioner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortBio` to the `Practitioner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `successfulSessions` to the `Practitioner` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "StripeWebhookEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Practitioner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "imageUrl" TEXT NOT NULL,
    "shortBio" TEXT NOT NULL,
    "longBio" TEXT NOT NULL,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "country" TEXT NOT NULL,
    "city" TEXT,
    "consultationType" TEXT NOT NULL,
    "languages" TEXT NOT NULL DEFAULT '[]',
    "experienceYears" INTEGER NOT NULL,
    "hourlyRate" INTEGER NOT NULL,
    "satisfactionScore" REAL NOT NULL,
    "successfulSessions" TEXT NOT NULL,
    "memberSince" DATETIME NOT NULL,
    "professionalAssociations" TEXT NOT NULL DEFAULT '[]',
    "eventTypeId" TEXT NOT NULL,
    "basePrice" INTEGER NOT NULL
);
INSERT INTO "new_Practitioner" ("basePrice", "eventTypeId", "id", "name") SELECT "basePrice", "eventTypeId", "id", "name" FROM "Practitioner";
DROP TABLE "Practitioner";
ALTER TABLE "new_Practitioner" RENAME TO "Practitioner";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
