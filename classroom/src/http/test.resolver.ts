import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from './auth/authorization.guard';
import { PrismaService } from '@/database/prisma.service';
import { Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => Int)
  @UseGuards(AuthorizationGuard)
  hello() {
    return 100;
  }
}
