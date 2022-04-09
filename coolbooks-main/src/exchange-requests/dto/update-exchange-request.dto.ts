import { PartialType } from '@nestjs/mapped-types';
import { CreateExchangeRequestDto } from './create-exchange-request.dto';

export class UpdateExchangeRequestDto extends PartialType(CreateExchangeRequestDto) {}
