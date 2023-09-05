import { BadRequestException } from '@nestjs/common';



export type exceptionObjectType = {
  message: string;
  field: string;
};
export const customExceptionFactory = (errors) => {
  const errorsForResponse: exceptionObjectType[] = [];

  errors.forEach((e) => {
    const constraintKeys = Object.keys(e.constraints);

    constraintKeys.forEach((key) => {
      errorsForResponse.push({
        message: e.constraints[key],
        field: e.property,
      });
    });
  });

  throw new BadRequestException(errorsForResponse);
};
