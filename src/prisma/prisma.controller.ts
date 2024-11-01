import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Controller('prisma')
export class PrismaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getData() {
    const data = await this.prisma.deal.findMany();
    return data;
  }
}
