import { Status } from '@prisma/client';

export class CreateDealDto {
  title: string;
  status: Status;
  createdAt: Date;
  numberPhone: string;
  budget: number;
  fullName: string;
}
