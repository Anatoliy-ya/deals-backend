import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { DealService } from './deal.service';
import { Status } from '@prisma/client';
import { CreateDealDto } from './dto/create-deal.dto';

@Controller('deals')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Post()
  async createDeal(@Body() createDealDto: CreateDealDto) {
    return this.dealService.createDeal(createDealDto);
  }

  @Get()
  async getDeals() {
    return this.dealService.getDeals();
  }

  @Get(':id')
  async getDealById(@Param('id') id: string) {
    return this.dealService.getDealById(Number(id));
  }

  @Put(':id')
  async updateDeal(
    @Param('id') id: string,
    @Body() updateDealDto: Partial<CreateDealDto>,
  ) {
    return this.dealService.updateDeal(Number(id), updateDealDto);
  }

  @Delete(':id')
  async deleteDeal(@Param('id') id: string) {
    return this.dealService.deleteDeal(Number(id));
  }
}
