import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

interface ICreatePurchaseDTO {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listAllPurchasesFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: {
        customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ customerId, productId }: ICreatePurchaseDTO) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!productExists) {
      throw new Error('Product does not exist');
    }

    return await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      },
    });
  }
}
