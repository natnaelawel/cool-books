import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
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
  );

  await app.listen().then(() => {
    console.log('Microservice is listening.');
  });
}
bootstrap();
