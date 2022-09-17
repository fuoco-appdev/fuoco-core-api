// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
export function Get(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.constructor.prototype.getEndpoints = target.constructor.prototype.getEndpoints || [];
      target.constructor.prototype.getEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }