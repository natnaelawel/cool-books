import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateExchangeRequestDto } from './dto/create-exchange-request.dto';
import { ExchangeRequestsService } from './exchange-requests.service';

@Controller()
export class ExchangeRequestsController {
  constructor(
    private readonly exchangeRequestsService: ExchangeRequestsService,
  ) {}

  @MessagePattern('createExchangeRequest')
  async create(@Payload() createExchangeRequestDto: CreateExchangeRequestDto) {
    return await this.exchangeRequestsService.create(createExchangeRequestDto);
  }

  @MessagePattern('findAllExchangeRequests')
  async findAll(@Payload() userId: number) {
    try {
      return await this.exchangeRequestsService.findAll(userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @MessagePattern('findOneExchangeRequest')
  async findOne(@Payload() id: number) {
    try {
      return await this.exchangeRequestsService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @MessagePattern('updateExchangeRequest')
  async update(@Payload() updateExchangeRequestDto: any) {
    try {
      return await this.exchangeRequestsService.update(
        updateExchangeRequestDto.id,
        updateExchangeRequestDto,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @MessagePattern('removeExchangeRequest')
  async remove(@Payload() id: number) {
    try {
      return await this.exchangeRequestsService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
