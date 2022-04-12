import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ProposalsService {
  constructor(
    @Inject('REQUEST_SERVICE') private readonly requestClient: ClientProxy,
  ) {}
  async findAllProposals(): Promise<Observable<any>> {
    try {
      return await this.requestClient.send<any>('findAllProposals', {});
    } catch (error) {
      throw new Error(error);
    }
  }

  async findProposalsByUserId(userId: number): Promise<Observable<any>> {
    try {
      return await this.requestClient.send('findProposalsByUserId', userId);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findProposalsByRequestId(id: number): Promise<Observable<any>> {
    try {
      return await this.requestClient.send('findProposalsByRequestId', id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
