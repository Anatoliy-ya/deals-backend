import { Status } from '@prisma/client';

export class UpdateDealDto {
  title: string;
  status: Status;
  createdAt: Date;
  numberPhone: string;
  budget: number;
  fullName: string;
}
