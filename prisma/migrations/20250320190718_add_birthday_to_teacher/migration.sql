/*
  Warnings:

  - You are about to drop the column `patentId` on the `Student` table. All the data in the column will be lost.
  - Added the required column `parentId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_patentId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "patentId",
ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "parentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "birthday" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
