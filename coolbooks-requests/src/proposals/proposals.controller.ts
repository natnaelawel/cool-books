import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProposalsService } from './proposals.service';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Get()
  findAll() {
    return this.proposalsService.findAll();
  }

  @MessagePattern('findAllProposals')
  findAllProposals() {
    return this.proposalsService.findAll();
  }
  @MessagePattern('findProposalsByUserId')
  findProposalsByUserIdd(@Payload() id: number) {
    return this.proposalsService.findProposalsByUserId(id);
  }

  @MessagePattern('findProposalsByRequestId')
  findProposalsByRequestIdd(@Payload() id: number) {
    return this.proposalsService.findProposalsByRequestId(id);
  }

  @Get('user/:id')
  findProposalsByUserId(@Param('id') id: string) {
    return this.proposalsService.findProposalsByUserId(+id);
  }

  @Get(':id')
  findProposalsByRequestId(@Param('id') id: string) {
    return this.proposalsService.findProposalsByRequestId(+id);
  }
}
