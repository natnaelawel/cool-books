import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateExchangeRequestDto } from './dto/create-exchange-request.dto';
import { UpdateExchangeRequestDto } from './dto/update-exchange-request.dto';

@Injectable()
export class ExchangeRequestsService {
  constructor(
    @Inject('REQUEST_SERVICE') private readonly requestClient: ClientProxy,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(
    createExchangeRequestDto: CreateExchangeRequestDto,
    file: Express.Multer.File,
  ): Promise<Observable<any>> {
    const result = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });

    createExchangeRequestDto.picture = result.secure_url;

    return this.requestClient.send<any>(
      'createExchangeRequest',
      createExchangeRequestDto,
    );
  }

  async findProposalsByUserId(id: number): Promise<Observable<any>> {
    return this.requestClient.send<any>('findAllExchangeRequests', id);
  }

  async findProposalsByRequestId(id: number): Promise<Observable<any>> {
    return this.requestClient.send<any>(
      'exchange_request_findProposalsByRequestId',
      id,
    );
  }

  async findAll(userId: number): Promise<Observable<any>> {
    return this.requestClient.send<any>('findAllExchangeRequests', userId);
  }

  findOne(id: number) {
    return this.requestClient.send<any>('findOneExchangeRequest', id);
  }

  async update(
    id: number,
    file: Express.Multer.File,
    updateExchangeRequestDto: UpdateExchangeRequestDto,
  ) {
    const result = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
      
    });

    updateExchangeRequestDto.picture = result.secure_url;

    return this.requestClient.send<any>('updateExchangeRequest', {
      id,
      data: updateExchangeRequestDto,
    });
  }

  async remove(id: number) {
    return this.requestClient.send<any>('removeExchangeRequest', id);
  }
}
