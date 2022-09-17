// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
export function Delete(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.constructor.prototype.deleteEndpoints = target.constructor.prototype.deleteEndpoints || [];
      target.constructor.prototype.deleteEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }