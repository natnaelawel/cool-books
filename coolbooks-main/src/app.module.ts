import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExchangeRequestsModule } from './exchange-requests/exchange-requests.module';
import { FilesModule } from './files/files.module';
import { ProposalsModule } from './proposals/proposals.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    AuthModule,
    UsersModule,
    BooksModule,
    ExchangeRequestsModule,
    ProposalsModule,
    FilesModule,
    PrismaModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
