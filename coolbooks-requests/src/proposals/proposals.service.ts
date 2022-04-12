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
        tag: true,
      },
    });

    const result = await this.prisma.exchangeRequest.findMany({
      where: {
        tag: {
          in: userLooking.map((item) => item.tag_looking),
        },
        tag_looking: { in: userLooking.map((item) => item.tag) },
        userId: { not: userId },
      },
    });

    return { data: result };
  }

  async findProposalsByRequestId(id: number) {
    const userRequest = await this.prisma.exchangeRequest.findUnique({
      where: {
        id,
      },
    });
    if (!userRequest) {
      return { data: null };
    }

    const data = await this.prisma.exchangeRequest.findMany({
      where: {
        tag: userRequest.tag_looking,
        tag_looking: userRequest.tag,
        id: { not: id },
      },
    });

    return { data };
  }
}
