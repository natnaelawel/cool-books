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
    const result = await this.exchangeRequestsService.create(
      createExchangeRequestDto,
    );
    return { data: result };
  }

  @MessagePattern('findAllExchangeRequests')
  async findAll() {
    const result = await this.exchangeRequestsService.findAll();
    return result;
  }

  @MessagePattern('findOneExchangeRequest')
  findOne(@Payload() id: number) {
    return this.exchangeRequestsService.findOne(id);
  }

  @MessagePattern('updateExchangeRequest')
  update(@Payload() updateExchangeRequestDto: any) {
    return this.exchangeRequestsService.update(
      updateExchangeRequestDto.id,
      updateExchangeRequestDto,
    );
  }

  @MessagePattern('removeExchangeRequest')
  remove(@Payload() id: number) {
    return this.exchangeRequestsService.remove(id);
  }
}
