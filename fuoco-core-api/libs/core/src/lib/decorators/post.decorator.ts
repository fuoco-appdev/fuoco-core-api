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
    console.log(target.constructor.name);
    !target.constructor.prototype.endpoints &&
      (target.constructor.prototype = {});
    if (!target.constructor.prototype[key]) {
      target.constructor.prototype[key] = {
        type: 'post',
        path: path,
        key: key,
        handler: descriptor.value,
      };
    }
  };
}
