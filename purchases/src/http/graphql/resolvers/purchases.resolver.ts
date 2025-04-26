import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PurchasesService } from '@/products/purchases.service';
import { ProductsService } from '@/products/products.service';
import { AuthorizationGuard } from '@/http/auth/authorization.guard';

import { Purchase } from '../models/purchase';
import { CreatePurchaseInput } from '../inputs/create-purchase.input';
import { CurrentUser, IAuthUser } from '@/http/auth/current-user';
import { CustomersService } from '@/products/customers.service';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productsService.getProductById(purchase.productId);
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') { productId }: CreatePurchaseInput,
    @CurrentUser() user: IAuthUser,
  ) {
    let customer = await this.customersService.getProductByAuthUserId(user.sub);

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      });
    }

    return this.purchasesService.createPurchase({
      customerId: customer.id,
      productId,
    });
  }
}
