import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ProposalsService {
  constructor(
    @Inject('REQUEST_SERVICE') private readonly requestClient: ClientProxy,
  ) {}
  async findAllProposals(): Promise<Observable<any>> {
    return this.requestClient.send<any>('findAllProposals', {});
  }

  async findProposalsByUserId(userId: number): Promise<Observable<any>> {
    return this.requestClient.send('findProposalsByUserId', userId);
  }

  async findProposalsByRequestId(id: number): Promise<Observable<any>> {
    return this.requestClient.send('findProposalsByRequestId', id);
  }
}
