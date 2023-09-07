import { createParamDecorator, ExecutionContext } from '@nestjs/common';


// Custom decorator to extract the user ID from the request context
export const UserIdFromGuard = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user.id;
  },
);
