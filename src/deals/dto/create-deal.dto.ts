import { Status } from '@prisma/client';

export class CreateDealDto {
  title: string;
  status: Status;
}
