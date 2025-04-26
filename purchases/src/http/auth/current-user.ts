/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface IAuthUser {
  sub: string;
}

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext): IAuthUser => {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return req.user;
  },
);
