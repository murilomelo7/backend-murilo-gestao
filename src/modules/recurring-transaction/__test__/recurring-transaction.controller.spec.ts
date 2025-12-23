import { Test, TestingModule } from '@nestjs/testing';
import { RecurringTransactionController } from '../recurring-transaction.controller';

describe('RecurringTransactionController', () => {
  let controller: RecurringTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecurringTransactionController],
    }).compile();

    controller = module.get<RecurringTransactionController>(
      RecurringTransactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
