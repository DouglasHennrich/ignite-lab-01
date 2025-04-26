import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

interface ICreateCustomerDTO {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  getProductByAuthUserId(authUserId: string) {
    return this.prisma.customer.findUnique({
      where: {
        authUserId,
      },
    });
  }

  createCustomer({ authUserId }: ICreateCustomerDTO) {
    return this.prisma.customer.create({
      data: {
        authUserId,
      },
    });
  }
}
