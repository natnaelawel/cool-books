import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// custom decorator
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    console.log("nati awel")
    const request = ctx.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
