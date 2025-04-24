import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '@/database/prisma.service';

interface ICreateProductDTO {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async listAllProducts() {
    return this.prisma.product.findMany();
  }

  getProductById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createProduct({ title }: ICreateProductDTO) {
    const slug = slugify(title, { lower: true });
    const productWithSameSlug = await this.prisma.product.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new Error('Product already exists');
    }

    return this.prisma.product.create({
      data: {
        title,
        slug,
        price: 0,
      },
    });
  }
}
