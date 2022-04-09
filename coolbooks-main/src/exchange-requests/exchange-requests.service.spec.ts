import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeRequestsService } from './exchange-requests.service';

describe('ExchangeRequestsService', () => {
  let service: ExchangeRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeRequestsService],
    }).compile();

    service = module.get<ExchangeRequestsService>(ExchangeRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
