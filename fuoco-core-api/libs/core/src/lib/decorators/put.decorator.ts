// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
export function Put(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      target.prototype.putEndpoints = target.prototype.putEndpoints || [];
      target.prototype.putEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });
    };
  }