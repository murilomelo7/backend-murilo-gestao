-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "reversedFromId" TEXT;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_reversedFromId_fkey" FOREIGN KEY ("reversedFromId") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
