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
    const userLooking = await this.prisma.exchangeRequest.findMany({
      where: {
        userId,
      },
      select: {
        tag_looking: true,
      },
    });

    const result = await this.prisma.exchangeRequest.findMany({
      where: {
        tag: {
          in: userLooking.map((item) => item.tag_looking),
        },
        userId: { not: userId },
      },
    });

    // const proposals = userRequests.map((userRequest) => {
    //   return this.prisma.exchangeRequest.findMany({
    //     where: {
    //       tag: userRequest.tag_looking,
    //       userId: { not: userId },
    //     },
    //     orderBy: {
    //       createdAt: 'desc',
    //     },
    //   });
    // });
    // const data = await Promise.all(proposals);
    // console.log('data is ', data);
    return { data: result };
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
