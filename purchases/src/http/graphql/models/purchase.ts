import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from './product';

enum PurchaseStatusEnum {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchaseStatusEnum, {
  name: 'PurchaseStatus',
  description: 'Available purchase statuses',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatusEnum)
  status: PurchaseStatusEnum;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Product)
  product: Product;

  productId: string;
}
