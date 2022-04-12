import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExchangeRequestDto } from './dto/create-exchange-request.dto';
@Injectable()
export class ExchangeRequestsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createExchangeRequestDto: CreateExchangeRequestDto) {
    const result = await this.prismaService.exchangeRequest.create({
      data: createExchangeRequestDto,
    });
    return { data: result };
  }

  async findAll(userId: number) {
    const result = await this.prismaService.exchangeRequest.findMany({
      where: { userId },
    });
    return { data: result };
  }

  async findOne(id: number) {
    const result = await this.prismaService.exchangeRequest.findUnique({
      where: { id },
    });
    return { data: result };
  }

  async update(id: number, updateExchangeRequestDto: any) {
    try {
      const data = await this.prismaService.exchangeRequest.update({
        where: { id },
        data: {
          ...updateExchangeRequestDto,
        },
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      const data = await this.prismaService.exchangeRequest.delete({
        where: { id },
      });

      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}
