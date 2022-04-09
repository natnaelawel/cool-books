-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "tag" TEXT,
ALTER COLUMN "isbn" DROP NOT NULL,
ALTER COLUMN "cover" DROP NOT NULL,
ALTER COLUMN "copyright" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferences" TEXT[];
