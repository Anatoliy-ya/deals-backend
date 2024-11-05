import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Deal, Status, Comment } from '@prisma/client';

@Injectable()
export class DealService {
  constructor(private prisma: PrismaService) {}

  // Метод создания сделки
  async createDeal(data: {
    title: string;
    status: Status;
    createdAt: Date;
    numberPhone: string;
    budget: number;
    fullName: string;
  }): Promise<Deal> {
    try {
      return await this.prisma.deal.create({ data });
    } catch (error) {
      console.error('Ошибка при сохранении сделки:', error);
      throw error;
    }
  }

  // Получение всех сделок
  async getDeals(): Promise<Deal[]> {
    try {
      return this.prisma.deal.findMany();
    } catch (error) {
      console.error('Ошибка при получении сделок:', error);
      throw error;
    }
  }

  // Получение сделки по ID с комментариями
  async getDealById(id: number): Promise<Deal & { comments: Comment[] }> {
    try {
      const deal = await this.prisma.deal.findUnique({ where: { id } });
      if (!deal) {
        throw new NotFoundException(`Сделки с ID ${id} не существует`);
      }
      const comments = await this.prisma.comment.findMany({
        where: { dealId: id },
      });
      return { ...deal, comments };
    } catch (error) {
      console.error('Ошибка при получении сделки:', error);
      throw error;
    }
  }

  // Обновление сделки
  async updateDeal(
    id: number,
    data: Partial<{
      title: string;
      status: Status;
      createdAt: Date;
      numberPhone: string;
      budget: number;
      fullName: string;
    }>,
  ): Promise<Deal> {
    try {
      const deal = await this.prisma.deal.findUnique({ where: { id } });
      if (!deal) {
        throw new NotFoundException(`Сделки с ID ${id} не существует`);
      }

      return await this.prisma.deal.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      console.error('Ошибка при обновлении сделки:', error);
      throw error;
    }
  }

  // Удаление сделки
  async deleteDeal(id: number): Promise<Deal> {
    try {
      const deal = await this.prisma.deal.findUnique({ where: { id } });
      if (!deal) {
        throw new NotFoundException(`Сделки с ID ${id} не существует`);
      }
      return this.prisma.deal.delete({ where: { id } });
    } catch (error) {
      console.error('Ошибка при удалении сделки:', error);
      throw error;
    }
  }

  // Добавление комментария к сделке
  async addComment(dealId: number, content: string): Promise<Comment> {
    // Проверяем, существует ли сделка
    try {
      const deal = await this.prisma.deal.findUnique({ where: { id: dealId } });
      if (!deal) {
        throw new NotFoundException(`Сделки с ID ${dealId} не существует`);
      }

      // Создаем комментарий
      return this.prisma.comment.create({
        data: {
          content,
          dealId,
        },
      });
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
      throw error;
    }
  }

  // Получение комментариев сделки по ID
  async getCommentsByDealId(dealId: number): Promise<Comment[]> {
    try {
      const deal = await this.prisma.deal.findUnique({ where: { id: dealId } });
      if (!deal) {
        throw new NotFoundException(`Сделки с ID ${dealId} не существует`);
      }
      return this.prisma.comment.findMany({ where: { dealId } });
    } catch (error) {
      console.error('Ошибка при получении комментариев:', error);
      throw error;
    }
  }
}
