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
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('deals')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  // Создание новой сделки
  @Post()
  async createDeal(@Body() createDealDto: CreateDealDto) {
    console.log(createDealDto);
    return this.dealService.createDeal(createDealDto);
  }

  // Получение всех сделок
  @Get()
  async getDeals() {
    return this.dealService.getDeals();
  }

  // Получение сделки по ID вместе с комментариями
  @Get(':id')
  async getDealById(@Param('id') id: string) {
    return this.dealService.getDealById(Number(id));
  }

  // Обновление сделки
  @Put(':id')
  async updateDeal(
    @Param('id') id: string,
    @Body() updateDealDto: Partial<UpdateDealDto>,
  ) {
    return this.dealService.updateDeal(Number(id), updateDealDto);
  }

  // Удаление сделки
  @Delete(':id')
  async deleteDeal(@Param('id') id: string) {
    return this.dealService.deleteDeal(Number(id));
  }

  // Добавление комментария к сделке
  @Post(':id/comments')
  async addComment(
    @Param('id') id: string,
    @Body() addCommentDto: AddCommentDto,
  ) {
    return this.dealService.addComment(Number(id), addCommentDto.content);
  }

  // Получение всех комментариев по ID сделки
  @Get(':id/comments')
  async getCommentsByDealId(@Param('id') id: string) {
    return this.dealService.getCommentsByDealId(Number(id));
  }
}
