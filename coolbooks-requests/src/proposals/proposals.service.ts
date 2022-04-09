import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProposalsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const data = await this.prisma.exchangeRequest.findMany();
    return { data };
  }

  async findProposalsByUserId(userId: number) {
    const userRequests = await this.prisma.exchangeRequest.findMany({
      where: {
        userId,
      },
    });

    const proposals = userRequests.map((userRequest) => {
      return new Promise(() => {
        return this.prisma.exchangeRequest.findMany({
          where: {
            tag: userRequest.tag_looking,
          },
        });
      });
    });

    const data = await Promise.all(proposals);
    console.log('data is ', data);
    return { data };
  }

  async findProposalsByRequestId(id: number) {
    const userRequest = await this.prisma.exchangeRequest.findUnique({
      where: {
        id,
      },
    });

    const data = await this.prisma.exchangeRequest.findMany({
      where: {
        tag: userRequest.tag_looking,
      },
    });

    return { data };
  }
}
