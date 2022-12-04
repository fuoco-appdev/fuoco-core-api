// deno-lint-ignore-file no-explicit-any ban-ts-comment
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import { EndpointContext } from '../endpoint-context.ts';

export function Patch(path: string) {
  return function (
    target: Record<string, any>,
    key: string,
    descriptor: PropertyDescriptor
  ) {
    const id = `${target.constructor.name}-${key}`;
    !target.endpoints &&
      Object.defineProperty(target, 'endpoints', {
        value: {} as Record<string, EndpointContext>,
      });
    target.endpoints[id] = {
      type: 'patch',
      path: path,
      key: key,
      handler: descriptor.value,
      ...(target.endpoints[id] ?? {}),
    };
  };
}
