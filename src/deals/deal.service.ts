import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Deal, Status } from '@prisma/client';

@Injectable()
export class DealService {
  constructor(private prisma: PrismaService) {}

  async createDeal(data: { title: string; status: Status }): Promise<Deal> {
    return this.prisma.deal.create({ data });
  }

  async getDeals(): Promise<Deal[]> {
    return this.prisma.deal.findMany();
  }

  async getDealById(id: number): Promise<Deal | null> {
    const deal = await this.prisma.deal.findUnique({ where: { id } });
    if (!deal) {
      throw new NotFoundException(`Deal with ID ${id} not found`);
    }
    return deal;
  }

  async updateDeal(
    id: number,
    data: Partial<{ title: string; status: Status }>,
  ): Promise<Deal> {
    const deal = await this.prisma.deal.findUnique({ where: { id } });
    if (!deal) {
      throw new NotFoundException(`Deal with ID ${id} not found`);
    }
    return this.prisma.deal.update({
      where: { id },
      data,
    });
  }

  async deleteDeal(id: number): Promise<Deal> {
    const deal = await this.prisma.deal.findUnique({ where: { id } });
    if (!deal) {
      throw new NotFoundException(`Deal with ID ${id} not found`);
    }
    return this.prisma.deal.delete({ where: { id } });
  }
}
