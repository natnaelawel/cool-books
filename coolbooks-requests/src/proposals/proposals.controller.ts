import { Controller, Get, Param } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProposalsService } from './proposals.service';

@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Get()
  async findAll() {
    return await this.proposalsService.findAll();
  }

  @MessagePattern('findAllProposals')
  async findAllProposals() {
    return await this.proposalsService.findAll();
  }
  @MessagePattern('findProposalsByUserId')
  async findProposalsByUserIdd(@Payload() userId: number) {
    console.log('user id is ', userId);
    try {
      return await this.proposalsService.findProposalsByUserId(userId);
    } catch (error) {
      return [];
    }
  }

  @MessagePattern('findProposalsByRequestId')
  async findProposalsByRequestIdd(@Payload() id: number) {
    try {
      return this.proposalsService.findProposalsByRequestId(id);
    } catch (error) {
      return [];
    }
  }

  @Get('user/:id')
  async findProposalsByUserId(@Param('id') id: string) {
    try {
      return await this.proposalsService.findProposalsByUserId(+id);
    } catch (error) {
      return [];
    }
  }

  @Get(':id')
  async findProposalsByRequestId(@Param('id') id: string) {
    try {
      return await this.proposalsService.findProposalsByRequestId(+id);
    } catch (error) {}
  }
}
