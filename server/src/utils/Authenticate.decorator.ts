import { UnauthorizedException } from '@nestjs/common';

export function Authenticate() {
  return function (
    target: any,
    prpertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const request = args[0].user;
      if (!request) {
        throw new UnauthorizedException('Please login to continue!');
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
