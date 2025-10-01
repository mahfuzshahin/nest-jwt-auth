import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: 'userId' | 'username' | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user; // this is your { userId, username } object
        if (data) {
            return user[data]; // return only userId or username if requested
        }
        return user;
    },
);
