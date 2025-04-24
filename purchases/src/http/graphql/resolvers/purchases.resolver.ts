import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PurchasesService } from '@/products/purchases.service';
import { ProductsService } from '@/products/products.service';
import { AuthorizationGuard } from '@/http/auth/authorization.guard';

import { Purchases } from '../models/purchases';
import { Product } from '../models/product';

@Resolver(() => Purchases)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
  ) {}

  @Query(() => [Purchases])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchases) {
    return this.productsService.getProductById(purchase.productId);
  }
}
