import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { CustomersService } from '@/products/customers.service';

import { CurrentUser, IAuthUser } from '@/http/auth/current-user';
import { Customer } from '../models/customer';
import { PurchasesService } from '@/products/purchases.service';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: IAuthUser) {
    return this.customersService.getProductByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllPurchasesFromCustomer(customer.id);
  }
}
