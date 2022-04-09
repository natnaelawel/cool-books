import { Module } from '@nestjs/common';
import { ExchangeRequestsService } from './exchange-requests.service';
import { ExchangeRequestsController } from './exchange-requests.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REQUEST_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://ylzkqhhu:SY-HWFnLnqdWqCYbwKhrXZdxiXA1nZzY@sparrow.rmq.cloudamqp.com/ylzkqhhu',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ExchangeRequestsController],
  providers: [ExchangeRequestsService],
})
export class ExchangeRequestsModule {}
