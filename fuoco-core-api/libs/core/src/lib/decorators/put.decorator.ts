// deno-lint-ignore-file no-explicit-any
/* eslint-disable @typescript-eslint/no-explicit-any */
export function Put(path: string) {
    return function (
      target: Record<string, any>,
      key: string,
      descriptor: PropertyDescriptor,
    ) {
      const prototype = Object.getPrototypeOf(target);
      prototype.putEndpoints = prototype.putEndpoints || [];
      prototype.putEndpoints.push({
        path,
        key,
        handler: descriptor.value,
      });

      return target;
    };
  }