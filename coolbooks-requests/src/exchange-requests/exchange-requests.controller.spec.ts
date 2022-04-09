import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRequestsController } from './exchange-requests.controller';
import { ExchangeRequestsService } from './exchange-requests.service';

describe('ExchangeRequestsController', () => {
  let controller: ExchangeRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeRequestsController],
      providers: [ExchangeRequestsService],
    }).compile();

    controller = module.get<ExchangeRequestsController>(ExchangeRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
