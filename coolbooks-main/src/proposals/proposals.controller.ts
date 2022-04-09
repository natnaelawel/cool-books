import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ProposalsService } from './proposals.service';

@ApiTags('proposals')
@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Get()
  findAll() {
    return this.proposalsService.findAllProposals();
  }

  @ApiProperty()
  @ApiBearerAuth('JWT')
  @UseGuards(JwtGuard)
  @Get('user')
  findProposalsByUserId(@GetUser() user: User) {
    return this.proposalsService.findProposalsByUserId(user.id);
  }

  @ApiProperty()
  @Get(':id')
  findProposalsByRequestId(@Param('id') id: string) {
    return this.proposalsService.findProposalsByRequestId(+id);
  }
}
