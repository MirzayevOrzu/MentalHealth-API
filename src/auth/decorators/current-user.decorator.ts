import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type User = {
    id: number;
};

type UserRecord = keyof User;

export const CurrentUser = createParamDecorator(
    (data: UserRecord, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return data ? request.user?.[data] : request.user;
    },
);
