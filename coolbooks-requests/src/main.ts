import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: '*',
  });
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      name: 'REQUEST_SERVICE',
      urls: [
        process.env.RBMQ_URL,
      ],
      ports: 3001,
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001).then(() => {
    console.log('Hybrid Microservice is listening.');
  });
}
bootstrap();
