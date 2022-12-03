// deno-lint-ignore-file no-explicit-any no-unused-vars require-await ban-unused-ignore ban-ts-comment
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import { EndpointContext } from '../endpoint-context.ts';

export function Post(path: string) {
  return function (
    target: Record<string, any>,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    const originalValue = descriptor.value;
    descriptor.value = function (...args: any[]) {
      target.endpoints[key] = {
        type: 'post',
        path: path,
        key: key,
        handler: originalValue,
      };

      return originalValue.apply(this, args);
    };
  };
}
