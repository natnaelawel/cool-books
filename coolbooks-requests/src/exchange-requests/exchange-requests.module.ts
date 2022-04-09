import { Module } from '@nestjs/common';
import { ExchangeRequestsService } from './exchange-requests.service';
import { ExchangeRequestsController } from './exchange-requests.controller';

@Module({
  controllers: [ExchangeRequestsController],
  providers: [ExchangeRequestsService]
})
export class ExchangeRequestsModule {}
